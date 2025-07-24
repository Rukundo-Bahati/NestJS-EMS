import { Injectable } from '@nestjs/common';
import { Prisma, Role } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    if (createEmployeeDto.password) {
      createEmployeeDto.password = await bcrypt.hash(createEmployeeDto.password, 10);
    }
    return this.databaseService.employee.create({
      data: createEmployeeDto
    })
  }

  async findAll(role?: Role) {
    if (role) return this.databaseService.employee.findMany({
      where: {
        role,
      }
    })
    return this.databaseService.employee.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      }
    })
  }

  async findByEmail(email: string) {
    return this.databaseService.employee.findUnique({ where: { email } });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    if (updateEmployeeDto.password && typeof updateEmployeeDto.password === 'string') {
      const hashed = await bcrypt.hash(updateEmployeeDto.password, 10);
      updateEmployeeDto.password = { set: hashed };
    }
  
    return this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }
  

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      }
    })
  }
}
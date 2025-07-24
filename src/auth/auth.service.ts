// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private databaseService: DatabaseService) {}

  async validateEmployee(email: string, password: string) {
    const employee = await this.databaseService.employee.findUnique({ where: { email } });
    if (employee && await bcrypt.compare(password, employee.password)) {
      return { employeeId: employee.id, email: employee.email, role: employee.role };
    }
    return null;
  }

  async login(employee: any) {
    const payload = { email: employee.email, sub: employee.employeeId, role: employee.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

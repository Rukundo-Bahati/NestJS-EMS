import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from 'generated/prisma';
import { Throttle, SkipThrottle } from '@nestjs/throttler'
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('employees')
@ApiBearerAuth() //protecting all endpoints (swagger)
@SkipThrottle() // skipping rate-limits
@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard) // Role-based Access
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }
  private readonly logger = new MyLoggerService(EmployeesController.name)
  
  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new employee' })
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Throttle({ short: { ttl: 1000, limit: 3 }})
  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.logger.log(`Request for ALL Employees\t${ip}`, EmployeesController.name)
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 }})
  @Get(':id')
  @ApiOperation({ summary: 'Get employee by ID' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update an employee' })
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete an employee' })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const employee = await this.authService.validateEmployee(body.email, body.password);
    if (!employee) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(employee);
  }
}

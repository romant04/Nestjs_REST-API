import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('email')
  async getEmail(@Request() req) {
    return this.userService.getEmail(req.user);
  }
}

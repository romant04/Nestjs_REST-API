import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user || !(await bcrypt.compare(data.password, user.password)))
      throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
    };
  }

  async register(data: RegisterDto) {
    data.password = await bcrypt.hash(data.password, 10);

    const newUser = new this.userModel(data);
    const user = await newUser.save();
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
    };
  }
}

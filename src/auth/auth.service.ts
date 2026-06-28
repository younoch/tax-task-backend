import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users = [
    {
      id: 1,
      username: 'admin',
      password: '1234',
    },
  ];

  validateUser(username: string, password: string) {
    return this.users.find(
      (user) => user.username === username && user.password === password,
    );
  }

  login(username: string, password: string) {
    const user = this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  findByEmailForAuth(email: string) {
    return this.userRepository.findByEmailForAuth(email);
  }

  createUser(email: string, hashedPassword: string) {
    return this.userRepository.create(email, hashedPassword);
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Safe default: password কখনো রিটার্ন করবে না
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      omit: { password: true },
    });
  }

  // শুধু AuthService.validateUser() ব্যবহার করবে (bcrypt compare করতে)
  findByEmailForAuth(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  create(email: string, hashedPassword: string) {
    return this.prisma.user.create({
      data: { email, password: hashedPassword },
      omit: { password: true },
    });
  }
}
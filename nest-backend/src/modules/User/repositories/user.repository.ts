import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma.service';
import { CreateUserDTO } from '../dtos/requests/create-user.dto';
import { UpdateUserDTO } from '../dtos/requests/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(userDTO: CreateUserDTO) {
    return await this.prisma.user.create({
      data: userDTO,
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id
      }
    });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async update(id: string, userDto: UpdateUserDTO) {
    return await this.prisma.user.update({ where: { id }, data: userDto });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }

  async changePwd(id: string, newPwd: string) {
    return await this.prisma.user.update({ where: { id }, data: { pwd: newPwd }});
  }

}
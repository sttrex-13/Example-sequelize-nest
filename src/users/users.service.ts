import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(name: string, email: string): Promise<User> {
    return this.userModel.create({ name, email });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async updateUser(id: number, name: string): Promise<[number]> {
    return this.userModel.update({ name }, { where: { id } });
  }

  async deleteUser(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}

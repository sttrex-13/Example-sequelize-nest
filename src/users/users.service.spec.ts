/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../models/user.model';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: typeof User;

  const mockUserModel = {
    create: jest
      .fn()
      .mockImplementation((data) => Promise.resolve({ id: 1, ...data })),
    findAll: jest
      .fn()
      .mockResolvedValue([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
      ]),
    update: jest.fn().mockResolvedValue([1]), // Sequelize's update returns [number of affected rows]
    destroy: jest.fn().mockResolvedValue(1), // Sequelize's destroy returns number of deleted rows
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.createUser('Jane Doe', 'jane@example.com');
    expect(user).toEqual({
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
    expect(userModel.create).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ]);
    expect(userModel.findAll).toHaveBeenCalled();
  });

  it('should update a user', async () => {
    const result = await service.updateUser(1, 'Updated Name');
    expect(result).toEqual([1]);
    expect(userModel.update).toHaveBeenCalledWith(
      { name: 'Updated Name' },
      { where: { id: 1 } },
    );
  });

  it('should delete a user', async () => {
    const result = await service.deleteUser(1);
    expect(result).toBe(1);
    expect(userModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});

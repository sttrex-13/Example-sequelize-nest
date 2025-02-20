/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    createUser: jest.fn().mockImplementation((name, email) => ({
      id: 1,
      name,
      email,
    })),
    findAll: jest
      .fn()
      .mockReturnValue([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
      ]),
    updateUser: jest.fn().mockImplementation((id, name) => ({
      id,
      name,
      email: 'updated@example.com',
    })),
    deleteUser: jest.fn().mockImplementation((id) => ({ id, deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(
      controller.create({ name: 'Jane Doe', email: 'jane@example.com' }),
    ).toEqual({
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
    expect(usersService.createUser).toHaveBeenCalledWith(
      'Jane Doe',
      'jane@example.com',
    );
  });

  it('should return all users', () => {
    expect(controller.findAll()).toEqual([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ]);
    expect(usersService.findAll).toHaveBeenCalled();
  });

  it('should update a user', () => {
    expect(controller.update(1, 'Updated Name')).toEqual({
      id: 1,
      name: 'Updated Name',
      email: 'updated@example.com',
    });
    expect(usersService.updateUser).toHaveBeenCalledWith(1, 'Updated Name');
  });

  it('should delete a user', () => {
    expect(controller.delete(1)).toEqual({ id: 1, deleted: true });
    expect(usersService.deleteUser).toHaveBeenCalledWith(1);
  });
});

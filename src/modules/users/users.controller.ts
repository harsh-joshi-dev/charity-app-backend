import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import {
  prepareSuccessResponse,
  prepareErrorResponse,
  SuccessResponse,
  ErrorResponse,
} from '../../common/response.helper';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SuccessResponse<User> | ErrorResponse> {
    try {
      const user = await this.userService.createUser(createUserDto);
      return prepareSuccessResponse<User>(user, 'User created successfully');
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.email === 1
      ) {
        return prepareErrorResponse(
          HttpStatus.CONFLICT,
          'Email already exists',
        );
      }

      return prepareErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create user',
      );
    }
  }

  @Get()
  async getAllUsers(): Promise<SuccessResponse<User[]> | ErrorResponse> {
    try {
      const users = await this.userService.getAllUsers();
      return prepareSuccessResponse<User[]>(
        users,
        'Users retrieved successfully',
      );
    } catch (error) {
      return prepareErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get users',
      );
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<SuccessResponse<User> | ErrorResponse> {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        return prepareErrorResponse(HttpStatus.NOT_FOUND, 'User not found');
      }
      return prepareSuccessResponse<User>(user, 'User retrieved successfully');
    } catch (error) {
      return prepareErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get user',
      );
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<SuccessResponse<User> | ErrorResponse> {
    try {
      const user = await this.userService.updateUser(id, updateUserDto);
      if (!user) {
        return prepareErrorResponse(HttpStatus.NOT_FOUND, 'User not found');
      }
      return prepareSuccessResponse<User>(user, 'User updated successfully');
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.email === 1
      ) {
        return prepareErrorResponse(
          HttpStatus.CONFLICT,
          'Email already exists',
        );
      }

      return prepareErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update user',
      );
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<SuccessResponse<string> | ErrorResponse> {
    try {
      await this.userService.deleteUser(id);
      return prepareSuccessResponse<string>(id, 'User deleted successfully');
    } catch (error) {
      return prepareErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete user',
      );
    }
  }
}

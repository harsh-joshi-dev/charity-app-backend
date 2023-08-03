import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpStatus,
  NotFoundException,
  HttpCode,
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
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SuccessResponse<User> | ErrorResponse> {
    const user = await this.userService.createUser(createUserDto);
    return prepareSuccessResponse<User>(user, 'User created successfully');
  }

  @Get()
  async getAllUsers(): Promise<SuccessResponse<User[]>> {
    const users = await this.userService.getAllUsers();
    return prepareSuccessResponse<User[]>(
      users,
      'Users retrieved successfully',
    );
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<SuccessResponse<User> | ErrorResponse> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      return prepareErrorResponse(HttpStatus.NOT_FOUND, 'User not found');
    }
    return prepareSuccessResponse<User>(user, 'User retrieved successfully');
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<SuccessResponse<User> | ErrorResponse> {
    const user = await this.userService.updateUser(id, updateUserDto);
    if (!user) {
      return prepareErrorResponse(HttpStatus.NOT_FOUND, 'User not found');
    }
    return prepareSuccessResponse<User>(user, 'User updated successfully');
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<SuccessResponse<string> | ErrorResponse> {
    await this.userService.deleteUser(id);
    return prepareSuccessResponse<string>(id, 'User deleted successfully');
  }
}

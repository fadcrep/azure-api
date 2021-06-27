import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.usersService.showById(id);
  }

  @Patch(':email/authorization')
  updateUserAuthorization( @Param('email') email: string): Promise<User>{
    return this.usersService.updateUserAuthorization(email);
  }
}

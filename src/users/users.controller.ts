import { Body, Controller, Query, Param, Get, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SetRoleDto } from './dto/setrole-user.dto';
import { ChangePasswordDto } from './dto/changepassword-user.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // FOR DEV

    @Get('/dev.all')
    dev_getAllUsers(): Promise<User[]> {
        return this.usersService.dev_getAllUsers()
    }

    @Get('/all')
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers()
    }

    @Post('/dev.create')
    dev_createUser(@Body() dto: CreateUserDto): Promise<object | string> {
        return this.usersService.dev_createUser(dto)
    }

    @Delete('/dev/all')
    dev_deleteall(): Promise<string> {
        return this.usersService.dev_deleteall()
    }

    @Delete('/dev/all_noroot')
    dev_deleteall_noroot(): Promise<string> {
        return this.usersService.dev_deleteall_noroot()
    }

    @Delete('/dev/:username')
    dev_deleteUserByUsername(@Param('username') username) {
        return this.usersService.dev_deleteUserByUsername(username)
    }

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------


    @Post('/register')
    registerUser(@Body() dto: CreateUserDto): Promise<object | User> {
        return this.usersService.registerUser(dto)
    }

    @Get('/login')
    loginUser(
        @Query('username') username: string,
        @Query('password') password: string,
    ): Promise<object | User> {
        return this.usersService.loginUser(username, password)
    }

    @Post('/setrole')
    setRole(@Body() dto: SetRoleDto) {
        return this.usersService.setRole(dto)
    }

    @Post('/changepassword')
    changePassword(@Body() dto: ChangePasswordDto) {
        return this.usersService.changePassword(dto)
    }

    @Get('/:username')
    getUser(@Param('username') username: string): Promise<object | User> {
        return this.usersService.getUser(username)
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SetRoleDto } from './dto/setrole-user.dto';
import { ChangePasswordDto } from './dto/changepassword-user.dto';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // FOR DEV

    dev_getAllUsers(): Promise<User[]> {
        return this.usersRepository.find()
    }

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async dev_createUser(dto: CreateUserDto): Promise<object | string> {
        const username = dto.username
        const alreadyExistUser = await this.usersRepository.findOneBy({ username })
        if (alreadyExistUser != null)
            return { message: 'UserAlreadyExist' }
        const [list, count] = await this.usersRepository.findAndCount()
        const newDto = { id: count+1, ...dto }
        const newUser = this.usersRepository.create(newDto)
        this.usersRepository.save(newUser)
        return `Successfully created. (id: ${newUser.id}; username: ${newUser.username})`
    }


    async dev_deleteUserByUsername(username: string): Promise<string> {
        await this.usersRepository.delete({ username })
        return `Deleted. (username: ${username})`
    }


    async dev_deleteall(): Promise<string> {
        const [list, count] = await this.usersRepository.findAndCount()
        if (count < 1) return 'Nothing for delete.'
        list.forEach(async element => {
            const id = element.id
            await this.usersRepository.delete({ id })
        })
        return `Deleted all. (${count})`
    }

    
    async dev_deleteall_noroot(): Promise<string> {
        const [list, count] = await this.usersRepository.findAndCount()
        list.forEach(async element => {
            const id = element.id
            if (element.role != 'root') {
                await this.usersRepository.delete({ id })
            }
        })
        return `Deleted All Without Root. (${count})`
    }

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    async registerUser(dto: CreateUserDto): Promise<object | User> {
        const username = dto.username
        const alreadyExistUser = await this.usersRepository.findOneBy({ username })
        if (alreadyExistUser != null)
            return { message: 'UserAlreadyExist' }
        const [list, count] = await this.usersRepository.findAndCount()
        const newDto = { id: count+1, ...dto }
        const newUser = this.usersRepository.create(newDto)
        return this.usersRepository.save(newUser)
    }

    async loginUser(username: string, password: string): Promise<object | User> {
        const user = await this.usersRepository.findOneBy({ username })
        if (user == null) return { message: 'UserNotFound' }
        else {

            if (password != user.password) return { message: 'WrongPassword' }
            else {
                delete user.password
                return user
            }
        } 
    }

    async setRole(dto: SetRoleDto) {
        const username = dto.username
        const newRole = dto.newRole
        return await this.usersRepository.update({username: username}, {role: newRole})
    }

    async changePassword(dto: ChangePasswordDto) {
        console.log(dto)
        const id = dto.userdata.id
        const newpass = dto.newpass
        return await this.usersRepository.update({ id: id }, { password: newpass })
    }

    async getUser(username: string) {
        const user = await this.usersRepository.findOneBy({ username })
        return user
    }
}

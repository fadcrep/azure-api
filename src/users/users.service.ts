import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {

        const oldUser = await this.findByEmail(createUserDto.email);
        if(oldUser){
           throw new ConflictException(`user with email ${createUserDto.email} already exist`);
        } else{
          const user = User.create(createUserDto);
          await user.save();
      
          delete user.password;
          return user;
        }
        
    }
    
      async showById(id: number): Promise<User> {
        const user = await this.findById(id);
    
        delete user.password;
        return user;
      }
    
      async findById(id: number) {
        return await User.findOne(id);
      }
    
      async findByEmail(email: string) {
        return await User.findOne({
          where: {
            email: email,
          },
        });
      }

      async updateUserAuthorization(email: string): Promise<User>{

        const user = await User.findOne({
          where: {
            email: email,
          },
        });

        if(user){
          try {
            user.authorize = true;
            user.save();
            delete user.password;
            return user;
            
          } catch (error) {
            throw new NotFoundException(`USER WITH EMAIL ${email} NOT FOUND`);
          }
        }

      }
}

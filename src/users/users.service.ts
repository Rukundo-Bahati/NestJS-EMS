import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
 
  private users = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "email": "Sincere@april.biz",
        "role": "INTERN",
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "email": "Shanna@melissa.tv",
        "role": "INTERN",
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "email": "Nathan@yesenia.net",
        "role": "ENGINEER",
    },
    {
        "id": 4,
        "name": "Patricia Lebsack",
        "email": "Julianne.OConner@kory.org",
        "role": "ENGINEER",
    },
    {
        "id": 5,
        "name": "Chelsey Dietrich",
        "email": "Lucio_Hettinger@annie.ca",
        "role": "ADMIN",
    }
]


  create(createUserDto: CreateUserDto) {
       const userByHightstId = [...this.users].sort((a,b) => b.id - a.id)[0].id + 1;
       const newUser = {
        id: userByHightstId,
        ...createUserDto
       }
       this.users.push(newUser);
       return newUser;
  }

  findAll(role: "INTERN" | "ENGINEER" | "ADMIN") {
   if(role){
    const rolesArray=  this.users.filter((user) => user.role === role);
    if(rolesArray.length === 0){
        throw new NotFoundException(`No users found with role ${role}`);
    }
    return rolesArray;
   }
   return this.users;
  }

  findOne(id: number) {
   const user = this.users.find((user) => user.id === id);
   if(!user){
    throw new NotFoundException(`User with id ${id} not found`);
   }
   return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
   this.users = this.users.map((user) => {
    if(user.id === id){
        return {
            ...user,
            ...updateUserDto
        }
    }
    return user;
   })
   return this.users.find((user) => user.id === id);
  }

  remove(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}

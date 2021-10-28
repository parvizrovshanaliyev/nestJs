import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
   async createAsync(dto:AuthCredentialsDto):Promise<void>{
       const{username,password}=dto;
       const entity=this.create({username,password});
       
       try {
           await this.save(entity);
       }catch (error){
           // duplicate error code in pg : 23505
           if(error.code==='23505'){
               throw new ConflictException('username already exists');
           }else{
               throw new InternalServerErrorException();
           }
           // console.log(error.code);
       }
   } 
   
   
}

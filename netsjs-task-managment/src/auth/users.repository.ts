import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {ConflictException, InternalServerErrorException, UnauthorizedException} from "@nestjs/common";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
   
    
    // signUP
    async createAsync(dto:AuthCredentialsDto):Promise<void>{
       const{username,password}=dto;
       //hash
       const salt=await bcrypt.genSalt();
       const hashedPassword=await bcrypt.hash(password,salt);
       const entity=this.create({username,password:hashedPassword});
       console.log(salt);
       console.log(hashedPassword);
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

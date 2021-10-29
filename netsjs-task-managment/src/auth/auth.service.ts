import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersRepository} from "./users.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {JwtPayload} from "./jwt-payload.interface";
@Injectable()
export class AuthService {
    constructor(
        private userRepository:UsersRepository,
        private jwtService:JwtService) {
    }

    signUpAsync(dto:AuthCredentialsDto):Promise<void>{
        return this.userRepository.createAsync(dto);
    }

    // signIN
    async signInAsync(dto:AuthCredentialsDto):Promise<{accessToken:string}>{
        const{username,password}=dto;
        const entity= await this.userRepository.findOne({username});
        if(!entity){
            throw new UnauthorizedException('Please check your login credentials');
        }
        const checkPassword : boolean=await bcrypt.compare(password,entity.password);
        if(!checkPassword){
            throw new UnauthorizedException('Please check your login credentials');
        }
        const payLoad:JwtPayload={username};
        const accessToken:string=this.jwtService.sign(payLoad);
        return {accessToken};
    }
}

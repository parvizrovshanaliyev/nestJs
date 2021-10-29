import {Body, Controller, Post} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {
    }
    @Post('/signUp')
    signUpAsync(@Body() dto:AuthCredentialsDto):Promise<void>{
        return this.authService.signUpAsync(dto);
    }

    @Post('/signIn')
    signInAsync(@Body() dto:AuthCredentialsDto):Promise<{ accessToken:string }>{
        return this.authService.signInAsync(dto);
    }
}

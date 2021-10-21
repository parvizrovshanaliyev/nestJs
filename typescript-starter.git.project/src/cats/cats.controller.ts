import {Controller, Get, Req, Post, HttpCode, Header, Redirect, Query, Param} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {

    
    @Get()
    findAll(@Req() request: Request):string{
        return 'this action returns all cats';
    }

    // findOne v1
    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

    // findOne v2
    @Get(':id')
    findOneV2(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }


    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }


    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    create(): string {
        return 'This action adds a new cat';
    }
}

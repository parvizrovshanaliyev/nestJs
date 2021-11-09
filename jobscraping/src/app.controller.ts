import {Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {JobSearchResponseDto} from "./dto/jobSearch.response.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("vacancies")
  getVacanciesAsync(@Query() query): Promise<void> {
    return this.appService.getVacancies(query);
  }
}

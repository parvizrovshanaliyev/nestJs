import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task, TaskStatus} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService) {
    }

    @Get()
    getAll(@Query() filterDto: GetTasksFilterDto):Task[]{
        
        // if we have any defined filters , call  taskService.getTasksWithFilters
        // otherwise, just get all tasks
        if(Object.keys(filterDto).length){
            return this.taskService.getAllWithFilter(filterDto);
        }else{
            return this.taskService.getAll();   
        }
    }

    @Get('/:id')
    getById(@Param('id') id:string):Task{
        return    this.taskService.getById(id);
    }
    
    // @Post('v1')
    // createv1(@Body('title') title:string,
    //        @Body('description') description:string) : Task{
    //     return this.taskService.create(title,description);
    // }

    @Post()
    create(@Body() createTaskDto:CreateTaskDto) : Task{
        return this.taskService.create(createTaskDto);
    }
    @Patch('/:id')
    updateStatus(@Param('id') id:string,@Body('status') status:TaskStatus):Task{
          return this.taskService.updateStatus(id,status);
    }
    
    @Delete('/:id')
    delete(@Param('id') id:string):void{
        return  this.taskService.delete(id);
    }
}

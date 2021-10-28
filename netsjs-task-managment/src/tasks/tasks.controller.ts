import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";
import {Task} from "./task.entity";

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    #region //v1 
    // @Get()
    // getAll(@Query() filterDto: GetTasksFilterDto): Task[] {
    //
    //     // if we have any defined filters , call  taskService.getTasksWithFilters
    //     // otherwise, just get all tasks
    //     if (Object.keys(filterDto).length) {
    //         return this.taskService.getAllWithFilter(filterDto);
    //     } else {
    //         return this.taskService.getAll();
    //     }
    // }
    //
    // @Get('/:id')
    // getById(@Param('id') id: string): Task {
    //     return this.taskService.getById(id);
    // }
    //
    // // @Post('v1')
    // // createv1(@Body('title') title:string,
    // //        @Body('description') description:string) : Task{
    // //     return this.taskService.create(title,description);
    // // }
    //
    // @Post()
    // create(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.taskService.create(createTaskDto);
    // }
    //
    // @Patch('/:id')
    // updateStatus(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto): Task {
    //     const { status } = dto;
    //     return this.taskService.updateStatus(id, status);
    // }
    //
    // @Delete('/:id')
    // delete(@Param('id') id: string): void {
    //     return this.taskService.delete(id);
    // }
    #endregion
    
    #regionV2 // v2
    @Get()
    getAll(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getAll(filterDto);
    }
    
    @Get('/:id')
    getById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getById(id);
    }

    @Post()
    create(@Body() dto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(dto);
    }

    @Patch('/:id')
    updateStatus(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto): Promise<Task> {
        const { status } = dto;
        return this.taskService.updateStatus(id, status);
    }
    
    @Delete('/:id')
    delete(@Param('id') id: string): Promise<void> {
        return  this.taskService.delete(id);
    }
    #endregionV2
}

import {Injectable, NotFoundException} from '@nestjs/common';
import {TasksRepository} from "./tasks.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "../task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {TaskStatus} from "./task-status.enum";

@Injectable()
export class TasksService  {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository:TasksRepository
    ) {
    }
    
    #region // v1
    // private tasks:Task[]=[];
    // getById(id:string):Task{
    //     // try  to get task
    //     const found=this.tasks.find((task)=> task.id===id);
    //     // if not found, throw  an error (404 not found)
    //     if(!found){
    //         throw new NotFoundException(`task  with id ${id} not found`);
    //     }
    //     // otherwise , return the found task
    //     return found;
    // }
    // getAll():Task[]{
    //     return this.tasks;
    // }
    // getAllWithFilter(filterDto:GetTasksFilterDto):Task[]{
    //     const{status,search}=filterDto;
    //     // define temporary array  to hold the array
    //     let tasks=this.getAll();
    //     // do something with status
    //     if(status){
    //         tasks= tasks.filter((i)=>i.status===status);
    //     }
    //     // do something  with search
    //     if (search) {
    //         tasks= tasks.filter((i)=>{
    //             return i.title.includes(search) || i.description.includes(search);
    //         })
    //     }
    //     // return final result
    //     return tasks;
    // }
    // create(dto:CreateTaskDto):Task{
    //     const{title,description}=dto;
    //     const task:Task={
    //         // id generate auto yarn add uuid
    //         id:uuid(),
    //         title,
    //         description,
    //         status:TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }
    // updateStatus(id:string, status:TaskStatus):Task{
    //     const task = this.getById(id);
    //     task.status = status;
    //     return task;
    // }
    // delete(id:string):void{
    //     const found = this.getById(id);
    //     this.tasks=this.tasks.filter((i)=>i.id!==found.id);
    // }
    #endregion
    
    #regionV2 //v2
    getAll(filterDto:GetTasksFilterDto):Promise<Task[]>{
        return this.tasksRepository.getAllAsync(filterDto);
    }
    
    async getById(id:string):Promise<Task>{
        const found=await this.tasksRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found;
    }

    create(dto:CreateTaskDto):Promise<Task>{
        return this.tasksRepository.createAsync(dto);
    }
    
    updateStatus(id:string, status:TaskStatus):Promise<Task>{
        return this.tasksRepository.updateStatusAsync(id,status);
    }
    
    delete(id:string):Promise<void>{
        return this.tasksRepository.deleteAsync(id);
    }
    #endregionV2
    
}

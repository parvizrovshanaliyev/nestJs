import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from "./task.model";
import{v4 as uuid} from 'uuid';
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
    private tasks:Task[]=[];
    
    getById(id:string):Task{
        return this.tasks.find((task)=> task.id===id);
    }
    getAll():Task[]{
        return this.tasks;
    }

    getAllWithFilter(filterDto:GetTasksFilterDto):Task[]{
        const{status,search}=filterDto;
        // define temporary array  to hold the array
        let tasks=this.getAll();
        // do something with status
        if(status){
             tasks= tasks.filter((i)=>i.status===status);
        }
        // do something  with search
        if (search) {
            tasks= tasks.filter((i)=>{
                return i.title.includes(search) || i.description.includes(search);
            })
        }
        // return final result
        return tasks;
    }
    
    create(dto:CreateTaskDto):Task{
        const{title,description}=dto; 
        const task:Task={
            // id generate auto yarn add uuid
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task; 
    }

    updateStatus(id:string, status:TaskStatus):Task{
        const task = this.getById(id);
        task.status = status;
        return task;
    }
    
    delete(id:string):void{
        this.tasks=this.tasks.filter((i)=>i.id!==id);
    }
    
}

import {EntityRepository, Repository} from "typeorm";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatus} from "./task-status.enum";
import {NotFoundException} from "@nestjs/common";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {Task} from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{

    async getAllAsync(filterDto:GetTasksFilterDto):Promise<Task[]>{
        const{status,search}=filterDto;
        const query= this.createQueryBuilder('task');
        if(status){
            query.andWhere('task.status= :status',{status});//&&
        }
        
        if(search){
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE :search',
                {search:`%${search}%`}
            );
        }
        return await query.getMany();
    }
    async getById(id:string):Promise<Task>{
        const found=await this.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found;
    }
    
    async createAsync(dto:CreateTaskDto):Promise<Task>{
        const{title,description}=dto;
        const entity =  this.create({
            title,
            description,
            status:TaskStatus.OPEN
        });
        await this.save(entity);
        return entity;
    }

    async updateStatusAsync(id: string, status: TaskStatus): Promise<Task> {
        const entity = await this.getById(id);
        entity.status = status;
        await this.save(entity);
        return entity;
    }
    
    async deleteAsync(id:string):Promise<void>{
        const result = await this.delete(id);
        //console.log(result);
        if(result.affected===0){
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
    }
}
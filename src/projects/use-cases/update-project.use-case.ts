import { Repository } from "typeorm";
import { CreateProjectDto } from "../dto/create-project.dto";
import { Project, ProjectStatus } from "../entities/project.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateProjectDto } from "../dto/update-project.dto";

@Injectable()
export class UpdateProjectUseCase {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>
    ) {}

    async excute(id: string, updateProjectDto: UpdateProjectDto) {
        const project = await this.projectRepo.findOneOrFail({
            where: { id },
          });
          updateProjectDto.name && (project.name = updateProjectDto.name);
          updateProjectDto.description &&
            (project.description = updateProjectDto.description);
      
          if (updateProjectDto.started_at) {
            if (project.status === ProjectStatus.Active) {
              throw new Error('Cannot start activated project');
            }
      
            if (project.status === ProjectStatus.Completed) {
              throw new Error('Cannot start completed project');
            }
      
            if (project.status === ProjectStatus.Cancelled) {
              throw new Error('Cannot start cancelled project');
            }
      
            project.started_at = updateProjectDto.started_at;
            project.status = ProjectStatus.Active;
          }
      
          if (updateProjectDto.cancelled_at) {
            if (project.status === ProjectStatus.Completed) {
              throw new Error('Cannot cancel completed project');
            }
      
            if (project.status === ProjectStatus.Cancelled) {
              throw new Error('Cannot cancel cancelled project');
            }
      
            if (updateProjectDto.cancelled_at < project.started_at) {
              throw new Error('Cannot cancel project before it was started');
            }
      
            project.cancelled_at = updateProjectDto.cancelled_at;
            project.status = ProjectStatus.Cancelled;
          }
      
          if (updateProjectDto.finished_at) {
            if (project.status === ProjectStatus.Completed) {
              throw new Error('Cannot finish completed project');
            }
      
            if (project.status === ProjectStatus.Cancelled) {
              throw new Error('Cannot finish cancelled project');
            }
      
            if (updateProjectDto.finished_at < project.started_at) {
              throw new Error('Cannot finish project before it was started');
            }
      
            project.finished_at = updateProjectDto.finished_at;
            project.status = ProjectStatus.Completed;
          }
      
          return this.projectRepo.update(id, updateProjectDto);
    
    }
}
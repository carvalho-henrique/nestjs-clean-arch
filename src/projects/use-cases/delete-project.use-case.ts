import { CreateProjectDto } from "../dto/create-project.dto";
import { Project } from "../entities/project.entity";
import { Inject, Injectable } from "@nestjs/common";
import { IProjectRepository } from "../project.repository";

@Injectable()
export class DeleteProjectUseCase {
    constructor(
        @Inject('IProjectRepository')
        private readonly projectRepo: IProjectRepository
    ) {}

    async excute(id: string) {
        await this.projectRepo.delete(id);
    }
}
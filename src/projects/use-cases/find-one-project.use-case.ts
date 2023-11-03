import { Repository } from "typeorm";
import { Project } from "../entities/project.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FindOneProjectUseCase {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>
    ) {}

    excute(id: string) {
        return this.projectRepo.findOneOrFail({ where: { id }});
    }
}
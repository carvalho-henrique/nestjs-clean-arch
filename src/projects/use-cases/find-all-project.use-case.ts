import { Inject, Injectable } from "@nestjs/common";
import { IProjectRepository } from "../project.repository";

@Injectable()
export class FindAllProjectUseCase {
    constructor(
        @Inject('IProjectRepository')
        private readonly projectRepo: IProjectRepository
    ) {}

    excute() {
        return this.projectRepo.findAll();
    }
}
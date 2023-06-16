import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Request } from "src/entities/request.entity";
import { CreateRequestDto } from "./dto/create-request.dto";
import { IRequest } from "./model";

import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";


@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(Request)
        private requestsRepository: Repository<Request> 
    ) {}

    async createRequest(dto: CreateRequestDto): Promise<IRequest | object> {

        const phone = dto.phone;
        const tryFindSimilar = await this.requestsRepository.findOneBy({ phone: phone })
        if (tryFindSimilar != null) {
            throw new HttpException({ message: 'RequestAlreadyExists' }, HttpStatus.CONFLICT);
        }

        const [all_requests, count] = await this.requestsRepository.findAndCount();
        const new_id = count + 1;
        const obj = {
            id: new_id,
            ...dto
        }
        const request = await this.requestsRepository.create(obj);
        return await this.requestsRepository.save(request);
    }

    async delall(): Promise<string> {
        const all = await this.requestsRepository.find();
        all.forEach(async (req: IRequest) => {
            const id = req.id
            await this.requestsRepository.delete({ id: id });
        });
        return 'All deleted.'
    }

    async getAll() {
        return await this.requestsRepository.find();
    }

    async accept(id: number) {
        await this.requestsRepository.delete({ id: id })
        const requests = await this.requestsRepository.find()
        requests.forEach(async (req)=>{
            if (req.id > id) {
                await this.requestsRepository.delete({ id: req.id })
                req.id--
                await this.requestsRepository.save(req)
            }
        })
        return await this.requestsRepository.find()
    }
}
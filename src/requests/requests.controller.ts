import { Delete, Get, Post, Body, Param, } from '@nestjs/common';

import { Controller } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { IRequest } from './model';


@Controller('requests')
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) {}

    @Post('/create')
    createRequest(@Body() dto: CreateRequestDto): Promise<IRequest | object> {
        return this.requestsService.createRequest(dto);
    }

    @Delete('/delall')
    delAll(): Promise<string> {
        return this.requestsService.delall();
    }

    @Get('/getall')
    getAll() {
        return this.requestsService.getAll();
    }

    @Post('/accept/:id')
    accept(@Param('id') id: number) {
        return this.requestsService.accept(id)
    }
}
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Request {

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    car: string

}
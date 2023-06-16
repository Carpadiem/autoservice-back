import { Entity, Column, PrimaryColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryColumn()
    id: number

    @Column()
    username: string

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    password: string

    @Column()
    role: string = 'user'

}
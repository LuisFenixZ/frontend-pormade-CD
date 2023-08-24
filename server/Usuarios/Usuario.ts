import {type} from 'os';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("users")
export default class Usuario {

    @PrimaryGeneratedColumn()
    id_user? : Number;

    @Column({type: "varchar"})
    email : String;

    @Column({type: "varchar"})
    password : string;

    @Column({ type: "boolean", default: false})
    is_admin?: boolean;
}
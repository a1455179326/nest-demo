import {Column,CreateDateColumn,Entity,PrimaryGeneratedColumn} from "typeorm"

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id!:number
    

    @Column({type:'text',unique:true})
    username!:string

    @Column({type:'text',select:false})
    passwordHash!:string

    @CreateDateColumn()
    createdAt!:Date
}
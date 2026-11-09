import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn
} from  'typeorm';

@Entity('animals')
export class Animal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    species: string;

    @Column()
    age: number;

    @CreateDateColumn()
    createdAt: Date;
}

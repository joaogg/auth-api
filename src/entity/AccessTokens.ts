import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length } from "class-validator";
  
  @Entity()
  export class AccessToken {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 50)
    token: string;

    @Column()
    @Length(4, 2000)
    to: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
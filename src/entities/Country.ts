import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from 'typeorm';
  import { ID, Field, ObjectType } from 'type-graphql';
  
  @ObjectType()
  @Entity()
  export class Country extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id?: number;
  
    @Field()
    @Column({ unique: true })
    code: string;
  
    @Field()
    @Column()
    name: string;
  
    @Field()
    @Column()
    emoji: string;
  
    @Field({ nullable: true })
    @Column()
    continentCode?: string;

    constructor(code: string, name: string, emoji: string, continentCode: string) {
        super();
        this.code = code;
        this.name = name;
        this.emoji = emoji;
        this.continentCode = continentCode;
    }
  }
  
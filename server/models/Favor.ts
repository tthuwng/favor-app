import { ObjectType, Field, ID } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export default class Favor extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  text: string; // Full text at that point in time

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @Field()
  @Column()
  description: string; // Description of all changes between last legislation update and now; ML-generated stuffs

  @Field(() => Date)
  @Column()
  timestamp: Date;
}

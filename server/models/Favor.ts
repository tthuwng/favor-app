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
  reward: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  favorType: string;

  @Field()
  @Column()
  timeNeeded: Date;

  @Field()
  @Column()
  completed: Boolean;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  @Column()
  timestamp: Date;
}

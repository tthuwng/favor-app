import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  ID,
} from 'type-graphql';
import Favor from '../models/Favor';

@InputType()
class CreateFavorInput {
  @Field()
  reward: number;

  @Field()
  description: string;

  @Field()
  timestamp: string;

  @Field()
  favorType: string;

  @Field()
  timeNeeded: Date;
}

@Resolver()
export default class FavorResolver {
  @Mutation(() => Favor)
  async createFavor(@Arg('data') data: CreateFavorInput) {
    const favor = new Favor();

    favor.description = data.description;
    favor.reward = data.reward;
    favor.timestamp = new Date(data.timestamp);

    await favor.save();

    return favor;
  }
}

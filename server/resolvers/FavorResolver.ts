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

const allRelations = ['indices', 'policy', 'categories'];
@InputType()
class CreateFavorInput {
  @Field()
  text: string;

  @Field()
  description: string;

  @Field()
  timestamp: string;

  @Field(() => [String])
  indices: string[];

  @Field(() => [String])
  categories: string[];
}

@Resolver()
export default class FavorResolver {
  @Query(() => [Favor])
  favors() {
    return Favor.find({
      relations: allRelations,
    });
  }

  @Query(() => Favor)
  favor(@Arg('id', () => ID) id: string) {
    return Favor.findOneOrFail(id, {
      relations: allRelations,
    });
  }

  @Mutation(() => Favor)
  async createFavor(@Arg('data') data: CreateFavorInput) {
    const favor = new Favor();

    favor.description = data.description;
    favor.text = data.text;
    favor.timestamp = new Date(data.timestamp);

    await favor.save();

    return favor;
  }
}

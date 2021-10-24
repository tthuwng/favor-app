import {
  Arg,
  Authorized,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import User from '../models/User';

const allRelations = [
  'subscribedCategories',
  'subscribedEntities',
  'subscribedPolicies',
];

@InputType()
class CreateUserInput {
  @Field()
  uid: string;

  @Field(() => [String])
  categories: string[];

  @Field(() => [String])
  entities: string[];
}

@Resolver()
export default class UserResolver {
  @Mutation(() => User)
  // @Authorized(['admin'])
  async createUser(@Arg('data') data: CreateUserInput) {
    const user = new User();
    user.id = data.uid;

    await user.save();

    return user;
  }

  @Query(() => User)
  user(@Arg('id') id: string) {
    return User.findOneOrFail(id, {
      relations: allRelations,
    });
  }

  @Mutation(() => User)
  //   @Authorized(['admin', 'authed'])
  async followEntity(@Arg('id') id: string, @Arg('entity') entityID: string) {
    const user = await User.findOneOrFail(id, {
      relations: ['subscribedEntities'],
    });

    await user.save();

    return user;
  }

  @Mutation(() => User)
  //   @Authorized(['admin', 'authed'])
  async followCategory(
    @Arg('id') id: string,
    @Arg('category') entityID: string
  ) {
    const user = await User.findOneOrFail(id, {
      relations: ['subscribedEntities'],
    });

    await user.save();

    return user;
  }

  @Mutation(() => User)
  //   @Authorized(['admin', 'authed'])
  async followPolicy(@Arg('id') id: string, @Arg('policy') entityID: string) {
    const user = await User.findOneOrFail(id, {
      relations: ['subscribedEntities'],
    });

    await user.save();

    return user;
  }
}

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

@InputType()
class CreateUserInput {
  @Field()
  uid: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  rewards: string;
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
}

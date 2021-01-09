import { 
    Arg, 
    FieldResolver,
    Query,
    Mutation,
    Resolver,
    Root
} from 'type-graphql';

import { UserData, users} from '../data';
import User from '../schema/User';
import { UserInput } from './userInput';

@Resolver(of => User)
export default class {

    @Query(returns => String)
    hello(): String {
        return 'Welcome';
    }

    @Query(returns => User, { nullable: true })
    userByID(@Arg('id') id: number): UserData | undefined {
        return users.find(user => user.id === id);
    }

    @Mutation(retuns => User)
    createUser(
        @Arg('userInfo'){ name, email }: UserInput
    ): UserData[] {
        let id = users.length + 1;
        return users.concat({
            id,
            name,
            email
        });
    }
}
import { Query, Resolver } from 'type-graphql';

// create a typegraphql resolver
@Resolver()
export default class ExampleResolver {
  // create a query
  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}

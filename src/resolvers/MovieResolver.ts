import {
  Arg,
  Int,
  Mutation,
  Resolver,
  Query,
  InputType,
  Field,
} from 'type-graphql';
import { Movie } from './../entity/Movie';

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(@Arg('options', () => MovieInput) options: MovieInput) {
    const movie = await Movie.create(options).save();
    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg('id', () => Int) id: number,
    @Arg('update', () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await Movie.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg('id', () => Int) id: number) {
    await Movie.delete({ id });
    return true;
  }

  @Query(() => [Movie])
  getAllMovies() {
    return Movie.find();
  }

  @Query(() => Movie)
  getMovieById(@Arg('id', () => Int) id: number) {
    return Movie.findOne(id);
  }
}
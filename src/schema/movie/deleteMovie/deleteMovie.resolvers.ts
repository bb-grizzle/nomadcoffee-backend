import { Resolvers } from "../../../type";

const resolver: Resolvers = {
	Mutation: {
		deleteMovie: (_, { id }, { client }) => client.movie.delete({ where: { id } }),
	},
};

export default resolver;

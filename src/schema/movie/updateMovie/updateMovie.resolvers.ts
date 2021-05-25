import { Resolvers } from "../../../type";

const resolver: Resolvers = {
	Mutation: {
		updateMovie: (_, { id, title, year, genre }, { client }) =>
			client.movie.update({
				where: { id },
				data: {
					title,
					year,
					genre,
				},
			}),
	},
};

export default resolver;

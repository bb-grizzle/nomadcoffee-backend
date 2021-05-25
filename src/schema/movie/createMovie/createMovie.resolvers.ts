import { Resolvers } from "../../../type";

const resolver: Resolvers = {
	Mutation: {
		createMovie: (_, { title, year, genre }, { client }) => {
			return client.movie.create({
				data: {
					title,
					year,
					genre,
				},
			});
		},
	},
};
export default resolver;

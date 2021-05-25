import { Resolvers } from "../../../type";

const resolver: Resolvers = {
	Query: {
		seeMovie: (_, { id }, { client }) => {
			return client.movie.findUnique({ where: { id } });
		},
	},
};
export default resolver;

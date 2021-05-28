import { Resolvers } from "../../../type";

const resolver: Resolvers = {
	Query: {
		seeUser: async (_, { username }, { client }) =>
			client.user.findUnique({
				where: {
					username,
				},
			}),
	},
};

export default resolver;

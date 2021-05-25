import { ApolloServer } from "apollo-server";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
require("dotenv").config();

const port = process.env.PORT || 4000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		return {
			client,
		};
	},
});

server.listen(port).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

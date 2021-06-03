import { ApolloServer } from "apollo-server-express";
import express from "express";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
import { getUserByToken } from "./schema/user/user.util";
import * as logger from "morgan";
require("dotenv").config();

const port = process.env.PORT || 4000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		return {
			client,
			loggedInUser: await getUserByToken(req.headers.token as string),
		};
	},
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));

server.applyMiddleware({ app });

app.listen(port, () => {
	console.log(`🚀  Server ready at http://localhost:${port}`);
});

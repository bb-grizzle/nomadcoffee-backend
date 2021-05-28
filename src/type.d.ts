import { PrismaClient, User } from "@prisma/client";

export type CtxType = {
	client: PrismaClient;
	loggedInUser: User;
};

export type Resolver = (root: any, args: any, ctx: CtxType, info: any) => any;

export type Resolvers = {
	[key: string]: {
		[key: string]: Resolver;
	};
};

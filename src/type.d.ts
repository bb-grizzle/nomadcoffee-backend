import { PrismaClient } from "@prisma/client";

type CtxType = {
	client: PrismaClient;
};

export type Resolver = (root: any, args: any, ctx: CtxType, info: any) => any;

export type Resolvers = {
	[key: string]: {
		[key: string]: Resolver;
	};
};

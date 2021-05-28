import { CtxType, Resolver } from "./../../type.d";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import client from "../../client";
export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

export const getUserByToken = async (token: string) => {
	if (!token) {
		return null;
	}
	const { userId } = jwt.verify(token, process.env.SECRET_KEY);
	if (!userId) {
		return null;
	} else {
		const loggedInUser = await client.user.findUnique({ where: { id: userId } });
		return loggedInUser;
	}
};

export const protectResolver = (resolvers: Resolver) => (root, args, ctx: CtxType, info) => {
	if (!ctx.loggedInUser) {
		return {
			ok: false,
			error: "😀 Need log in.",
		};
	}

	return resolvers(root, args, ctx, info);
};

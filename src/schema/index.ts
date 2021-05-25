import { mergeTypeDefs, mergeResolvers, loadFilesSync } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
export const typeDefs = mergeTypeDefs(loadedTypes);

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);
export const resolvers = mergeResolvers(loadedResolvers);

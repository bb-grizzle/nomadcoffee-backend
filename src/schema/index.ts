import { mergeTypeDefs, mergeResolvers, loadFilesSync } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.*`);
export const typeDefs = mergeTypeDefs(loadedTypes);

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.*`);
export const resolvers = mergeResolvers(loadedResolvers);

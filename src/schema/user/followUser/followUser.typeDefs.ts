import { gql } from "apollo-server-core";

export default gql`
	type Mutation {
		followUser(id: Int!): MutationResult!
	}
`;

import { gql } from "apollo-server-core";

export default gql`
	type loginResult {
		ok: Boolean!
		error: String
		token: String
	}
	type Mutation {
		login(keyword: String!, password: String!): loginResult
	}
`;

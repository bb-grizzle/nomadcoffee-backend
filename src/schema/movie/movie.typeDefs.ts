import { gql } from "apollo-server-core";
export default gql`
	type Movie {
		id: Int!
		title: String!
		year: Int!
		genre: String
		createtAt: String!
		updatedAt: String!
	}
`;

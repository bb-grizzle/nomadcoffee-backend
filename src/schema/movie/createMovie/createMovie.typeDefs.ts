import { gql } from "apollo-server-core";
export default gql`
	type Mutation {
		createMovie(title: String!, year: Int!, genre: String): Movie!
	}
`;

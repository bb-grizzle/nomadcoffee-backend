import { gql } from "apollo-server-core";
export default gql`
	type Mutation {
		updateMovie(id: Int!, title: String, year: Int, genre: String): Movie
	}
`;

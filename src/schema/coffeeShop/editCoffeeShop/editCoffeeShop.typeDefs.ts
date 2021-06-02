import { gql } from "apollo-server-core";

export default gql`
	type Mutation {
		editCoffeeShop(id: Int!, name: String, latitude: String, longitude: String, addphotos: [Upload], deletePhotos: [Int], categories: [String]): MutationResult!
	}
`;

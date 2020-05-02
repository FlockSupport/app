import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {gql} from "apollo-boost";

  // const client = new ApolloClient({
  //   uri:'http://localhost:8080/query'
  // });

  const USERS = gql`
        query users {
          users {
            id
            name
            age
          }
        }
      `;
   




// const EXCHANGE_RATES = gql`
//   {
//     todos {
//       text
//       done
//       user {
//         name
//       }
//     }
//   }
// `;



function Page() {
  const { loading, error, data } = useQuery(USERS);

  console.log(error);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ id, name, age }) => (
    <div>
      <p>
        {id}: {name} : {age}
      </p>
    </div>
  ));
}

export default Page;

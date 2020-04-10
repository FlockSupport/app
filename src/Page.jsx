import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const EXCHANGE_RATES = gql`
  {
    todos {
      text
      done
      user {
        name
      }
    }
  }
`;

function Page() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  console.log(error);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.todos.map(({ id, text, done, user }) => (
    <div>
      <p>
        {id}: {text} : {done} : {user.id} : {user.name}
      </p>
    </div>
  ));
}

export default Page;

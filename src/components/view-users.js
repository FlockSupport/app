import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {gql} from "apollo-boost";

  const USERS = gql`
        query users {
          users {
            id
            email
            age
            uid
          }
        }
      `;

export default function ViewUsers() {
  const { loading, error, data, refetch } = useQuery(USERS);
 
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  
  var userlist = data.users.map(({ id, email, age, uid }) => (
    <div key={id}>
      <p>
        ID: {id}, EMAIL: {email}, AGE: {age}, UID: {uid}
      </p>
    </div>
  ))

  return (
    <div>
      <button onClick={() => refetch()}>
        Click me to refresh list!
      </button>
      {userlist}
    </div>
  )
}


import React, { Fragment } from "react";
import { List } from "semantic-ui-react";

import User from "./user";

const ListUsers = (props) => {
  return (
    <Fragment>
      <List celled>
        {props.users.map((usr) => (
          <User key={usr._id} user={props.loggedInUser} id={usr._id} name={usr.name} email={usr.email} createdAt={usr.createdAt} access={usr.role} />
        ))}
      </List>
    </Fragment>
  );
};

export default ListUsers;

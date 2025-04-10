import React from "react";
import { List } from "semantic-ui-react";
import axios from "axios";
import { Button, Dropdown } from "semantic-ui-react";
import config from "../../../config";

const options = [
  { name: "user", text: "user", value: "user" },
  { name: "administrator", text: "administrator", value: "administrator" },
];
const handleSelect = async (event, id) => {
  console.log(event.target);
  console.log(event);
  console.log("Selected");
  // grab value and user id
  let value = {
    role: event.target.innerHTML,
  };
  let userID = id;
  console.log(value);
  console.log(userID);
  // make request
  try {
    let request = await axios.put(
      `${config.apiUrl}/api/v1/users/update/role/${userID}`,
      value
    );
    console.log(request);
    window.location.reload(false);
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async (id) => {
  try {
    let userID = id;
    let request = await axios.delete(
      `${config.apiUrl}/api/v1/users/delete/${userID}`
    );
    console.log(request);
    window.location.reload(false);
  } catch (err) {
    console.log(err);
  }
};

const User = (props) => {
  console.log("PROPS", props);
  return (
    <List.Item>
      <List.Content className="list-content">
        <List.Header>Name</List.Header>
        <List.Description>{props.name}</List.Description>
      </List.Content>
      <List.Content className="list-content">
        <List.Header>Email</List.Header>
        <List.Description>{props.email}</List.Description>
      </List.Content>
      <List.Content className="list-content">
        <List.Header>Account Created</List.Header>
        <List.Description>{props.createdAt}</List.Description>
      </List.Content>
      <List.Content className="list-content">
        <List.Header>Role</List.Header>
        <List.Description>{props.access}</List.Description>
      </List.Content>
      {props.user.role === "administrator" ? (
        <List.Content className="list-content">
          <Button onClick={() => handleDelete(props.id)}>Delete</Button>
          <Button>
            <Dropdown
              text="Role"
              onChange={(event) => handleSelect(event, props.id)}
              simple
              item
              options={options}
            />
          </Button>
        </List.Content>
      ) : null}
    </List.Item>
  );
};

export default User;

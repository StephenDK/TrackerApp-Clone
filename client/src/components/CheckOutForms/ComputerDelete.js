import React from "react";
import axios from "axios";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import config from "../../config";

const DeleteComputer = (props) => {
  // const [open, setOpen] = React.useState(false)

  const handleDelete = async () => {
    const data = await axios.delete(
      `${config.apiUrl}/api/v1/${props.val}/${props.id}`
    );
    console.log(data);
    props.handleDeleteModal();
    props.history.push("/");
  };

  return (
    <Modal
      basic
      onClose={() => props.handleDeleteModal()}
      open={true}
      size="small"
    >
      <Header icon>
        <Icon name="trash alternate" />
        Delete Inventory Item:
      </Header>
      <Modal.Content>
        <p>Are you sure you want to delete this inventory item?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          color="red"
          inverted
          onClick={() => props.handleDeleteModal()}
        >
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={() => handleDelete()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteComputer;

import React, { Component, Fragment } from "react";
import moment from "moment";
import { Segment, Item, Button, Loader } from "semantic-ui-react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import AccessoryCheckOutForm from "../../CheckOutForms/Accessories/accessoryCheckOutForm";
import AccessoryCheckInForm from "../../CheckOutForms/Accessories/accessoryCheckInForm";
import AccessoryUpdateForm from "../../CheckOutForms/Accessories/accessoryUpdateForm";
import AccessoryDeleteForm from "../../CheckOutForms/Accessories/accessoryDeleteForm";
import TagForm from "../../CheckOutForms/addDeleteTags";

class accessoryItem extends Component {
  state = {
    toggleCheckOut: false,
    showDeleteModal: false,
    toggleCheckIn: false,
    toggleUpdateForm: false,
    toggleTagForm: false,
  };

  toggleCheckOutForm = () => {
    this.setState({
      toggleCheckOut: !this.state.toggleCheckOut,
      showDeleteModal: false,
      toggleCheckIn: false,
      toggleUpdateForm: false,
    });
  };
  handleDeleteModal = () => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      toggleCheckOut: false,
      toggleCheckIn: false,
      toggleUpdateForm: false,
    });
  };

  closeToggleForm = () => {
    this.setState({ toggleCheckOut: false });
  };

  handleCheckInModal = () => {
    this.setState({
      toggleCheckIn: !this.state.toggleCheckIn,
      toggleCheckOut: false,
      showDeleteModal: false,
      toggleUpdateForm: false,
    });
  };

  handleUpdateForm = () => {
    this.setState({
      toggleUpdateForm: !this.state.toggleUpdateForm,
      toggleCheckOut: false,
      showDeleteModal: false,
      toggleCheckIn: false,
    });
  };

  handleTagForm = () => {
    this.setState({
      toggleTagForm: !this.state.toggleTagForm,
    });
  };

  // Scroll to top function
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use "auto" for instant scrolling without animation
    });
  };

  render() {
    // console.log("Props", this.props);
    // console.log("ITEM PROPS ON RENDER: ", this.props);
    // console.log(Object.keys(this.props.data).length);
    // console.log("ID AccessoryItem:", this.props.data._id);
    return (
      <Fragment>
        {this.props.loading ? (
          <Segment loading style={{ height: "150px" }}>
            <Loader />
          </Segment>
        ) : (
          <Fragment>
            <div style={{ marginTop: "60px" }}></div>
            <Segment.Group>
              <Segment>
                <Item>
                  <Item.Header>Edited By:</Item.Header>
                  <Item.Description>
                    {this.props.data.editedBy}
                  </Item.Description>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item.Header>Last Updated:</Item.Header>
                  <Item.Description>
                    {this.props.data.lastUpdated === null
                      ? ""
                      : moment(this.props.data.lastUpdated).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                  </Item.Description>
                </Item>
              </Segment>
              <Segment>
                <Item.Header>Tags:</Item.Header>
                <Item.Description style={{ margin: "10px 5px 5px 5px" }}>
                  <Stack direction="row" spacing={1}>
                    {this.props.data.tags.length < 1 ? (
                      <p>No Tags</p>
                    ) : (
                      this.props.data.tags.map((item, index) => (
                        <Chip key={index} label={item} />
                      ))
                    )}
                  </Stack>
                </Item.Description>
              </Segment>
              <Segment>
                <Item>
                  <Item.Header>Checked Out:</Item.Header>
                  <Item.Description>
                    {this.props.data.checkedOut ? "True" : "False"}
                  </Item.Description>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Category:</Item.Header>
                    <Item.Description>
                      {this.props.data.category}
                    </Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Barcode:</Item.Header>
                    <Item.Description>
                      {this.props.data.barcode}
                    </Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Serial:</Item.Header>
                    <Item.Description>
                      {this.props.data.serial}
                    </Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Make:</Item.Header>
                    <Item.Description>{this.props.data.make}</Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Model:</Item.Header>
                    <Item.Description>{this.props.data.model}</Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>User:</Item.Header>
                    <Item.Description>
                      {this.props.data.userName}
                    </Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Election:</Item.Header>
                    <Item.Description>
                      {this.props.data.election}
                    </Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Division:</Item.Header>
                    <Item.Description>
                      {this.props.data.division}
                    </Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Previous User:</Item.Header>
                    <Item.Description>
                      {this.props.data.prevUser}
                    </Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Manager:</Item.Header>
                    <Item.Description>
                      {this.props.data.manager}
                    </Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item>
                    <Item.Header>Description:</Item.Header>
                    <Item.Description>
                      {this.props.data.description}
                    </Item.Description>
                  </Item>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item.Header>Checked In Date:</Item.Header>
                  <Item.Description>
                    {this.props.data.checkedInDate === null
                      ? ""
                      : moment(this.props.data.checkedInDate).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                  </Item.Description>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item.Header>Checked Out Date:</Item.Header>
                  <Item.Description>
                    {this.props.data.checkedOutDate === null
                      ? ""
                      : moment(this.props.data.checkedOutDate).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                  </Item.Description>
                </Item>
              </Segment>
              <Segment>
                <Item>
                  <Item.Header>Date Inventoried:</Item.Header>
                  <Item.Description>
                    {moment(this.props.data.createdAt).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Item.Description>
                </Item>
              </Segment>
            </Segment.Group>
            <Segment.Group>
              <Segment>
                <Button
                  onClick={this.toggleCheckOutForm}
                  disabled={this.props.data.checkedOut}
                >
                  Check Out
                </Button>
                <Button
                  disabled={!this.props.data.checkedOut}
                  onClick={this.handleCheckInModal}
                >
                  Check In
                </Button>
                <Button
                  // disabled={}
                  onClick={() => {
                    this.handleUpdateForm();
                  }}
                >
                  Update
                </Button>
                <Button onClick={this.handleTagForm}>Tags</Button>
                <Button
                  onClick={this.handleDeleteModal}
                  style={{ float: "right" }}
                >
                  Delete
                </Button>
              </Segment>
              {this.state.toggleCheckOut ? (
                <AccessoryCheckOutForm
                  id={this.props.data._id}
                  toggleForm={this.toggleCheckOutForm}
                  description={this.props.data.description}
                />
              ) : null}
              {this.state.toggleCheckIn ? (
                <AccessoryCheckInForm
                  id={this.props.data._id}
                  toggleModal={this.handleCheckInModal}
                  barcode={this.props.data.barcode}
                />
              ) : null}
              {this.state.toggleUpdateForm ? (
                <AccessoryUpdateForm
                  {...this.props.data}
                  toggleModal={this.handleUpdateForm}
                />
              ) : null}
              {this.state.toggleTagForm ? (
                <TagForm
                  toggleForm={this.handleTagForm}
                  reRender={this.props.reRender}
                  scrollToTop={this.scrollToTop}
                  tags={this.props.data.tags}
                  val="accessory"
                  id={this.props.data._id}
                />
              ) : null}
              {this.state.showDeleteModal ? (
                <AccessoryDeleteForm
                  id={this.props.data._id}
                  handleDeleteModal={this.handleDeleteModal}
                  {...this.props}
                />
              ) : null}
            </Segment.Group>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default accessoryItem;

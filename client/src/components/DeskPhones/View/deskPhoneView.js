import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../../config";
import {
  Grid,
  List,
  Segment,
  Button,
  Message,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import moment from "moment";
import DeskPhoneUpdate from "./Methods/deskPhoneUpdate";
import DeskPhoneLineUpdate from "./Methods/deskPhoneUpdateLines";
import DeleteDeskPhoneModal from "./Methods/deskPhoneDelete";
import TagForm from "../../CheckOutForms/addDeleteTags";

class deskPhoneView extends Component {
  state = {
    loading: true,
    deskphone: {},
    deskPhoneUpdateToggle: false,
    deskPhoneLineUpdateToggle: false,
    deskPhoneDeleteToggle: false,
    toggleTagForm: false,
  };

  async componentDidMount() {
    try {
      let request = await axios.get(
        `${config.apiUrl}/api/v1/desk/phone/${this.props.match.params.id}`
      );
      console.log(this.props.match.params.id);
      this.setState({
        loading: false,
        deskphone: { ...request.data.phone[0] },
      });
      console.log(request);
    } catch (err) {
      console.log(err);
    }
  }

  onToggleUpdateHandler = () => {
    this.setState({
      deskPhoneUpdateToggle: !this.state.deskPhoneUpdateToggle,
      deskPhoneLineUpdateToggle: false,
    });
  };

  onToggleLineUpdateHandler = () => {
    this.setState({
      deskPhoneLineUpdateToggle: !this.state.deskPhoneLineUpdateToggle,
      deskPhoneUpdateToggle: false,
    });
  };

  onToggleDeleteModal = () => {
    this.setState({
      deskPhoneDeleteToggle: !this.state.deskPhoneDeleteToggle,
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

  reRender = (item) => {
    this.setState({
      deskphone: { ...item },
    });
  };

  render() {
    let {
      phoneName,
      phoneMAC,
      phoneMake,
      phoneModel,
      phoneNumber,
      extension,
      user,
      location,
      division,
      lastUpdated,
      tags,
      description,
      editedBy,
      createdAt,
    } = this.state.deskphone;
    return (
      <Fragment>
        {this.state.loading ? (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        ) : (
          <div style={{ marginTop: "60px" }}>
            <Fragment>
              <h2>Desk Phone</h2>
              {/* <DeskPhoneListView {...this.state.deskphone} /> */}
              <Grid style={{ marginLeft: "0px" }}>
                <Grid.Row>
                  <List divided relaxed style={{ width: "100%" }}>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Last Updated</List.Header>
                        <List.Description>
                          {lastUpdated === null
                            ? ""
                            : moment(lastUpdated).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Edited By</List.Header>
                        <List.Description>{editedBy}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>DP #</List.Header>
                        <List.Description>{phoneName}</List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Header>Tags:</List.Header>
                      <List.Description style={{ margin: "10px 5px 5px 5px" }}>
                        <Stack direction="row" spacing={1}>
                          {tags.length < 1 ? (
                            <p>No Tags</p>
                          ) : (
                            tags.map((item, index) => (
                              <Chip key={index} label={item} />
                            ))
                          )}
                        </Stack>
                      </List.Description>
                    </List.Item>

                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>MAC</List.Header>
                        <List.Description>{phoneMAC}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Phone Number:</List.Header>
                        <List.Description>{phoneNumber}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Extension:</List.Header>
                        <List.Description>{extension}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Make</List.Header>
                        <List.Description>{phoneMake}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Model</List.Header>
                        <List.Description>{phoneModel}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Location</List.Header>
                        <List.Description>{location}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>User</List.Header>
                        <List.Description>
                          {user === null ? "None" : user}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Division</List.Header>
                        <List.Description>{division}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Description</List.Header>
                        <List.Description>{description}</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Lines</List.Header>
                        <Grid
                          columns={4}
                          container
                          stackable
                          style={{ marginTop: "10px" }}
                        >
                          <Grid.Row>
                            {this.state.deskphone.lines ? (
                              this.state.deskphone.lines.length > 0 ? (
                                this.state.deskphone.lines.map(
                                  (item, index) => (
                                    <Grid.Column key={index}>
                                      <Message
                                        header={item.lineName}
                                        content={item.lineNumber}
                                      />
                                    </Grid.Column>
                                  )
                                )
                              ) : (
                                <p>No Lines...</p>
                              )
                            ) : null}
                          </Grid.Row>
                          {/* {props.lines.length < 1 ? (
                    <p>No Lines</p>
                  ) : (
                    props.lines.map((item, index) => (
                      <div>
                        <p>{item.lineName}</p>
                        <p>{item.lineNumber}</p>
                      </div>
                    ))
                  )} */}
                        </Grid>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ paddingLeft: "10px" }}>
                      <List.Content className="list-content" floated="left">
                        <List.Header>Date Inventoried</List.Header>
                        <List.Description>
                          {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Row>
              </Grid>
              <Segment>
                <Button onClick={this.onToggleUpdateHandler}>Update</Button>
                <Button onClick={this.onToggleLineUpdateHandler}>Lines</Button>
                <Button onClick={this.handleTagForm}>Tags</Button>
                <Button
                  style={{ float: "right" }}
                  negative
                  onClick={this.onToggleDeleteModal}
                >
                  Delete
                </Button>
                {this.state.deskPhoneUpdateToggle ? (
                  <DeskPhoneUpdate
                    {...this.state.deskphone}
                    toggleUpdateHandler={this.onToggleUpdateHandler}
                  />
                ) : null}
                {this.state.toggleTagForm ? (
                  <TagForm
                    toggleForm={this.handleTagForm}
                    reRender={this.reRender}
                    scrollToTop={this.scrollToTop}
                    tags={tags}
                    val="desk/phone"
                    id={this.state.deskphone._id}
                  />
                ) : null}
                {this.state.deskPhoneLineUpdateToggle ? (
                  <DeskPhoneLineUpdate {...this.state.deskphone} />
                ) : null}
                {this.state.deskPhoneDeleteToggle ? (
                  <DeleteDeskPhoneModal
                    {...this.props}
                    handleDeleteModal={this.onToggleDeleteModal}
                    id={this.state.deskphone._id}
                  />
                ) : null}
              </Segment>
            </Fragment>
          </div>
        )}
      </Fragment>
    );
  }
}

export default deskPhoneView;

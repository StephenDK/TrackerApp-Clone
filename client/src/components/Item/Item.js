import React, { Component, Fragment } from "react";
import moment from "moment";
import { Segment, Item, Button, Loader } from "semantic-ui-react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

// componets
import ComputerCheckOutForm from "../CheckOutForms/ComputerCheckOut";
import DeleteComputerForm from "../CheckOutForms/ComputerDelete";
import CheckInForm from "../CheckOutForms/ComputerCheckIn";
import ComputerUpdateForm from "../CheckOutForms/computerUpdateForm";
import PhoneUpdateForm from "../CheckOutForms/phoneUpdateForm";
import DockUpdateForm from "../CheckOutForms/dockUpdateForm";
import MonitorUpdateForm from "../CheckOutForms/monitorUpdateForm";
import TeleWorkInAndOut from "../CheckOutForms/teleWorkInAndOut";
import TagForm from "../CheckOutForms/addDeleteTags";

class ItemInfo extends Component {
  state = {
    toggleCheckOut: false,
    showDeleteModal: false,
    toggleCheckIn: false,
    toggleComputerUpdateForm: false,
    togglePhoneUpdateForm: false,
    toggleDockUpdateForm: false,
    toggleMonitorUpdateForm: false,
    toggleTagForm: false,
  };

  toggleCheckOutForm = () => {
    this.setState({
      toggleCheckOut: !this.state.toggleCheckOut,
    });
  };
  handleDeleteModal = () => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
    });
  };

  closeToggleForm = () => {
    this.setState({ toggleCheckOut: false });
  };

  handleCheckInModal = () => {
    this.setState({
      toggleCheckIn: !this.state.toggleCheckIn,
    });
  };

  handleComputerUpdateForm = () => {
    this.setState({
      toggleComputerUpdateForm: !this.state.toggleComputerUpdateForm,
    });
  };

  handlePhoneUpdateForm = () => {
    this.setState({
      togglePhoneUpdateForm: !this.state.togglePhoneUpdateForm,
    });
  };

  handleDockUpdateForm = () => {
    this.setState({
      toggleDockUpdateForm: !this.state.toggleDockUpdateForm,
    });
  };

  handleMonitorUpdateForm = () => {
    this.setState({
      toggleMonitorUpdateForm: !this.state.toggleMonitorUpdateForm,
    });
  };

  handleTagForm = () => {
    this.setState({
      toggleTagForm: !this.state.toggleTagForm,
    });
  };

  handleTeleWorkForm = () => {
    this.setState({
      toggleTeleWorkForm: !this.state.toggleTeleWorkForm,
      toggleCheckOut: false,
      showDeleteModal: false,
      toggleCheckIn: false,
      toggleComputerUpdateForm: false,
      togglePhoneUpdateForm: false,
      toggleDockUpdateForm: false,
      toggleMonitorUpdateForm: false,
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
    console.log("ITEM PROPS ON RENDER: ", this.props);
    console.log(Object.keys(this.props.data).length);
    // console.log(this.props.data.length);
    return (
      // -------------Computers------------------------
      <Fragment>
        {this.props.val === "computers" ? (
          <div style={{ marginTop: "40px" }}>
            <Fragment>
              {Object.keys(this.props.data).length > 0 ? (
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
                  <Segment
                    style={{
                      backgroundColor: this.props.data.teleWork
                        ? "#EBDDC0"
                        : null,
                    }}
                  >
                    <Item.Header>Tele-Work:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWork ? "True" : "False"}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item.Header>Tele-Work Start Date:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWorkStartDate == null
                        ? ""
                        : moment(this.props.data.teleWorkStartDate).format(
                            "MM-DD-YYYY"
                          )}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item.Header>Tele-Work End Date:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWorkEndDate == null
                        ? ""
                        : moment(this.props.data.teleWorkEndDate).format(
                            "MM-DD-YYYY"
                          )}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Computer Serial:</Item.Header>
                      <Item.Description>
                        {this.props.data.computerSerial}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item.Header>Computer Name:</Item.Header>
                    <Item.Description>
                      {this.props.data.computerName}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Make:</Item.Header>
                      <Item.Description>
                        {this.props.data.computerMake}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Model:</Item.Header>
                      <Item.Description>
                        {this.props.data.computerModel}
                      </Item.Description>
                    </Item>
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
                      <Item.Header>Election:</Item.Header>
                      <Item.Description>
                        {this.props.data.election}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Checked Out User:</Item.Header>
                      <Item.Description>
                        {this.props.data.userName}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Manager:</Item.Header>
                      <Item.Description>
                        {this.props.data.manager}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Division:</Item.Header>
                      <Item.Description>
                        {this.props.data.division}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Peripherals:</Item.Header>
                      <Item.Description>
                        {this.props.data.periphs.length > 0
                          ? this.props.data.periphs.map((item) => (
                              <Item.Description key={item}>
                                {item}
                              </Item.Description>
                            ))
                          : "Empty"}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Description:</Item.Header>
                      <Item.Description>
                        {this.props.data.description}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Location:</Item.Header>
                      <Item.Description>
                        {this.props.data.location}
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
                      <Item.Header>Previous User:</Item.Header>
                      <Item.Description>
                        {this.props.data.prevUser}
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
              ) : (
                <Loader />
              )}
              <Segment.Group style={{ marginBottom: "15px" }}>
                <Segment>
                  <Button
                    onClick={this.toggleCheckOutForm}
                    disabled={this.props.data.checkedOut}
                  >
                    Check Out
                  </Button>{" "}
                  {/* Done */}
                  <Button
                    disabled={!this.props.data.checkedOut}
                    onClick={this.handleCheckInModal}
                  >
                    Check In
                  </Button>
                  {/* Update item in inventory button */}
                  <Button
                    // disabled={}
                    onClick={this.handleComputerUpdateForm}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={this.handleTeleWorkForm}
                    disabled={!this.props.data.checkedOut}
                  >
                    Telework
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
                  <ComputerCheckOutForm
                    id={this.props.data._id}
                    val={this.props.val}
                    toggleForm={this.closeToggleForm}
                  />
                ) : null}
                {this.state.toggleTagForm ? (
                  <TagForm
                    toggleForm={this.handleTagForm}
                    reRender={this.props.reRender}
                    scrollToTop={this.scrollToTop}
                    tags={this.props.data.tags}
                    val="computers"
                    id={this.props.data._id}
                  />
                ) : null}
                {this.state.showDeleteModal ? (
                  <DeleteComputerForm
                    {...this.props}
                    id={this.props.data._id}
                    handleDeleteModal={this.handleDeleteModal}
                    val={this.props.val}
                  />
                ) : null}
                {this.state.toggleCheckIn ? (
                  <CheckInForm
                    toggleModal={this.handleCheckInModal}
                    serial={this.props.data.computerSerial}
                    user={this.props.data.userName}
                    id={this.props.data._id}
                    val={this.props.val}
                  />
                ) : null}
                {/* Here is the work for updating items */}
                {this.state.toggleComputerUpdateForm ? (
                  <ComputerUpdateForm
                    id={this.props.data._id}
                    checkedOut={this.props.data.checkedOut}
                    computerName={this.props.data.computerName}
                    make={this.props.data.computerMake}
                    modal={this.props.data.computerModel}
                    userName={this.props.data.userName}
                    division={this.props.data.division}
                    manager={this.props.data.manager}
                    description={this.props.data.description}
                    location={this.props.data.location}
                    toggleModal={this.handleComputerUpdateForm}
                  />
                ) : null}
                {this.state.toggleTeleWorkForm ? (
                  <TeleWorkInAndOut
                    id={this.props.data._id}
                    device="computers"
                    teleWork={this.props.data.teleWork}
                    startDate={this.props.data.startDate}
                    endDate={this.props.data.endDate}
                    toggleTeleWorkForm={this.handleTeleWorkForm}
                  />
                ) : null}
              </Segment.Group>
              {/* ------------------------------------- */}
              {/* -------------------Phones============== */}
            </Fragment>
          </div>
        ) : null}
        {this.props.val === "phones" ? (
          <div style={{ marginTop: "40px" }}>
            <Fragment>
              {Object.keys(this.props.data).length > 0 ? (
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
                  <Segment
                    style={{
                      backgroundColor: this.props.data.teleWork
                        ? "#EBDDC0"
                        : null,
                    }}
                  >
                    <Item.Header>Tele-Work:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWork ? "True" : "False"}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item.Header>Tele-Work Start Date:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWorkStartDate == null
                        ? ""
                        : moment(this.props.data.teleWorkStartDate).format(
                            "MM-DD-YYYY"
                          )}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item.Header>Tele-Work End Date:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWorkEndDate == null
                        ? ""
                        : moment(this.props.data.teleWorkEndDate).format(
                            "MM-DD-YYYY"
                          )}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Phone IMEI</Item.Header>
                      <Item.Description>
                        {this.props.data.phoneIMEI}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Phone Make:</Item.Header>
                      <Item.Description>
                        {this.props.data.phoneMake}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Phone Model</Item.Header>
                      <Item.Description>
                        {this.props.data.phoneModel}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Phone Number:</Item.Header>
                      <Item.Description>
                        {this.props.data.phoneNumber}
                      </Item.Description>
                    </Item>
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
                      <Item.Header>Checked Out User:</Item.Header>
                      <Item.Description>
                        {this.props.data.userName}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Peripherals:</Item.Header>
                      <Item.Description>
                        {this.props.data.periphs.length > 0
                          ? this.props.data.periphs.map((item) => (
                              <p key={item}>{item}</p>
                            ))
                          : "Empty"}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Manager:</Item.Header>
                      <Item.Description>
                        {this.props.data.manager}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Division:</Item.Header>
                      <Item.Description>
                        {this.props.data.division}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Location:</Item.Header>
                      <Item.Description>
                        {this.props.data.location}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Description:</Item.Header>
                      <Item.Description>
                        {this.props.data.description}
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
                      <Item.Header>Previous User:</Item.Header>
                      <Item.Description>
                        {this.props.data.prevUser}
                      </Item.Description>
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
                      <Item.Header>Date Inventoried:</Item.Header>
                      <Item.Description>
                        {moment(this.props.data.createdAt).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Item.Description>
                    </Item>
                  </Segment>
                </Segment.Group>
              ) : (
                <Loader />
              )}
              <Segment.Group style={{ marginBottom: "15px" }}>
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
                  <Button onClick={this.handlePhoneUpdateForm}>Update</Button>
                  <Button
                    onClick={this.handleTeleWorkForm}
                    disabled={!this.props.data.checkedOut}
                  >
                    Telework
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
                  <ComputerCheckOutForm
                    id={this.props.data._id}
                    val={this.props.val}
                    toggleForm={this.closeToggleForm}
                  />
                ) : null}
                {this.state.toggleTagForm ? (
                  <TagForm
                    toggleForm={this.handleTagForm}
                    reRender={this.props.reRender}
                    scrollToTop={this.scrollToTop}
                    tags={this.props.data.tags}
                    val="phones"
                    id={this.props.data._id}
                  />
                ) : null}
                {this.state.showDeleteModal ? (
                  <DeleteComputerForm
                    {...this.props}
                    history={this.props.history}
                    id={this.props.data._id}
                    handleDeleteModal={this.handleDeleteModal}
                    val={this.props.val}
                  />
                ) : null}
                {this.state.toggleCheckIn ? (
                  <CheckInForm
                    toggleModal={this.handleCheckInModal}
                    serial={this.props.data.phoneIMEI}
                    user={this.props.data.userName}
                    id={this.props.data._id}
                    val={this.props.val}
                  />
                ) : null}
                {this.state.togglePhoneUpdateForm ? (
                  <PhoneUpdateForm
                    id={this.props.data._id}
                    checkedOut={this.props.data.checkedOut}
                    phoneIMEI={this.props.data.phoneIMEI}
                    phoneNumber={this.props.data.phoneNumber}
                    make={this.props.data.phoneMake}
                    modal={this.props.data.phoneModel}
                    userName={this.props.data.userName}
                    division={this.props.data.division}
                    manager={this.props.data.manager}
                    description={this.props.data.description}
                    location={this.props.data.location}
                    toggleModal={this.handlePhoneUpdateForm}
                  />
                ) : null}
                {this.state.toggleTeleWorkForm ? (
                  <TeleWorkInAndOut
                    id={this.props.data._id}
                    device="phones"
                    teleWork={this.props.data.teleWork}
                    startDate={this.props.data.startDate}
                    endDate={this.props.data.endDate}
                    toggleTeleWorkForm={this.handleTeleWorkForm}
                  />
                ) : null}
              </Segment.Group>
            </Fragment>
          </div>
        ) : null}
        {/* ------------------------------ */}
        {/* --------------Monitors------------- */}
        {this.props.val === "monitors" ? (
          <div style={{ marginTop: "40px" }}>
            <Fragment>
              {Object.keys(this.props.data).length > 0 ? (
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
                  <Segment
                    style={{
                      backgroundColor: this.props.data.teleWork
                        ? "#EBDDC0"
                        : null,
                    }}
                  >
                    <Item.Header>Tele-Work:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWork ? "True" : "False"}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item.Header>Tele-Work Start Date:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWorkStartDate == null
                        ? ""
                        : moment(this.props.data.teleWorkStartDate).format(
                            "MM-DD-YYYY"
                          )}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item.Header>Tele-Work End Date:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWorkEndDate == null
                        ? ""
                        : moment(this.props.data.teleWorkEndDate).format(
                            "MM-DD-YYYY"
                          )}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Monitor Serial:</Item.Header>
                      <Item.Description>
                        {this.props.data.monitorSerial}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Monitor Make:</Item.Header>
                      <Item.Description>
                        {this.props.data.monitorMake}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Monitor Model</Item.Header>
                      <Item.Description>
                        {this.props.data.monitorModel}
                      </Item.Description>
                    </Item>
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
                      <Item.Header>Description:</Item.Header>
                      <Item.Description>
                        {this.props.data.description}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Location</Item.Header>
                      <Item.Description>
                        {this.props.data.location}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Checked Out User:</Item.Header>
                      <Item.Description>
                        {this.props.data.userName}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Department:</Item.Header>
                      <Item.Description>
                        {this.props.data.division}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Manager:</Item.Header>
                      <Item.Description>
                        {this.props.data.manager}
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
                      <Item.Header>Previous User:</Item.Header>
                      <Item.Description>
                        {this.props.data.prevUser}
                      </Item.Description>
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
                      <Item.Header>Date Inventoried:</Item.Header>
                      <Item.Description>
                        {moment(this.props.data.createdAt).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Item.Description>
                    </Item>
                  </Segment>
                </Segment.Group>
              ) : (
                <Loader />
              )}
              <Segment.Group style={{ marginBottom: "15px" }}>
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
                  <Button onClick={this.handleMonitorUpdateForm}>Update</Button>
                  <Button
                    onClick={this.handleTeleWorkForm}
                    disabled={!this.props.data.checkedOut}
                  >
                    Telework
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
                  <ComputerCheckOutForm
                    id={this.props.data._id}
                    val={this.props.val}
                    toggleForm={this.closeToggleForm}
                  />
                ) : null}
                {this.state.toggleTagForm ? (
                  <TagForm
                    toggleForm={this.handleTagForm}
                    reRender={this.props.reRender}
                    scrollToTop={this.scrollToTop}
                    tags={this.props.data.tags}
                    val="monitors"
                    id={this.props.data._id}
                  />
                ) : null}
                {this.state.showDeleteModal ? (
                  <DeleteComputerForm
                    {...this.props}
                    id={this.props.data._id}
                    handleDeleteModal={this.handleDeleteModal}
                    val={this.props.val}
                  />
                ) : null}
                {this.state.toggleCheckIn ? (
                  <CheckInForm
                    toggleModal={this.handleCheckInModal}
                    serial={this.props.data.monitorSerial}
                    user={this.props.data.userName}
                    id={this.props.data._id}
                    val={this.props.val}
                  />
                ) : null}
                {this.state.toggleMonitorUpdateForm ? (
                  <MonitorUpdateForm
                    id={this.props.data._id}
                    checkedOut={this.props.data.checkedOut}
                    monitorSerial={this.props.data.monitorSerial}
                    monitorModel={this.props.data.monitorModel}
                    monitorMake={this.props.data.monitorMake}
                    userName={this.props.data.userName}
                    division={this.props.data.division}
                    manager={this.props.data.manager}
                    description={this.props.data.description}
                    location={this.props.data.location}
                    toggleModal={this.handleMonitorUpdateForm}
                  />
                ) : null}
                {this.state.toggleTeleWorkForm ? (
                  <TeleWorkInAndOut
                    id={this.props.data._id}
                    device="monitors"
                    teleWork={this.props.data.teleWork}
                    startDate={this.props.data.startDate}
                    endDate={this.props.data.endDate}
                    toggleTeleWorkForm={this.handleTeleWorkForm}
                  />
                ) : null}
              </Segment.Group>
            </Fragment>
          </div>
        ) : null}
        {/* =======================DockingStations==================== */}
        {this.props.val === "dockingstations" ? (
          <div style={{ marginTop: "40px" }}>
            <Fragment>
              {Object.keys(this.props.data).length > 0 ? (
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
                  <Segment
                    style={{
                      backgroundColor: this.props.data.teleWork
                        ? "#EBDDC0"
                        : null,
                    }}
                  >
                    <Item.Header>Tele-Work:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWork ? "True" : "False"}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item.Header>Tele-Work Start Date:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWorkStartDate == null
                        ? ""
                        : moment(this.props.data.teleWorkStartDate).format(
                            "MM-DD-YYYY"
                          )}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item.Header>Tele-Work End Date:</Item.Header>
                    <Item.Description>
                      {this.props.data.teleWorkEndDate == null
                        ? ""
                        : moment(this.props.data.teleWorkEndDate).format(
                            "MM-DD-YYYY"
                          )}
                    </Item.Description>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Dockingstation Serial:</Item.Header>
                      <Item.Description>
                        {this.props.data.dockingStationSerial}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Dockingstation Make:</Item.Header>
                      <Item.Description>
                        {this.props.data.dockingStationMake}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Dockingstation Model</Item.Header>
                      <Item.Description>
                        {this.props.data.dockingStationModel}
                      </Item.Description>
                    </Item>
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
                      <Item.Header>Peripherals:</Item.Header>
                      <Item.Description>
                        {this.props.data.periphs.length > 0
                          ? this.props.data.periphs.map((item) => (
                              <Item.Description key={item}>
                                {item}
                              </Item.Description>
                            ))
                          : "Empty"}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Description:</Item.Header>
                      <Item.Description>
                        {this.props.data.description}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Location</Item.Header>
                      <Item.Description>
                        {this.props.data.location}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Checked Out User:</Item.Header>
                      <Item.Description>
                        {this.props.data.userName}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Department:</Item.Header>
                      <Item.Description>
                        {this.props.data.division}
                      </Item.Description>
                    </Item>
                  </Segment>
                  <Segment>
                    <Item>
                      <Item.Header>Manager:</Item.Header>
                      <Item.Description>
                        {this.props.data.manager}
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
                      <Item.Header>Previous User:</Item.Header>
                      <Item.Description>
                        {this.props.data.prevUser}
                      </Item.Description>
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
                      <Item.Header>Date Inventoried:</Item.Header>
                      <Item.Description>
                        {moment(this.props.data.createdAt).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Item.Description>
                    </Item>
                  </Segment>
                </Segment.Group>
              ) : (
                <Loader />
              )}
              <Segment.Group style={{ marginBottom: "15px" }}>
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
                  <Button onClick={this.handleDockUpdateForm}>Update</Button>
                  <Button
                    onClick={this.handleTeleWorkForm}
                    disabled={!this.props.data.checkedOut}
                  >
                    Telework
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
                  <ComputerCheckOutForm
                    id={this.props.data._id}
                    val={this.props.val}
                    toggleForm={this.closeToggleForm}
                  />
                ) : null}
                {this.state.toggleTagForm ? (
                  <TagForm
                    toggleForm={this.handleTagForm}
                    reRender={this.props.reRender}
                    scrollToTop={this.scrollToTop}
                    tags={this.props.data.tags}
                    val="dockingstations"
                    id={this.props.data._id}
                  />
                ) : null}
                {this.state.showDeleteModal ? (
                  <DeleteComputerForm
                    {...this.props}
                    id={this.props.data._id}
                    handleDeleteModal={this.handleDeleteModal}
                    val={this.props.val}
                  />
                ) : null}
                {this.state.toggleCheckIn ? (
                  <CheckInForm
                    toggleModal={this.handleCheckInModal}
                    serial={this.props.data.dockingStationSerial}
                    user={this.props.data.userName}
                    id={this.props.data._id}
                    val={this.props.val}
                  />
                ) : null}
                {this.state.toggleDockUpdateForm ? (
                  <DockUpdateForm
                    id={this.props.data._id}
                    checkedOut={this.props.data.checkedOut}
                    dockingStationSerial={this.props.data.dockingStationSerial}
                    dockingStationModel={this.props.data.dockingStationModel}
                    dockingStationMake={this.props.data.dockingStationMake}
                    userName={this.props.data.userName}
                    division={this.props.data.division}
                    manager={this.props.data.manager}
                    description={this.props.data.description}
                    location={this.props.data.location}
                    toggleModal={this.handleDockUpdateForm}
                  />
                ) : null}
                {this.state.toggleTeleWorkForm ? (
                  <TeleWorkInAndOut
                    id={this.props.data._id}
                    device="dockingstations"
                    teleWork={this.props.data.teleWork}
                    startDate={this.props.data.startDate}
                    endDate={this.props.data.endDate}
                    toggleTeleWorkForm={this.handleTeleWorkForm}
                  />
                ) : null}
              </Segment.Group>
            </Fragment>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default ItemInfo;

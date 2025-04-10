import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../config";
import { Search, Grid, Segment, Loader } from "semantic-ui-react";

import ListComputers from "./ListDevices/listComputers";
import ListMonitors from "./ListDevices/listMonitors";
import ListPhones from "./ListDevices/listPhone";
import ListDocks from "./ListDevices/listDock";
import ListDeskPhones from "./ListDevices/listDeskPhone";
import ListAccessories from "./ListDevices/listAccessories";
import ListBorrowedDevices from "./ListDevices/listBorrowed";

class search extends Component {
  state = {
    computers: [],
    monitors: [],
    phones: [],
    docks: [],
    deskPhone: [],
    borrowed: [],
    accessories: [],
    search: "",
    loading: true,
  };

  async componentDidMount() {
    let data = await axios.get(`${config.apiUrl}/api/v1/search/`);

    // console.log("SEARCH DATA:", data.data.data);

    this.setState({
      computers: data.data.data.machines,
      monitors: data.data.data.screens,
      phones: data.data.data.cell,
      docks: data.data.data.docks,
      deskPhone: data.data.data.deskphones,
      borrowed: data.data.data.borrowed,
      accessories: data.data.data.accessory,
      loading: false,
    });
  }

  ComputersDynamicSearch = () => {
    return this.state.computers.filter((item) =>
      item.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };
  MonitorsDynamicSearch = () => {
    return this.state.monitors.filter((item) =>
      item.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };
  PhonesDynamicSearch = () => {
    return this.state.phones.filter((item) =>
      item.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };
  DocksDynamicSearch = () => {
    return this.state.docks.filter((item) =>
      item.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };
  DeskPhonesDynamicSearch = () => {
    return this.state.deskPhone.filter((item) =>
      item.user.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };
  AccessoryDynamicSearch = () => {
    return this.state.accessories.filter((item) =>
      item.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };
  LoanerDynamicSearch = () => {
    return this.state.borrowed.filter((item) =>
      item.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };

  onSearchHandler = (event) => {
    // console.log(event.target.value)
    this.setState({
      search: event.target.value,
    });
    this.ComputersDynamicSearch();
  };

  render() {
    const Styles = {
      topHeader: {
        marginTop: "45px",
      },
      gridContainer: {
        marginTop: "15px",
      },
    };
    return (
      <Fragment>
        {this.state.loading ? (
          <Segment loading style={{ height: "150px" }}>
            <Loader />
          </Segment>
        ) : (
          <Fragment>
            <div style={Styles.topHeader}></div>
            <h2>Search by User</h2>
            <div>
              <Search
                // value={this.state.search}
                onSearchChange={this.onSearchHandler}
                placeholderText="Serial"
                size={"large"}
                showNoResults={false}
              />
            </div>
            <Grid columns={7} style={Styles.gridContainer}>
              <ListComputers items={this.ComputersDynamicSearch()} />

              <ListMonitors items={this.MonitorsDynamicSearch()} />

              <ListPhones items={this.PhonesDynamicSearch()} />

              <ListDocks items={this.DocksDynamicSearch()} />

              <ListDeskPhones items={this.DeskPhonesDynamicSearch()} />

              <ListAccessories items={this.AccessoryDynamicSearch()} />

              <ListBorrowedDevices items={this.LoanerDynamicSearch()} />
            </Grid>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default search;

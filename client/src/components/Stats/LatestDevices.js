import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../config";

import RecentInventoryCard from "./RecentInventoriedCard";

class LatestDevices extends Component {
  state = {
    computer: {},
    phone: {},
    monitor: {},
    dock: {},
  };

  // API Call to get devices
  async componentDidMount() {
    const response = await axios.get(`${config.apiUrl}/api/v1/devices/recent`);
    // console.log(response.data);
    this.setState({
      computer: { ...response.data.computer[0] },
      phone: { ...response.data.phone[0] },
      monitor: { ...response.data.monitor[0] },
      dock: { ...response.data.dock[0] },
    });
  }

  render() {
    return (
      <Fragment>
        <RecentInventoryCard
          link={`/computers/${this.state.computer._id}`}
          make={this.state.computer.computerMake}
          model={this.state.computer.computerModel}
          serial={this.state.computer.computerSerial}
          date={this.state.computer.createdAt}
        />
        <RecentInventoryCard
          link={`/phones/${this.state.phone._id}`}
          make={this.state.phone.phoneMake}
          model={this.state.phone.phoneModel}
          serial={this.state.phone.phoneIMEI}
          date={this.state.phone.createdAt}
        />
        <RecentInventoryCard
          link={`/monitors/${this.state.monitor._id}`}
          make={this.state.monitor.monitorMake}
          model={this.state.monitor.monitorModel}
          serial={this.state.monitor.monitorSerial}
          date={this.state.monitor.createdAt}
        />
        <RecentInventoryCard
          link={`/dockingstation/${this.state.dock._id}`}
          make={this.state.dock.dockingStationMake}
          model={this.state.dock.dockingStationModel}
          serial={this.state.dock.dockingStationSerial}
          date={this.state.dock.createdAt}
        />
      </Fragment>
    );
  }
}

export default LatestDevices;

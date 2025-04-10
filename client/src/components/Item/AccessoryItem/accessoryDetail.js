import React, { Component } from "react";
import axios from "axios";
import config from "../../../config";

import AccessoryItem from "./accessoryItem";

class accessoryDetail extends Component {
  state = {
    data: {},
    loading: true,
  };

  async componentDidMount() {
    // Make request to backend
    const data = await axios.get(
      `${config.apiUrl}/api/v1/accessory/${this.props.match.params.id}`
    );
    // console.log("Accessory DATA: ", data.data);

    this.setState({
      data: { ...data.data.data[0] },
      loading: false,
    });
    // console.log("STATE:",this.state)
  }

  reRender = (item) => {
    this.setState({
      data: { ...item },
    });
  };

  render() {
    // console.log("ITEM PROPS", this.props)
    // console.log("State", this.state.information)
    // console.log(this.props)
    return (
      <AccessoryItem
        {...this.props}
        loading={this.state.loading}
        data={this.state.data}
        val={this.props.val}
        reRender={this.reRender}
      ></AccessoryItem>
    );
  }
}

export default accessoryDetail;

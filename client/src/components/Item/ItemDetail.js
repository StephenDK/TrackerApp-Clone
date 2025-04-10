import React, { Component } from "react";
import config from "../../config";
import axios from "axios";

import Item from "./Item";

class ItemDetail extends Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    // Make request to backend
    const data = await axios.get(
      `${config.apiUrl}/api/v1/${this.props.val}/${this.props.match.params.id}`
    );
    console.log("DATA", data.data);
    this.setState({
      data: { ...data.data.data[0] },
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
      <Item
        {...this.props}
        data={this.state.data}
        val={this.props.val}
        reRender={this.reRender}
      ></Item>
    );
  }
}

export default ItemDetail;

import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../config";
import { Button, Radio } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

const Styles = {
  mainContainer: {
    width: "65%",
    height: "360px",
    margin: "auto",
  },
  contols: {
    padding: "10px",
    margin: "5px",
  },
  calendarControl: {
    padding: "10px",
    display: "inline-block",
  },
  submitBtn: {
    margin: "5px",
  },
};

class teleWorkInAndOut extends Component {
  state = {
    teleWork: this.props.teleWork,
    startDate: null,
    endDate: null,
  };

  onSubmitHandler = async () => {
    try {
      let token = await localStorage.getItem("token");
      let { teleWork, startDate, endDate } = this.state;
      let info = {
        token,
        teleWork,
        startDate,
        endDate,
      };

      console.log(this.state);

      const data = await axios.put(
        `${config.apiUrl}/api/v1/${this.props.device}/update/telework/${this.props.id}`,
        info
      );

      console.log(data);
      // this.props.toggleForm();
      this.props.toggleTeleWorkForm();
      window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  onTeleworkHandler = async (event, data) => {
    try {
      let token = await localStorage.getItem("token");

      if (this.props.teleWork && !data.checked) {
        console.log("Marked as telework, setting to not teleworking");
        let info = {
          token,
          teleWork: false,
          startDate: null,
          endDate: null,
        };

        const data = await axios.put(
          `https://gentle-headland-50783.herokuapp.com/api/v1/${this.props.device}/update/telework/${this.props.id}`,
          info
        );
        console.log("DATA: ", data);
        this.props.toggleTeleWorkForm();
        window.location.reload(false);
      } else {
        this.setState({
          teleWork: data.checked,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  onStartDateHandler = (event, data) => {
    this.setState({
      startDate: data.value,
    });
  };

  onEndDateHandler = (event, data) => {
    this.setState({
      endDate: data.value,
    });
  };

  render() {
    console.log("PROPS::TELEWORK:: ", this.props);
    return (
      <Fragment>
        <h2>Teleworking Device</h2>
        <div style={Styles.mainContainer}>
          <Radio
            style={Styles.contols}
            toggle
            label="Telework"
            name="Telework"
            checked={this.state.teleWork}
            onChange={this.onTeleworkHandler}
          />
          <div style={Styles.calendarControl}>
            <SemanticDatepicker onChange={this.onStartDateHandler} />
          </div>
          <div style={Styles.calendarControl}>
            <SemanticDatepicker onChange={this.onEndDateHandler} />
          </div>
          <Button style={Styles.submitBtn} onClick={this.onSubmitHandler}>
            Submit
          </Button>
        </div>
        <div ref={this.endScrollViewRef}></div>
      </Fragment>
    );
  }
}

export default teleWorkInAndOut;

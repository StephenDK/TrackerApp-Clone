import React, { Component } from "react";
import { Message, Grid, Button } from "semantic-ui-react";

const Styles = {
  delete_Btn: {
    position: "absolute",
    top: "0px",
    right: "0px",
    margin: "5px 5px 5px 5px"
  }
};

class DeskPhoneLineView extends Component {
  render() {
    console.log("{RPO{S", this.props);
    return (
      <Grid columns={4} container stackable style={{ marginTop: "10px" }}>
        {this.props.phoneLines.length >= 1 ? (
          <Grid.Row>
            {this.props.phoneLines.map((item, index) => (
              <Grid.Column key={index}>
                <Message>
                  <Message.Header>Line Name:</Message.Header>
                  <Message.Content>{item.lineName}</Message.Content>
                  <Message.Header style={{ marginTop: "10px" }}>
                    Line Number:
                  </Message.Header>
                  <Message.Content>{item.lineNumber}</Message.Content>
                  <div style={{ margin: "15px 5px 0px 0px" }}>
                    <Button
                      circular
                      onClick={() =>
                        this.props.deletePhoneLine(item.lineNumber)
                      }
                      style={Styles.delete_Btn}
                      color="red"
                      icon="close"
                    />
                  </div>
                </Message>
              </Grid.Column>
            ))}
          </Grid.Row>
        ) : (
          <p>No Lines</p>
        )}
      </Grid>
    );
  }
}

export default DeskPhoneLineView;

import React from "react";
import { Card } from "semantic-ui-react";
import moment from "moment";

const Styles = {
  cardDescription: {
    wordWrap: "break-word"
  }
};

const Result = (props) => {
  // console.log("RESULT: ", props);
  return (
    <Card href={props.id} link={true} target="_blank">
      <Card.Content>
        <Card.Header>
          {props.make}: {props.model}
        </Card.Header>
        <Card.Meta style={Styles.cardDescription}>
          Serial: {props.serial}
        </Card.Meta>
        <Card.Description>User: {props.user}</Card.Description>
        <Card.Description>
          CheckedOut: {moment(props.lastUpdated).format("MM-DD-YYYY")}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Result;

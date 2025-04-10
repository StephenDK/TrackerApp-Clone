import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";

import ResultView from "../resultView";

const ListComputers = (props) => {
  // console.log("COMPUTER PROPS", props.items.length);
  return (
    <Fragment>
      {props.items.length > 0 ? (
        <Fragment>
          <h2>Computers</h2>
          <Grid.Row>
            {props.items.map((item, index) => (
              <Grid.Column key={index}>
                <ResultView
                  id={`/computers/${item._id}`}
                  serial={item.computerSerial}
                  make={item.computerMake}
                  model={item.computerModel}
                  checkedOutDate={item.checkedOutDate}
                  user={item.userName}
                  // createdAt={ite}
                  // id={item._id}
                />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default ListComputers;

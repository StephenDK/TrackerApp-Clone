import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";

import ResultView from "../resultView";

const ListBorrowed = (props) => {
  // console.log("PROPS", props);
  return (
    <Fragment>
      {props.items.length > 0 ? (
        <Fragment>
          <h2>ITAM Loaner Devices</h2>
          <Grid.Row>
            {props.items.map((item, index) => (
              <Grid.Column key={index}>
                <ResultView
                  id={`/borrowed/device/${item._id}`}
                  serial={item.serial}
                  make={item.make}
                  model={item.model}
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

export default ListBorrowed;

import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";

import ResultView from "../resultView";

const ListAccessories = (props) => {
  // console.log("PROPS", props);
  return (
    <Fragment>
      {props.items.length > 0 ? (
        <Fragment>
          <h2>Accessories</h2>
          <Grid.Row>
            {props.items.map((item, index) => (
              <Grid.Column key={index}>
                <ResultView
                  id={`/accessories/${item._id}`}
                  serial={item.barcode}
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

export default ListAccessories;

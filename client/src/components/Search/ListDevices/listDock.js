import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";

import ResultView from "../resultView";

const ListMonitors = (props) => {
  // console.log("PROPS", props);
  return (
    <Fragment>
      {props.items.length > 0 ? (
        <Fragment>
          <h2>Dockingstations</h2>
          <Grid.Row>
            {props.items.map((item, index) => (
              <Grid.Column key={index}>
                <ResultView
                  id={`/dockingstation/${item._id}`}
                  serial={item.dockingStationSerial}
                  make={item.dockingStationMake}
                  model={item.dockingStationModel}
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

export default ListMonitors;

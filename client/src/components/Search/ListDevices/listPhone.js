import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";

import ResultView from "../resultView";

const ListPhones = (props) => {
  // console.log("PROPS", props);
  return (
    <Fragment>
      {props.items.length > 0 ? (
        <Fragment>
          <h2>Cell Phones</h2>
          <Grid.Row>
            {props.items.map((item, index) => (
              <Grid.Column key={index}>
                <ResultView
                  id={`/phones/${item._id}`}
                  serial={item.phoneIMEI}
                  make={item.phoneMake}
                  model={item.phoneModel}
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

export default ListPhones;

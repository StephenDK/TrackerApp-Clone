import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";

import ResultView from "../resultView";

const ListDeskPhone = (props) => {
  // console.log("PROPS", props);
  return (
    <Fragment>
      {props.items.length > 0 ? (
        <Fragment>
          <h2>DeskPhones</h2>
          <Grid.Row>
            {props.items.map((item, index) => (
              <Grid.Column key={index}>
                <ResultView
                  id={`/desk/phone/inventory/${item._id}`}
                  serial={item.phoneMAC}
                  make={item.phoneMake}
                  model={item.phoneModel}
                  checkedOutDate={item.checkedOutDate}
                  user={item.user}
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

export default ListDeskPhone;

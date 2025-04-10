import React from "react";
import { Statistic } from "semantic-ui-react";

const Stats = (props) => {
  let inv =
    props.computerCount + props.monitorCount + props.phoneCount + props.dock;
  return (
    // <div>
    //   <p>Inventory Total: {inv}</p>
    //   <p>Computers: {props.computerCount}</p>
    //   <p>Phones: {props.phoneCount}</p>
    //   <p>Monitors {props.monitorCount}</p>
    //   <p>Telework Count: {props.teleWork}</p>
    // </div>
    <Statistic.Group horizontal>
      <Statistic>
        <Statistic.Value>{inv}</Statistic.Value>
        <Statistic.Label>Total Devices</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.computerCount}</Statistic.Value>
        <Statistic.Label>Computers</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.phoneCount}</Statistic.Value>
        <Statistic.Label>Phones</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.monitorCount}</Statistic.Value>
        <Statistic.Label>Monitors</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.dock}</Statistic.Value>
        <Statistic.Label>Dockingstations</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.accessory}</Statistic.Value>
        <Statistic.Label>Accessories</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.teleWork}</Statistic.Value>
        <Statistic.Label>Telework Count</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
};

export default Stats;


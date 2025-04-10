import React from "react";
import { Container, Grid, Card } from "semantic-ui-react";

const Tools = () => {
  return (
    <div style={{ marginTop: "60px" }}>
      <Container>
        <Grid
          columns={2}
          style={{ marginTop: "10px" }}
          relaxed="very"
          stackable={true}
        >
          <Grid.Column>
            <Card
              href="/admin/users"
              header="Tracker Users"
              description="View all tracker users"
            />
          </Grid.Column>
          <Grid.Column>
            <Card
              href="https://gentle-headland-50783.herokuapp.com/api/v1/admin" // come back here for this
              header="Generate Report"
              description="Generate a report in excel"
            />
          </Grid.Column>
          <Grid.Column>
            <Card
              href="/admin/delete"
              header="Large Delete from Inventory"
              description="Delete multiple items from the inventory"
            />
          </Grid.Column>
          <Grid.Column>
            <Card
              href="/admin/update/location"
              header="Update Location"
              description="Update the location of a workstation"
            />
          </Grid.Column>
          <Grid.Column>
            <Card
              href="/admin/bulkedittags"
              header="Bulk Edit Tags"
              description="Upload spreadsheet with single column of device serials"
            />
          </Grid.Column>
          {/* <Grid.Column>
        <Card 
          href='/addmonitor'
          header='Add a new Monitor'
          description='Add a new monitor to the inventory'
        />
        </Grid.Column> */}
        </Grid>
      </Container>
    </div>
  );
};

export default Tools;

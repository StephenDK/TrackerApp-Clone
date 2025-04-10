import React, { Fragment } from "react";
import { connect } from "react-redux";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SettingsIcon from "@mui/icons-material/Settings";
import LabelIcon from "@mui/icons-material/Label";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import QrCodeIcon from "@mui/icons-material/QrCode";

function BasicMenu(props) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Stack
        sx={{ mb: 2 }}
        direction={{ xs: "column", sm: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
      >
        {props.archived ? null : (
          <Fragment>
            {props.checkedOut ? (
              <Button
                onClick={props.toggleCheckin}
                variant="contained"
                startIcon={<KeyboardReturnIcon />}
              >
                Check In
              </Button>
            ) : (
              <Button
                onClick={props.toggleCheckout}
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
              >
                Check Out
              </Button>
            )}

            <Button
              variant="contained"
              startIcon={<SettingsIcon />}
              onClick={props.toggleEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<LabelIcon />}
              onClick={props.toggleTags}
            >
              Tags
            </Button>
            {props.api === "deskphones" ? null : (
              <Button
                variant="contained"
                startIcon={<QrCodeIcon />}
                onClick={props.toggleQRCode}
              >
                QR Code
              </Button>
            )}
            {props.api === "deskphones" ? (
              <Button
                variant="contained"
                startIcon={<ContactPhoneIcon />}
                onClick={props.toggleLines}
              >
                Lines
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={props.toggleTelework}
                disabled={props.checkedOut ? false : true}
              >
                Telework
              </Button>
            )}
          </Fragment>
        )}

        <Button
          variant="contained"
          startIcon={props.archived ? <UnarchiveIcon /> : <ArchiveIcon />}
          onClick={props.toggleArchive}
          disabled={props.checkedOut ? true : false}
        >
          {props.archived ? "Un-Archive" : " Archive"}
        </Button>

        {true ? ( // props.user.role === "administrator"
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={props.toggleDelete}
          >
            Delete
          </Button>
        ) : null}
      </Stack>
    </div>
  );
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, null)(BasicMenu);

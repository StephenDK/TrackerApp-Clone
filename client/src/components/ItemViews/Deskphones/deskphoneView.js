// Component: Individual Monitor Parent View
// Status: WIP
// Template Styles: WIP
// Date:
// Author: StephenDK
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import config from "../../../config";
import axios from "axios";

import { setError } from "../../../actions/errorActions";
// import { styled, useTheme } from "@mui/material/styles";
// import { setSuccess } from "../../../actions/successActions";
import { showLoading, hideLoading } from "../../../actions/loadingActions";
import {
  GetDivisionFile,
  GetElectionsFile,
} from "../../../actions/filesActions";
import {
  ToggleCheckIn,
  ToggleCheckOut,
  ToggleEdit,
  ToggleDelete,
  ToggleTags,
  ToggleLines,
  ToggleArchive,
} from "../../../actions/navActions";
import DeviceHistory from "../Templates/deviceHistory";
import BusinessHistory from "../Templates/businessHistory";
import DescriptionInfo from "../Templates/descriptionInfo";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import ViewPort from "../../utils/viewPort";
import LoadingForm from "../../loading/loadingComputerForm";
import DialogBox from "../../utils/dialogBox";

import MenuButton from "../../utils/menuButton";

// import TestForm from "../../utils/testForm";
import CheckOutForm from "../../Forms/checkOutForm";
import CheckInForm from "../../Forms/checkInForm";
import EditForm from "../../Forms/editForm";
import TagsForm from "../../Forms/tagsForm";
import LinesForm from "../../Forms/linesForm";
import DeleteForm from "../../Forms/deleteForm";
import ArchiveForm from "../../Forms/archiveForm";

function DeskPhoneView({ files, loading, nav }) {
  // State
  const { id } = useParams();
  // const theme = useTheme();
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const componentMapping = {
    Icon: { component: <LocalPhoneIcon sx={{ fontSize: 40 }} /> },
  };

  const Keys = {
    serial: "MAC Address:",
    name: "Phone #:",
    ext: "Extension:",
    make: "Make:",
    model: "Model",
  };

  const Values = {
    serial: "phoneMAC",
    name: "phoneNumber",
    make: "phoneMake",
    model: "phoneModel",
    ext: "extension",
  };

  useEffect(() => {
    let initializePage = async () => {
      try {
        dispatch(showLoading());
        // Make API calls for component
        if (
          !files.jsonFiles.divisions ||
          files.jsonFiles.divisions.length === 0
        ) {
          await dispatch(GetDivisionFile());
        }
        if (
          !files.jsonFiles.elections ||
          files.jsonFiles.elections.length === 0
        ) {
          await dispatch(GetElectionsFile());
        }

        let request = await axios.get(
          `${config.apiUrl}/api/v1/deskphones/${id}`
        );
        console.log("REQUEST:", request);
        setData(request.data.data);
        dispatch(hideLoading());
      } catch (err) {
        dispatch(setError(err.response.data.error));
      }
    };

    initializePage();
  }, []);

  if (loading.isLoading) {
    return <LoadingForm />;
  }

  return (
    <Fragment>
      <ViewPort>
        <div>
          <MenuButton
            checkedOut={data.checkedOut}
            api={"deskphones"}
            archived={data.archive}
            toggleCheckout={() => dispatch(ToggleCheckOut())}
            toggleCheckin={() => dispatch(ToggleCheckIn())}
            toggleEdit={() => dispatch(ToggleEdit())}
            toggleTags={() => dispatch(ToggleTags())}
            toggleLines={() => dispatch(ToggleLines())}
            toggleArchive={() => dispatch(ToggleArchive())}
            toggleDelete={() => dispatch(ToggleDelete())}
          />

          <DeviceHistory
            deviceHeading="Desk Phone"
            api={"deskphones"}
            data={data}
            keys={Keys}
            values={Values}
            icon={componentMapping}
          />

          <BusinessHistory data={data} />
          <DescriptionInfo API={"deskphones"} data={data} />
        </div>
      </ViewPort>
      <DialogBox toggleDialog={nav.itemViews.toggleCheckOut}>
        <CheckOutForm
          textHeading={"Check Out Desk Phone"}
          icon={componentMapping}
          updateUI={setData}
          API={"deskphones"}
          ID={data._id}
          divisions={files.jsonFiles.divisions}
          elections={files.jsonFiles.elections}
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleCheckIn}>
        <CheckInForm
          updateUI={setData}
          API={"deskphones"}
          ID={data._id}
          textHeading={"Check In Desk Phone"}
          icon={componentMapping}
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleEdit}>
        <EditForm
          updateUI={setData}
          API={"deskphones"}
          ID={data._id}
          textHeading={"Edit Desk Phone"}
          icon={componentMapping}
          checkedOut={data.checkedOut}
          data={data}
          divisions={files.jsonFiles.divisions}
          elections={files.jsonFiles.elections}
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleTags}>
        <TagsForm
          updateUI={setData}
          API={"deskphones"}
          ID={data._id}
          data={data.tags}
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleLines}>
        <LinesForm
          updateUI={setData}
          API={"deskphones"}
          ID={data._id}
          lines={data.lines}
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleArchive}>
        <ArchiveForm
          updateUI={setData}
          API={"deskphones"}
          ID={data._id}
          archiveState={data.archive}
          icon={componentMapping}
          device="Desk Phone"
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleDelete}>
        <DeleteForm API={"deskphones"} ID={data._id} />
      </DialogBox>
    </Fragment>
  );
}

function mapStateToProps({ files, loading, nav }) {
  return { files, loading, nav };
}

export default connect(mapStateToProps, {
  ToggleCheckIn,
  ToggleCheckOut,
  ToggleEdit,
  ToggleTags,
  ToggleLines,
  ToggleDelete,
  ToggleArchive,
  GetDivisionFile,
  GetElectionsFile,
  showLoading,
  hideLoading,
})(DeskPhoneView);

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
// import { styled, useTheme } from "@mui/material/styles";

import { setError } from "../../../actions/errorActions";
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
  ToggleArchive,
  ToggleQRCode,
  ToggleTelework,
} from "../../../actions/navActions";
import DeviceHistory from "../Templates/deviceHistory";
import BusinessHistory from "../Templates/businessHistory";
import DescriptionInfo from "../Templates/descriptionInfo";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import ViewPort from "../../utils/viewPort";
import LoadingForm from "../../loading/loadingComputerForm";
import DialogBox from "../../utils/dialogBox";

import MenuButton from "../../utils/menuButton";

// import TestForm from "../../utils/testForm";
import CheckOutForm from "../../Forms/checkOutForm";
import CheckInForm from "../../Forms/checkInForm";
import EditForm from "../../Forms/editForm";
import TagsForm from "../../Forms/tagsForm";
import TeleworkForm from "../../Forms/teleworkForm";
import DeleteForm from "../../Forms/deleteForm";
import ArchiveForm from "../../Forms/archiveForm";
import QRForm from "../../Forms/qrForm";

function PhoneView({ files, loading, nav }) {
  // State
  const { id } = useParams();
  // const theme = useTheme();
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const componentMapping = {
    Icon: { component: <PhoneIphoneIcon sx={{ fontSize: 40 }} /> },
  };

  const Keys = {
    serial: "Phone IMEI:",
    name: "Phone Number:",
    make: "Make:",
    model: "Model",
  };

  const Values = {
    serial: "phoneIMEI",
    name: "phoneNumber",
    make: "phoneMake",
    model: "phoneModel",
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

        let request = await axios.get(`${config.apiUrl}/api/v1/phones/${id}`);
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
            archived={data.archive}
            toggleCheckout={() => dispatch(ToggleCheckOut())}
            toggleCheckin={() => dispatch(ToggleCheckIn())}
            toggleEdit={() => dispatch(ToggleEdit())}
            toggleTags={() => dispatch(ToggleTags())}
            toggleTelework={() => dispatch(ToggleTelework())}
            toggleArchive={() => dispatch(ToggleArchive())}
            toggleQRCode={() => dispatch(ToggleQRCode())}
            toggleDelete={() => dispatch(ToggleDelete())}
          />

          <DeviceHistory
            deviceHeading="Phone"
            data={data}
            keys={Keys}
            values={Values}
            icon={componentMapping}
          />

          <BusinessHistory data={data} />
          <DescriptionInfo data={data} />
        </div>
      </ViewPort>
      <DialogBox toggleDialog={nav.itemViews.toggleCheckOut}>
        <CheckOutForm
          updateUI={setData}
          API={"phones"}
          textHeading={"Check Out Phone"}
          icon={componentMapping}
          ID={data._id}
          divisions={files.jsonFiles.divisions}
          elections={files.jsonFiles.elections}
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleCheckIn}>
        <CheckInForm
          updateUI={setData}
          API={"phones"}
          ID={data._id}
          textHeading={"Check In Phone"}
          icon={componentMapping}
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleEdit}>
        <EditForm
          updateUI={setData}
          API={"phones"}
          ID={data._id}
          textHeading={"Edit Phone"}
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
          API={"phones"}
          ID={data._id}
          data={data.tags}
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleTelework}>
        <TeleworkForm
          updateUI={setData}
          API={"phones"}
          ID={data._id}
          teleWorkState={data.teleWork}
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleArchive}>
        <ArchiveForm
          updateUI={setData}
          API={"phones"}
          ID={data._id}
          archiveState={data.archive}
          icon={componentMapping}
          device="Phone"
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleQRCode}>
        <QRForm
          // updateUI={setData}
          API={"phones"}
          ID={data._id}
          // archiveState={data.archive}
          SERIAL={data.phoneIMEI}
          // icon={componentMapping}
          // device="Computer"
        />
      </DialogBox>
      <DialogBox toggleDialog={nav.itemViews.toggleDelete}>
        <DeleteForm API={"phones"} ID={data._id} />
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
  ToggleTelework,
  ToggleArchive,
  ToggleDelete,
  ToggleQRCode,
  GetDivisionFile,
  GetElectionsFile,
  showLoading,
  hideLoading,
})(PhoneView);

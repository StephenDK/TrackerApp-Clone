import React, { Fragment, useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../actions/loadingActions";
import { setError } from "../../actions/errorActions";
// import { useTheme } from "@mui/material/styles";
import {
  Container,
  Avatar,
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  DialogContent,
} from "@mui/material";
import LoadingForm from "../loading/loadingComputerForm";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DownloadIcon from "@mui/icons-material/Download";

function QRForm({ API, ID, loading, SERIAL }) {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    dispatch(showLoading());
    const initializePage = async () => {
      try {
        let request = await axios.get(
          `${config.apiUrl}/api/v1/${API}/qrcode/${SERIAL}`
        );
        setQrCodeUrl(request.data.data);
      } catch (err) {
        dispatch(setError(err.response.data.error));
      }
    };

    initializePage();
    dispatch(hideLoading());
  }, []);

  if (loading.isLoading) {
    return <LoadingForm />;
  }

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = qrCodeUrl;
    a.download = `${SERIAL}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Fragment>
      <DialogContent>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <QrCodeIcon />
          </Avatar>
          <Typography variant="h4">QR Code</Typography>

          <Grid container spacing={3} rowSpacing={3} sx={{ my: 1 }}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={2}>
                <Box
                  className="qr-code-container"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    padding: "10px",
                    height: "140px",
                    overflow: "auto",
                    width: "100%",
                  }}
                >
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    style={{
                      height: "120px",
                      width: "120px",
                    }}
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                className="print-button"
                color="primary"
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                sx={{ mt: 1, mb: 1 }}
              >
                Download
              </Button>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Fragment>
  );
}

function mapStateToProps({ loading }) {
  return { loading };
}

export default connect(mapStateToProps, {
  showLoading,
  hideLoading,
})(QRForm);

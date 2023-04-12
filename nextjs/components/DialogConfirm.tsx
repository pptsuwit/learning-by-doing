import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
const styles = {
  btnRound: { borderRadius: 25, width: 140, fontSize: "18px" },
  btnRoundDisabled: {
    borderRadius: 25,
    width: 140,
    fontSize: "18px",
    bgcolor: grey[500],
    marginRight: 2,
  },
  fontContent: {
    fontSize: 26,
    color: "black",
    textAlign: "center",
  },
  titleContent: { justifyContent: "center", paddingBottom: 0 },
  dialogContent: { minWidth: 400, maxWidth: 800 },
  fontIcon: {
    fontSize: 80,
  },
  icon: {
    width: "60px",
    height: "60px",
  },
};
export default function DialogConfirm({ props }: any) {
  let iconStatus: any;
  switch (props.modalStatus) {
    case "success":
      iconStatus = <img src={"/assets/icon/ic_check.png"} alt="logo" style={styles.icon}></img>;
      break;
    case "error":
      iconStatus = <img src={"/assets/icon/ic_close.png"} alt="logo" style={styles.icon}></img>;
      break;
    case "warning":
      iconStatus = <img src={"/assets/icon/in_fo.png"} alt="logo" style={styles.icon}></img>;
      break;
    default:
      break;
  }
  const handleClose = () => {
    props.handleModal(false);
  };
  const handleConfirm = () => {
    props.handleModal(true);
  };

  return (
    <>
      <Dialog
        open={props.modalOpen}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 25 },
        }}
      >
        <Grid container justifyContent="center" mt={2}>
          <DialogTitle sx={styles.titleContent}>{iconStatus}</DialogTitle>
        </Grid>
        <DialogContent style={styles.dialogContent}>
          <DialogContentText sx={styles.fontContent}>{props.modalMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="center" mb={4}>
            <Button
              sx={styles.btnRoundDisabled}
              variant="contained"
              // color="disabled"
              onClick={handleClose}
              style={{ backgroundColor: grey[500] }}
            >
              {props.btnText || "ยกเลิก"}
            </Button>
            <Button
              style={{ backgroundColor: "#0A52A4" }}
              sx={styles.btnRound}
              variant="contained"
              className="btn-grad"
              color="primary"
              onClick={handleConfirm}
            >
              {props.btnText || "ตกลง"}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

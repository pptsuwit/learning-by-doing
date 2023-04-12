import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

import { Grid } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
const styles = {
  btnConfirm: {
    borderRadius: 25,
    width: "120px",
    fontSize: "18px",
    boxShadow: 3,
  },
  fontContent: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  titleContent: { justifyContent: "center", paddingBottom: 0 },
  dialogContent: { minWidth: 400, marginTop: "80px" },
  fontIcon: {
    fontSize: 80,
  },
  icon: {
    width: "120px",
    height: "120px",
  },
};
export default function FormDialog({ props }: any) {
  const { t } = useTranslation();
  const router = useRouter();
  let iconStatus: any;
  switch (props.modalStatus) {
    case "success":
      iconStatus = <img src={"/assets/icon/ic_check.png"} alt="logo" style={styles.icon}></img>;
      break;
    case "error":
      iconStatus = <img src={"/assets/icon/ic_close.png"} alt="logo" style={styles.icon}></img>;
      break;
    default:
      break;
  }
  const handleClose = () => {
    props.handleModal(false);
    if (props.navigateTo) {
      router.push(props.navigateTo);
    }
  };

  return (
    <>
      <Dialog
        open={props.modalOpen || false}
        onClose={handleClose}
        classes={{
          paper: "dialog-paper",
        }}
        PaperProps={{
          style: { borderRadius: 25 },
        }}
      >
        <Grid container justifyContent="center" mt={2} className="dialog-logo-outside">
          <DialogTitle
            sx={styles.titleContent}
            style={{
              transform: "translate(0%,-50%)",
            }}
          >
            {iconStatus}
          </DialogTitle>
        </Grid>
        <DialogContent style={styles.dialogContent}>
          <DialogContentText sx={styles.fontContent} className="font-bold text-3xl mb-3">
            {props.modalStatus === "success" ? t("common:thankyou") : t("common:wrong")}
          </DialogContentText>
          <DialogContentText sx={styles.fontContent} className="font-bold text-xl px-5">
            {props.modalStatus === "success" ? t("common:sendSuccess") : t("common:retry")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container mb={4}>
            <Grid item xs={12} container justifyContent="center">
              <Button style={{ backgroundColor: "#0090E5" }} sx={styles.btnConfirm} variant="contained" onClick={handleClose}>
                {t("common:ok")}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

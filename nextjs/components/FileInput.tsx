import { FC, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button, Grid, IconButton, InputAdornment } from "@mui/material";
import ModalConfirm from "components/DialogConfirm";
import useTranslation from "next-translate/useTranslation";
import FormHelperText from "@mui/material/FormHelperText";
export interface IModal {
  open: boolean;
  status?: string;
  message?: string;
  navigateTo?: string;
}
const FormInput: FC<any> = (props: any) => {
  const { t } = useTranslation();
  const [modalConfirm, setModalConfirm] = useState<IModal>({
    open: false,
    status: "",
    message: "",
  });
  const handleModalConfirm = (confirm: any) => {
    if (confirm === true) {
      deleteItem(props.fileIndex);
    }
    setModalConfirm({
      ...modalConfirm,
      open: false,
    });
  };
  const configModal = (deleteId: number) => {
    setModalConfirm({
      ...modalConfirm,
      open: true,
      message: "ยืนยันการลบข้อมูล",
      status: "warning",
    });
  };
  const ref = useRef<any>();

  const onInputChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      props.handleFile(file, props.fileIndex);
    } else {
      props.handleFile("", props.fileIndex);
    }
  };
  const deleteItem = (id: any) => {
    props.removeFile(id);
  };
  // useImperativeHandle(parentRefs, () => ({
  //   openFileUpload() {
  //     ref.current?.click();
  //   },
  // }));
  return (
    <>
      <ModalConfirm
        props={{
          modalOpen: modalConfirm.open,
          modalStatus: modalConfirm.status,
          modalMessage: modalConfirm.message,
          handleModal: handleModalConfirm,
        }}
      />
      <input ref={ref} id="import-button" onChange={onInputChange} hidden type="file" disabled={props.disabled} accept={props.accept} />

      <Grid container rowSpacing={3}>
        <Grid item xl={9} lg={9} md={12} sm={12} xs={12} pr={2}>
          <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%", height: "50px", borderRadius: 8, boxShadow: 3 }}>
            <TextField
              className="input-disable"
              value={props.fileName}
              disabled
              onClick={() => {
                ref.current?.click();
              }}
              sx={{
                pl: 2,
                flex: 1,
                borderRadius: 8,
              }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: { color: "red" },
              }}
            ></TextField>
            <IconButton onClick={() => configModal(props.fileIndex)}>
              <RemoveCircleIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
          <Button
            style={{ backgroundColor: "#0023E5" }}
            className="text-xl xs:w-[180px] sm:w-[200px] md:w-[200px] lg:w-[100%]"
            sx={{
              height: "100%",
              borderRadius: 8,
              textTransform: "none",
            }}
            variant="contained"
            onClick={() => {
              ref.current.click();
            }}
          >
            {t("common:browse")}
          </Button>
        </Grid>
      </Grid>
      {!props.fileName && props.onSubmitFlag ? <FormHelperText className="pl-4 text-red-700"> {` ${t("common:requireFile")}`}</FormHelperText> : <></>}
    </>
  );
};

export default FormInput;

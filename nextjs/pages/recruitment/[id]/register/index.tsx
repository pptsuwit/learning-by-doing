import HeaderView from "@/components/HeaderView";
import { Grid } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import FormHelperText from "@mui/material/FormHelperText";
import FileInput from "components/FileInput";
import AddIcon from "@mui/icons-material/Add";
import Modal from "components/Dialog";
import Loading from "components/Loading";
import { jobAppicationService } from "services/jobAppication.service";
import { jobPositionService } from "services/jobPosition.service";
export interface IModal {
  open: boolean;
  status?: string;
  message?: string;
  navigateTo?: string;
}
export default function RecruitmentRegisterForm() {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<any>([{ name: "", fileItem: undefined }]);
  const [onSubmitFlag, setOnSubmitFlag] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [reRender, setReRender] = useState("");
  const [modal, setModal] = useState<IModal>({
    open: false,
    status: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState();
  const get = async () => {
    const data = {
      id: id,
    };
    jobPositionService
      .getById(data)
      .then((item: any) => {
        const data = item.data;
        if (router.locale === "th") {
          setTitle(data.nameTh);
        } else {
          setTitle(data.nameEn);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender, router.locale]);
  const submitForm = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    setOnSubmitFlag(true);
    if (
      validatePhone(phone) === true &&
      validateEmail(email) === true &&
      validateFirstName(firstName) === true &&
      validateLastName(lastName) === true &&
      onSubmitFlag
    ) {
      const flag = file.find((w: any) => w.fileItem === undefined);
      if (flag) {
        setLoading(false);
        return;
      }
      const data = {
        jobPositionID: id,
        firstname: firstName,
        lastname: lastName,
        email: email,
        tel: phone,
        files: file,
      };
      jobAppicationService
        .create(data)
        .then(() => {
          setModal({
            open: true,
            status: "success",
            navigateTo: "/recruitment",
          });
        })
        .catch(() => {});
    }
    setLoading(false);
  };
  const handleFile = (item: any, index: any) => {
    if (item) {
      file[index].name = item.name;
      file[index].fileItem = item;
      setReRender(item);
    } else {
      file[index].name = "";
      file[index].fileItem = undefined;
      setReRender(item);
    }
  };
  const addFile = () => {
    const newFile = file.concat({ name: "", fileItem: undefined });
    setFile(newFile);
  };
  const removeFile = (index: any) => {
    const temp = file.splice(index, 1);
    if (file.length === 0) {
      setFile([{ name: "", fileItem: undefined }]);
    }
    setReRender(temp);
  };
  //manual validate
  const validatePhone = (phone: string) => {
    let pattern = /^\d+$/;
    if (!phone && onSubmitFlag) {
      return <FormHelperText className="pl-4 text-red-700"> {`${t("common:require")} ${t("common:phone")}`}</FormHelperText>;
    } else if (!pattern.test(phone) && onSubmitFlag) {
      return <FormHelperText className="pl-4 text-red-700"> {`${t("common:invalidPhone")}  `}</FormHelperText>;
    } else if (phone.length > 10 || (phone.length < 9 && onSubmitFlag)) {
      return <FormHelperText className="pl-4 text-red-700"> {`${t("common:invalidPhoneMin")}  `}</FormHelperText>;
    }
    return true;
  };
  const validateEmail = (email: string) => {
    var pattern = /\S+@\S+\.\S+/;
    if (!email && onSubmitFlag) {
      return <FormHelperText className="pl-4 text-red-700"> {`${t("common:require")} ${t("common:email")}`}</FormHelperText>;
    } else if (!pattern.test(email) && onSubmitFlag) {
      return <FormHelperText className="pl-4 text-red-700"> {`${t("common:invalidEmail")}  `}</FormHelperText>;
    }
    return true;
  };
  const validateFirstName = (text: string) => {
    var pattern = /^[A-Za-zก-๏]+$/;
    if (!firstName && onSubmitFlag) {
      return <FormHelperText className="pl-4 text-red-700"> {`${t("common:require")} ${t("common:firstname")}`}</FormHelperText>;
    } else if (!pattern.test(text) && onSubmitFlag) {
      return <FormHelperText className="pl-4 text-red-700"> {`${t("common:require")} ${t("common:firstname")} ${t("common:inThaiOrEng")}`}</FormHelperText>;
    }
    return true;
  };
  const validateLastName = (text: string) => {
    var pattern = /^[A-Za-zก-๏]+$/;
    if (!lastName && onSubmitFlag) {
      return <FormHelperText className="pl-4 text-red-700"> {`${t("common:require")} ${t("common:lastname")}`}</FormHelperText>;
    } else if (!pattern.test(text) && onSubmitFlag) {
      return <FormHelperText className="pl-4 text-red-700"> {`${t("common:require")} ${t("common:lastname")} ${t("common:inThaiOrEng")}`}</FormHelperText>;
    }
    return true;
  };
  return (
    <>
      <Loading loading={loading} />
      <Modal
        props={{
          modalOpen: modal.open,
          modalStatus: modal.status,
          modalMessage: modal.message,
          handleModal: setModal,
          navigateTo: modal.navigateTo,
        }}
      />
      <HeaderView name={t("common:register")} />
      <Grid container item xs={10} mx="auto" my={3} alignContent="flex-start" rowSpacing={5} mb={10}>
        <Grid item xs={12}>
          <div className="w-full h-full pb-10 rounded-br-[60px]" style={{ boxShadow: "1px 1px 5px 3px rgb(0 0 0 / 0.15)" }}>
            <div className="px-5 pt-6 text-[#0090E5] font-bold ">
              <div className="xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl">{title}</div>
            </div>
            <Box className="w-full foot-bg h-6 mt-6 shadow-gray-400 shadow-md"></Box>
            <Grid container mt={5}>
              <Grid item xl={3} lg={3} md={12} sm={12} xs={12} className="text-2xl px-4 pt-6 font-bold xs:text-start lg:text-end">
                <div>
                  {t("common:firstname")} <span className="req">*</span>
                </div>
              </Grid>
              <Grid item xl={9} lg={9} md={12} sm={12} xs={12} className="text-2xl px-4 pt-4 font-bold">
                <Paper
                  component="form"
                  sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%", height: "50px", borderRadius: 8, boxShadow: 3 }}
                >
                  <InputBase sx={{ pl: 2, flex: 1, borderRadius: 8 }} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="" />
                </Paper>

                {validateFirstName(firstName)}
              </Grid>
            </Grid>
            <Grid container mt={4}>
              <Grid item xl={3} lg={3} md={12} sm={12} xs={12} className="text-2xl px-4 pt-6 font-bold xs:text-start lg:text-end">
                <div>
                  {t("common:lastname")} <span className="req">*</span>
                </div>
              </Grid>
              <Grid item xl={9} lg={9} md={12} sm={12} xs={12} className="text-2xl px-4 pt-4 font-bold">
                <Paper
                  component="form"
                  sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%", height: "50px", borderRadius: 8, boxShadow: 3 }}
                >
                  <InputBase sx={{ pl: 2, flex: 1, borderRadius: 8 }} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="" />
                </Paper>
                {validateLastName(lastName)}
              </Grid>
            </Grid>
            <Grid container mt={4}>
              <Grid item xl={3} lg={3} md={12} sm={12} xs={12} className="text-2xl px-4 pt-6 font-bold xs:text-start lg:text-end">
                <div>
                  {t("common:email")} <span className="req">*</span>
                </div>
              </Grid>
              <Grid item xl={9} lg={9} md={12} sm={12} xs={12} className="text-2xl px-4 pt-4 font-bold">
                <Paper
                  component="form"
                  sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%", height: "50px", borderRadius: 8, boxShadow: 3 }}
                >
                  <InputBase sx={{ pl: 2, flex: 1, borderRadius: 8 }} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" />
                </Paper>
                {validateEmail(email)}
              </Grid>
            </Grid>
            <Grid container mt={4}>
              <Grid item xl={3} lg={3} md={12} sm={12} xs={12} className="text-2xl px-4 pt-6 font-bold xs:text-start lg:text-end">
                <div>
                  {t("common:phone")} <span className="req">*</span>
                </div>
              </Grid>
              <Grid item xl={9} lg={9} md={12} sm={12} xs={12} className="text-2xl px-4 pt-4 font-bold">
                <Paper
                  component="form"
                  sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%", height: "50px", borderRadius: 8, boxShadow: 3 }}
                >
                  <InputBase sx={{ pl: 2, flex: 1, borderRadius: 8 }} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="" />
                </Paper>

                {validatePhone(phone)}
              </Grid>
            </Grid>
            <Grid container mt={4}>
              {file.length > 1 ? (
                file.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <Grid item xl={3} lg={3} md={12} sm={12} xs={12} className="text-2xl px-4 pt-6 font-bold xs:text-start lg:text-end">
                        {index === 0 ? (
                          <>
                            <div>
                              {t("common:attachFile")} <span className="req">*</span>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Grid item xl={9} lg={9} md={12} sm={12} xs={12} className="text-2xl px-4 pt-4 font-bold">
                        <FileInput
                          name="file"
                          handleFile={handleFile}
                          fileName={file[index].name}
                          fileIndex={index}
                          removeFile={removeFile}
                          onSubmitFlag={onSubmitFlag}
                        />
                      </Grid>
                    </React.Fragment>
                  );
                })
              ) : (
                <>
                  <Grid item xl={3} lg={3} md={12} sm={12} xs={12} className="text-2xl px-4 pt-6 font-bold xs:text-start lg:text-end">
                    <div>
                      {t("common:attachFile")} <span className="req">*</span>
                    </div>
                  </Grid>
                  <Grid item xl={9} lg={9} md={12} sm={12} xs={12} className="text-2xl px-4 pt-4 font-bold">
                    <FileInput name="file" handleFile={handleFile} fileName={file[0].name} fileIndex={0} removeFile={removeFile} onSubmitFlag={onSubmitFlag} />
                  </Grid>
                </>
              )}
            </Grid>
            <Grid container>
              <Grid item xl={3} lg={3} md={12} sm={12} xs={12} className="text-2xl px-4 pt-6 font-bold xs:text-start lg:text-end"></Grid>

              <Grid item xl={9} lg={9} md={12} sm={12} xs={12} className="text-2xl px-4 pt-4 font-bold">
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    className="bg-[#E5B000] text-md hover:bg-[#e5b000d8]"
                    onClick={addFile}
                    sx={{ borderRadius: 25, width: "160px", textTransform: "none", mt: 2 }}
                    startIcon={<AddIcon sx={{ fontSize: 5 }}></AddIcon>}
                  >
                    {t("common:attachFile")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container my={10}>
              <Grid item xs={12} className="text-center">
                <Button
                  variant="contained"
                  className="bg-amber-400  xs:text-xl sm:text-xl md:text-2xl lg:text-2xl"
                  onClick={submitForm}
                  sx={{ borderRadius: 25, width: "220px", height: "100%", textTransform: "none", mt: 2 }}
                >
                  {t("common:submit")}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

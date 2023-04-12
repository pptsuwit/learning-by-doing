import HeaderView from "@/components/HeaderView";
import { Grid } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { jobPositionService } from "services/jobPosition.service";

export default function RecruitmentForm() {
  const { t } = useTranslation();

  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState();
  const [responsibilities, setResponsibilities] = useState();
  const [qualifications, setQualifications] = useState();
  const [benefit, setBenefit] = useState();
  const [amount, setAmount] = useState("1");
  const get = async () => {
    const data = {
      id: id,
    };
    jobPositionService
      .getById(data)
      .then((item: any) => {
        const data = item.data;
        setAmount(data.amount);
        if (router.locale === "th") {
          setTitle(data.nameTh);
          setResponsibilities(data.detailTh);
          setQualifications(data.qualificationTh);
          setBenefit(data.welfareTh);
        } else {
          setTitle(data.nameEn);
          setResponsibilities(data.detailEn);
          setQualifications(data.qualificationEn);
          setBenefit(data.welfareEn);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);
  return (
    <>
      <HeaderView name={t("common:register")} />
      <Grid container item xs={10} mx="auto" my={3} alignContent="flex-start" rowSpacing={5} mb={10}>
        <Grid item xs={12}>
          <div className="w-full h-full pb-10 rounded-br-[60px]" style={{ boxShadow: "1px 1px 5px 3px rgb(0 0 0 / 0.15)" }}>
            <Grid container className="px-5 pt-6 text-[#0090E5] font-bold">
              <Grid
                container
                alignContent="center"
                justifyContent={"start"}
                item
                xs={12}
                sm={12}
                md={10}
                className="xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
              >
                {title}
              </Grid>
              <Grid
                container
                alignContent="center"
                item
                xs={12}
                sm={12}
                md={2}
                className="xs:text-sm sm:text-md md:text-xl lg:text-2xl xs:justify-start sm:justify-start md:justify-end"
              >{`${amount} ${t("common:position")}`}</Grid>
            </Grid>
            <Box className="w-full foot-bg h-6 mt-6 shadow-gray-400 shadow-md"></Box>
            <Grid container mt={5}>
              <Grid item xl={2} lg={12} md={12} className="xs:text-md sm:text-xl md:text-2xl lg:text-2xl pl-4 pt-6 font-bold flex justify-between">
                <div>{t("common:responsibilities")}</div>
                <div>:</div>
              </Grid>
              <Grid item xl={10} lg={12} md={12} className="xs:text-sm sm:text-md md:text-2xl lg:text-2xl pl-4 pt-4 " style={{ lineHeight: 2 }}>
                {responsibilities}
              </Grid>
            </Grid>
            <Grid container mt={5}>
              <Grid item xl={2} lg={12} md={12} className="xs:text-md sm:text-xl md:text-2xl lg:text-2xl pl-4 pt-6 font-bold flex justify-between">
                <div>{t("common:qualifications")}</div>
                <div>:</div>
              </Grid>
              <Grid item xl={10} lg={12} md={12} className="xs:text-sm sm:text-md md:text-2xl lg:text-2xl pl-4 pt-4" style={{ lineHeight: 2 }}>
                {qualifications}
              </Grid>
            </Grid>
            <Grid container mt={5}>
              <Grid item xl={2} lg={12} md={12} className="xs:text-md sm:text-xl md:text-2xl lg:text-2xl pl-4 pt-6 font-bold flex justify-between">
                <div>{t("common:welfare")}</div>
                <div>:</div>
              </Grid>
              <Grid item xl={10} lg={12} md={12} className="xs:text-sm sm:text-md md:text-2xl lg:text-2xl pl-4 pt-4 " style={{ lineHeight: 2 }}>
                {benefit}
              </Grid>
            </Grid>
            <Grid container justifyContent="center" my={10}>
              <Grid item xl={12} className="text-center">
                <Link href={`/recruitment/${id}/register`}>
                  <Button
                    variant="contained"
                    className="bg-amber-400 xs:text-xl sm:text-xl md:text-2xl lg:text-2xl"
                    sx={{ borderRadius: 25, width: "220px", height: "100%", textTransform: "none", mt: 2 }}
                  >
                    {t("common:apply")}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

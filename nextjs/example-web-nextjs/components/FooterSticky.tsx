import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Map from "components/Home/Map";
import Image from "next/image";
import Box from "@mui/material/Box";
export default function Footer() {
  const router = useRouter();
  const { t } = useTranslation();
  // handle navbar menu
  const isActivePath = (path: string) => {
    if (path === "/home") {
      if (router.asPath === "/") return true;
    }
    const pathName = router.asPath.split("/");
    return pathName[1] === path ? true : false;
  };
  const navMenus = [
    { path: "/", name: t("navbar:home"), active: isActivePath("home") },
    { path: "/aboutme", name: t("navbar:aboutMe"), active: isActivePath("aboutme") },
    { path: "/product", name: t("navbar:product"), active: isActivePath("product") },
    { path: "/qaqc", name: t("navbar:qaQc"), active: isActivePath("qaqc") },
    { path: "/production_control", name: t("navbar:productionControl"), active: isActivePath("production_control") },
    { path: "/delivery", name: t("navbar:delivery"), active: isActivePath("delivery") },
    { path: "/certificate", name: t("navbar:certificate"), active: isActivePath("certificate") },
    { path: "/activity", name: t("navbar:activity"), active: isActivePath("activity") },
    { path: "/recruitment", name: t("navbar:recruitment"), active: isActivePath("recruitment") },
    { path: "/sdgs", name: t("navbar:sDGS"), active: isActivePath("sdgs") },
    { path: "/contact", name: t("navbar:contact"), active: isActivePath("contact") },
    { path: "/privacy", name: t("navbar:privacy"), active: isActivePath("privacy") },
  ];
  const activeClass = "block  transition  text-white font-bold text-xl";
  const inActiveClass = "block  transition hover:font-bold  text-white text-xl";
  const breadcrumbs = navMenus.map((item) => {
    return (
      <Link key={item.path} href={item.path} locale={""}>
        <a href={item.path} className={item.active ? activeClass : inActiveClass}>
          <span>{item.name}</span>
        </a>
      </Link>
    );
  });
  return (
    <Box
      // className="foot-bg sticky  bottom-0"
      className="foot-bg   bottom-0"
      sx={{
        position: "relative",
        width: "100%",
        // height: "360px",
      }}
    >
      <Grid container item xs={12} justifyContent="center" alignItems="start" p={2}>
        <Grid item xl={12} container justifyContent="center" alignContent="start" className="mb-3 text-white">
          <Breadcrumbs maxItems={12} separator="|" aria-label="breadcrumb" className="divider-white">
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid container item xs={6} sm={12} md={6} lg={7} px={3}>
          <Grid item xs={12}>
            <div className="text-center">
              <Image layout="fixed" width="110px" height="120px" src="/assets/icon/ic_logobig@2x.png" alt="logo" className="" />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="text-left text-xl text-white pl-10">{t("common:companyName")}</div>
          </Grid>
          <Grid item xs={12}>
            <div className="text-left text-white pl-10 ">
              <p>{t("common:addr1")}</p>
              <p>{t("common:addr2")}</p>
            </div>
          </Grid>
          <Grid container item xs={12} className="pl-10">
            <Grid container alignItems={"end"} item xl={9} lg={9} md={12} sm={12} xs={12}>
              <div className="text-left text-white ">
                <Image alt="phone" layout="fixed" src="/assets/icon/ic_phone_small.png" width={12} height={12}></Image>
                <span className="ml-1 mr-4">{t("common:call")}: 02-324-0721</span>

                <Image alt="fax" layout="fixed" src="/assets/icon/ic_fax_small.png" width={12} height={12}></Image>
                <span className="ml-1 mr-4">{t("common:fax")} : 0-2324-0303</span>

                <Image alt="email" layout="fixed" src="/assets/icon/ic_email_small.png" width={12} height={10}></Image>
                <span className="ml-1 ">{t("common:email")}: Sales@Mail.co.th</span>
              </div>
            </Grid>
            <Grid alignItems={"end"} item xl={3} lg={3} md={12} sm={12} xs={12}>
              <span className="mr-4">
                <Link href="https://www.facebook.com" passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <Image alt="fb" layout="fixed" src="/assets/icon/ic_facebook_small@2x.png" width={50} height={50}></Image>
                  </a>
                </Link>
              </span>
              <span className="mr-4 ">
                <Link href="https://lin.ee/fqDDyw5" passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <Image alt="line" layout="fixed" src="/assets/icon/ic_line_small@2x.png" width={50} height={50}></Image>
                  </a>
                </Link>
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5} px={3}>
          <div style={{ width: "100%", height: "240px" }}>
            <Map></Map>
          </div>
        </Grid>
      </Grid>

      <Grid container item xs={12} justifyContent="center" alignItems="center" className="text-white ">
        @ 2022
      </Grid>
    </Box>
  );
}

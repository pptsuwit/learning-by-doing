import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Map from "components/Home/Map";
import Image from "next/image";
import Box from "@mui/material/Box/Box";
import { contactUsService } from "services/contact.service";
export default function Footer() {
  const { t } = useTranslation();
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState("");
  const [tel, setTel] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [lineId, setLineId] = useState("");
  const get = async () => {
    contactUsService
      .get()
      .then((item: any) => {
        const data = item.data;
        setFacebookLink(data.facebookLink);
        setLineId(data.lineId);
        setTel(data.tel);
        setFax(data.fax);
        setEmail(data.email);
        if (router.locale === "th") {
          setCompanyName(data.companyNameTh);
          setAddress(data.addressTh);
        } else {
          setCompanyName(data.companyNameEn);
          setAddress(data.addressEn);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);
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
  const inActiveClass = "block  transition hover:text-black  text-white text-xl";
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
      className="foot-bg"
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Grid container item xs={12} justifyContent="center" alignItems="start" className="xs:pl-4 sm: p-2">
        <Grid item xl={12} container justifyContent="center" alignContent="start" className="mb-3 text-white">
          <Breadcrumbs maxItems={12} separator="|" aria-label="breadcrumb" className="divider-white">
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid container item xs={12} sm={12} md={6} lg={7} className="mb-3 xs:pl-4">
          <Grid item xs={12}>
            <div className="text-center">
              <Image layout="fixed" width="110px" height="120px" src="/assets/icon/ic_logobig@2x.png" alt="logo" className="" />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="text-left text-xl text-white">{companyName}</div>
          </Grid>
          <Grid item xs={12}>
            <div className="text-left text-white">
              <p>{address}</p>
            </div>
          </Grid>
          <Grid container item xs={12}>
            <Grid container alignItems={"end"} item xl={9} lg={9} md={12} sm={12} xs={12} className="text-white">
              <Grid item xs={"auto"}>
                <Image alt="phone" layout="fixed" src="/assets/icon/ic_phone_small.png" width={12} height={12}></Image>
                <span className="ml-1 mr-4">
                  {t("common:call")}: {tel}
                </span>
              </Grid>
              <Grid item xs={"auto"}>
                <Image alt="fax" layout="fixed" src="/assets/icon/ic_fax_small.png" width={12} height={12}></Image>
                <span className="ml-1 mr-4">
                  {t("common:fax")} : {fax}
                </span>
              </Grid>
              <Grid item xs={"auto"}>
                <Image alt="email" layout="fixed" src="/assets/icon/ic_email_small.png" width={12} height={10}></Image>
                <span className="ml-1 ">
                  {t("common:email")}: {email}
                </span>
              </Grid>
            </Grid>
            <Grid alignItems={"end"} item xl={3} lg={3} md={12} sm={12} xs={12}>
              {facebookLink !== "" && facebookLink !== "-" ? (
                <>
                  <span className="mr-4">
                    <Link href={facebookLink} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <Image alt="fb" layout="fixed" src="/assets/icon/ic_facebook_small@2x.png" width={50} height={50}></Image>
                      </a>
                    </Link>
                  </span>
                </>
              ) : (
                <></>
              )}
              {lineId !== "" && lineId !== "-" ? (
                <>
                  <span className="mr-4 ">
                    <Link href={lineId} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <Image alt="line" layout="fixed" src="/assets/icon/ic_line_small@2x.png" width={50} height={50}></Image>
                      </a>
                    </Link>
                  </span>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5} className="xs:px-1 sm:px-3 mb-3">
          <div style={{ width: "100%", height: "100%" }}>
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

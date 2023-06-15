import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Drawer, Grid, List, MenuItem, Select } from "@mui/material";
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import setLanguage from "next-translate/setLanguage";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation();
  const isActivePath = (path: string) => {
    if (path === "home") {
      if (router.asPath === "/") return true;
    }
    const pathName = router.asPath.split("/");
    return pathName[1] === path ? true : false;
  };
  const navMenus = [
    { path: "/", name: t("navbar:home"), active: isActivePath("home") },
    { path: "/aboutme", name: t("navbar:aboutMe"), active: isActivePath("aboutme") },
    { path: "/product", name: t("navbar:product"), active: isActivePath("product") },
    // { path: "/qaqc", name: t("navbar:qaQc"), active: isActivePath("qaqc") },
    // { path: "/production_control", name: t("navbar:productionControl"), active: isActivePath("production_control") },
    // { path: "/delivery", name: t("navbar:delivery"), active: isActivePath("delivery") },
    // { path: "/certificate", name: t("navbar:certificate"), active: isActivePath("certificate") },
    // { path: "/activity", name: t("navbar:activity"), active: isActivePath("activity") },
    { path: "/recruitment", name: t("navbar:recruitment"), active: isActivePath("recruitment") },
    // { path: "/sdgs", name: t("navbar:sDGS"), active: isActivePath("sdgs") },
    { path: "/contact", name: t("navbar:contact"), active: isActivePath("contact") },
  ];

  const getDrawername = (path: string) => {
    if (path === "/home") {
      if (router.asPath === "/") return "Home";
    }
    const pathName = router.asPath.split("/");
    return navMenus.find((w) => w.path === `/${pathName[1]}`)?.name || "";
  };
  const drawerName = getDrawername(router.asPath);

  const activeClass = "block transition text-black font-bold s-sm:text-[16px] s-md:text-[19px] s-lg:text-[21px] s-xl:text-[24px]";
  const inActiveClass = "block transition hover:font-bold text-black s-sm:text-[16px] s-md:text-[19px] s-lg:text-[21px] s-xl:text-[24px]";
  const breadcrumbs = navMenus.map((item) => {
    return (
      <Link key={item.path} href={item.path} locale={""}>
        <a href={item.path} className={item.active ? activeClass : inActiveClass}>
          <span>{item.name}</span>
        </a>
      </Link>
    );
  });
  const [flag, setFlag] = useState(router.locale || "en-GB");
  const handleLanguage = (event: any) => {
    const lang = event.target.value;
    setFlag(lang);
    setLanguage(lang);
  };
  const [drawer, setDrawer] = React.useState(false);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setDrawer(open);
  };
  const drawerList = (
    <List className="xs:w-[50vw] sm:w-[45vw]  md:w-[30vw] lg:w-[30vw]">
      {navMenus.map((item) => (
        <div className="text-center" key={item.path}>
          <Link key={item.path} href={item.path} locale={""} onClick={toggleDrawer(false)}>
            <Button fullWidth>{item.name}</Button>
          </Link>
        </div>
      ))}
    </List>
  );
  return (
    <>
      <Grid container py={1} className="z-20  shadow-md sticky top-0 bg-white my-0 ">
        <Grid
          item
          xl={1}
          lg={1}
          container
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "block",
            },
          }}
        >
          <Grid item xs={12} container justifyContent="center" className="">
            {/* <Image layout="fixed" width="60px" height="60px" src="/assets/icon/ic_logo_big.png" alt="logo" className="" /> */}
            <div style={{ width: "100%", minHeight: "60px", position: "relative" }}>
              <Image layout="fill" objectFit="contain" src="/assets/icon/ic_logo_big.png" alt="logo" />
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          xl={10}
          lg={10}
          container
          justifyContent="center"
          alignContent="center"
          className="xl:mx-0 lg:mx-0 md:mx-5 sm:mx-5 xs:hidden sm:hidden md:hidden lg:flex"
        >
          <Breadcrumbs maxItems={11} separator="|" aria-label="breadcrumb" className="breadcrumb-li">
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>

        <Grid item xl={1} lg={1} container justifyContent="center" style={{ paddingTop: 0 }}>
          <div className="flex">
            <div className="xs:flex sm:flex md:flex lg:hidden">
              <Button onClick={toggleDrawer(true)}>
                <MenuIcon fontSize="large"></MenuIcon>
              </Button>
              <div className="text-center text-2xl font-bold mx-auto mt-3">{drawerName}</div>
              <Drawer anchor={"left"} open={drawer} onClose={toggleDrawer(false)}>
                {drawerList}
                <div className="text-center">
                  <Select
                    value={flag}
                    onChange={handleLanguage}
                    // IconComponent={() => <KeyboardArrowDownIcon />}
                    autoWidth
                    style={{ textOverflow: "inherit" }}
                    sx={{
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      ".MuiOutlinedInput": { textOverflow: "inherit" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "0",
                        borderRadius: "0",
                      },
                    }}
                  >
                    <MenuItem value="en-GB">
                      <div className="flex">
                        <Image layout="fixed" src="/assets/icon/flag_uk.png" alt="" width={40} height={22} style={{ borderRadius: 10 }} />
                        <span className="ml-2 font-bold">{t("common:en")}</span>
                      </div>
                    </MenuItem>
                    <MenuItem value="th">
                      <div className="flex">
                        <Image layout="fixed" src="/assets/icon/flag_th.png" alt="" width={40} height={22} style={{ borderRadius: 10 }} />
                        <span className="ml-2  font-bold">{t("common:th")}</span>
                      </div>
                    </MenuItem>
                  </Select>
                </div>
              </Drawer>
            </div>
            <Select
              value={flag}
              onChange={handleLanguage}
              // IconComponent={() => <KeyboardArrowDownIcon />}
              autoWidth
              style={{ textOverflow: "inherit" }}
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                ".MuiOutlinedInput": { textOverflow: "inherit" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "0",
                  borderRadius: "0",
                },
              }}
            >
              <MenuItem value="en-GB">
                <div className="flex">
                  <Image layout="fixed" src="/assets/icon/flag_uk.png" alt="" width={40} height={22} style={{ borderRadius: 10 }} />
                  <span className="ml-2 font-bold">{t("common:en")}</span>
                </div>
              </MenuItem>
              <MenuItem value="th">
                <div className="flex">
                  <Image layout="fixed" src="/assets/icon/flag_th.png" alt="" width={40} height={22} style={{ borderRadius: 10 }} />
                  <span className="ml-2  font-bold">{t("common:th")}</span>
                </div>
              </MenuItem>
            </Select>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

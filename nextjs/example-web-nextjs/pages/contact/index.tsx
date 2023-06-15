import HeaderView from "@/components/Header";
import React from "react";

import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Map from "@/components/Home/Map";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { contactUsService } from "services/contact.service";
import { useRouter } from "next/router";
export default function Contact() {
  const { t } = useTranslation();
  const router = useRouter();
  const [companyName, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");

  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [lineId, setLineId] = useState("");

  const get = async () => {
    contactUsService
      .get()
      .then((item: any) => {
        const data = item.data;

        setTel(data.tel);
        setFax(data.fax);
        setEmail(data.email);
        setFacebookLink(data.facebookLink);
        setLineId(data.lineId);
        if (router.locale === "th") {
          setName(data.companyNameTh);
          setAddress(data.addressTh);
        } else {
          setName(data.companyNameEn);
          setAddress(data.addressEn);
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
      <HeaderView name={t("common:contact")} />
      <Grid container item xs={12}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <div className="text-center s-xxs:text-3xl s-xs:text-3xl s-sm:text-4xl s-md:text-5xl s-lg:text-5xl s-xl:text-text-6xl text-bold text-primary drop-shadow-lg  pl-5 mt-10">
            {companyName}
          </div>
          <div className="text-left s-xxs:text-xl s-xs:text-xl s-sm:text-2xl s-md:text-3xl s-lg:text-3xl s-xl:text-text-4xl text-bold pl-5 mt-10">
            <p>{address}</p>
          </div>
          <div className="text-left s-xxs:text-xl s-xs:text-xl s-sm:text-2xl s-md:text-3xl s-lg:text-3xl s-xl:text-text-4xl text-bold pl-5 my-5">
            <Image alt="phone" layout="fixed" src="/assets/icon/ic_phone_big.png" width={30} height={30}></Image>
            <span className="ml-4 mr-4 ">
              {t("common:call")}: {tel}
            </span>
          </div>
          <div className="text-left s-xxs:text-xl s-xs:text-xl s-sm:text-2xl s-md:text-3xl s-lg:text-3xl s-xl:text-text-4xl text-bold pl-5 my-5">
            <Image alt="fax" layout="fixed" src="/assets/icon/ic_fax_big.png" width={30} height={30}></Image>
            <span className="ml-4 mr-4">
              {t("common:fax")} : {fax}
            </span>
          </div>
          <Grid
            container
            item
            xs={12}
            className="text-left s-xxs:text-xl s-xs:text-xl s-sm:text-2xl s-md:text-3xl s-lg:text-3xl s-xl:text-text-4xl text-bold pl-5 my-5"
          >
            <Grid container item xs={12} sm={6} md={8} xl={8} alignItems={"end"}>
              <Image alt="email" layout="fixed" src="/assets/icon/ic_email_big.png" width={30} height={24}></Image>
              <span className="pl-4">
                {t("common:email")}: {email}
              </span>
            </Grid>
            <Grid container item xs={12} sm={6} md={4} xl={4} alignItems={"end"} className="xs:justify-start sm:justify-end xs:mt-10 sm:mt-0">
              {facebookLink !== "" && facebookLink !== "-" ? (
                <>
                  <span className="mr-4">
                    <Link href={facebookLink} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <Image alt="fb" layout="fixed" src="/assets/icon/ic_facebook_big.png" width={50} height={50}></Image>
                      </a>
                    </Link>
                  </span>
                </>
              ) : (
                <></>
              )}
              {lineId !== "" && lineId !== "-" ? (
                <>
                  <span className="mr-4">
                    <Link href={lineId} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <Image alt="line" layout="fixed" src="/assets/icon/ic_line_big.png" width={50} height={50}></Image>
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
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} mb={3}>
          <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
            <Map></Map>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

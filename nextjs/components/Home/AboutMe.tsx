import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import MenuHeader from "components/Home/MenuHeader";
import ViewMoreBtn from "components/Home/ViewMoreBtn";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { aboutUsService } from "services/about.service";
import { useRouter } from "next/router";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function AboutMe() {
  const { t } = useTranslation();
  const router = useRouter();
  const [detail, setDetail] = useState();
  const [video, setVideo] = useState();
  const [name, setName] = useState();
  const get = async () => {
    aboutUsService
      .get()
      .then((item: any) => {
        const data = item.data;
        if (router.locale === "th") {
          setDetail(data.detailTh);
        } else {
          setDetail(data.detailEn);
        }
        setVideo(data.video);
        setName(data.name);
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);
  return (
    <div style={{ height: "100%" }}>
      <Grid container my={8} pt={5}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6} mb={3}>
          <MenuHeader header={t("common:aboutme")} />
          <div className="xs:pl-4 sm:pl-4 md:px-10 xs:text-md sm:text-md md:text-2xl mt-10" style={{ lineHeight: 2 }}>
            {detail}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6} mb={3}>
          <div className="bg-amber-400 h-[100%]">
            <ReactPlayer className="react-player" url={video} controls={true} width={"100%"} height={"100%"} />
          </div>
          <div className="xs:h-[30px] sm:h-[30px] md:h-[50px] bg-amber-400 flex justify-center">
            <span className="text-center text-white xs:text-md sm:text-xl font-bold xs:m-1 sm:m-1 md:m-2"> </span>
          </div>
        </Grid>
      </Grid>

      <ViewMoreBtn to="aboutme" />
    </div>
  );
}

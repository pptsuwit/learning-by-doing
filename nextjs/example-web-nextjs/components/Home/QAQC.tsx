import useTranslation from "next-translate/useTranslation";
import MenuHeader from "components/Home/MenuHeader";
import ViewMoreBtn from "components/Home/ViewMoreBtn";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { qualityService } from "services/quality.service";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
export default function QAQC() {
  const { t } = useTranslation();
  const router = useRouter();
  const [detail, setDetail] = useState();
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [fileType, setFileType] = useState("");
  const get = async () => {
    qualityService
      .getHome()
      .then((item: any) => {
        const data = item.data[0];
        setImg(data.img);
        setFileType(data.fileType);
        setVideo(data.video);
        if (router.locale === "th") {
          setDetail(data.detailTh);
        } else {
          setDetail(data.detailEn);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);
  return (
    <div style={{ height: "100%", paddingTop: "30px" }}>
      <MenuHeader header={t("common:qaqc")} />
      <Grid container my={5} className="">
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div
            style={{
              position: "relative",
              minHeight: "500px",
              width: "100%",
              height: "100%",
            }}
          >
            {fileType === "image" ? (
              <>
                <Image
                  unoptimized
                  alt="img"
                  layout="fill"
                  objectFit="cover"
                  loader={() => img || "/assets/icon/ic_image@2x.png"}
                  src={img || "/assets/icon/ic_image@2x.png"}
                />
              </>
            ) : (
              <>
                <div className="h-[100%]">
                  <ReactPlayer className="react-player" url={video} controls={true} width={"100%"} height={"100%"} />
                </div>
              </>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} className="px-10">
          <div className="px-5 xs:text-sm sm:text-md md:text-xl lg:text-2xl mt-5" style={{ lineHeight: 2, height: "100%" }}>
            {detail}
          </div>
        </Grid>
      </Grid>
      <ViewMoreBtn to="qaqc" />
    </div>
  );
}

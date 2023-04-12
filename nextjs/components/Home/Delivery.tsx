import useTranslation from "next-translate/useTranslation";
import MenuHeader from "components/Home/MenuHeader";
import ViewMoreBtn from "components/Home/ViewMoreBtn";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Box from "@mui/material/Box/Box";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { transportService } from "services/transport.service";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Delivery() {
  const { t } = useTranslation();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [fileType, setFileType] = useState("");
  const get = async () => {
    transportService
      .getHome()
      .then((item: any) => {
        const data = item.data[0];
        setImg(data.activityImg);
        setFileType(data.fileType);
        setVideo(data.activityVideo);
        if (router.locale === "th") {
          setContent(data.detailTh);
        } else {
          setContent(data.detailEn);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);
  return (
    <div style={{ minHeight: "800px", height: "100%", paddingTop: 12 }}>
      <MenuHeader header={t("common:delivery")} />
      <Grid container my={6} style={{ minHeight: "500px" }}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div
            style={{
              position: "relative",
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
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Box sx={{ width: "100%", height: "100%", ml: 3, boxShadow: 4 }} className="foot-bg">
            <div className="px-5 text-white xs:text-sm sm:text-md md:text-xl lg:text-2xl pt-3" style={{ lineHeight: 2 }}>
              {content}
            </div>
          </Box>
        </Grid>
      </Grid>
      <ViewMoreBtn to="delivery" />
    </div>
  );
}

import useTranslation from "next-translate/useTranslation";
import MenuHeader from "components/Home/MenuHeader";
import ViewMoreBtn from "components/Home/ViewMoreBtn";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { activityService } from "services/activity.service";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
export default function Activity() {
  const { t } = useTranslation();
  const router = useRouter();
  const [detail, setDetail] = useState();
  // const [img, setImg] = useState("");
  // const [video, setVideo] = useState("");
  const [media, setMedia] = useState<any>();
  const get = async () => {
    activityService
      .getHome()
      .then((item: any) => {
        const data = item.data;
        if (data.length === 1) {
          const content = (
            <>
              <Grid container item xs={12} sm={12} md={12} lg={12}>
                {setMediaContent(data[0])}
              </Grid>
            </>
          );
          setMedia(content);
        } else if (data.length === 2) {
          const content = (
            <>
              <Grid container item xs={12} sm={12} md={12} lg={6}>
                {setMediaContent(data[0])}
              </Grid>
              <Grid container item xs={12} sm={12} md={12} lg={6}>
                {setMediaContent(data[1])}
              </Grid>
            </>
          );
          setMedia(content);
        } else {
          setMedia(<></>);
        }
        if (router.locale === "th") {
          setDetail(data[0].detailTh);
        } else {
          setDetail(data[0].detailEn);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);

  const setMediaContent = (data: any) => {
    if (data.fileType === "image") {
      return (
        <div
          style={{
            width: "100%",
            // height: "100%",
          }}
        >
          {/* <Image
            unoptimized
            alt="img"
            layout="responsive"
            objectFit="cover"
            loader={() => data.activityImg || "/assets/icon/ic_image@2x.png"}
            src={data.activityImg || "/assets/icon/ic_image@2x.png"}
            width={100}
            height={100}
          /> */}

          <img src={data.activityImg || "/assets/icon/ic_image@2x.png"} alt="img" width={"100%"} height="100%" />
        </div>
      );
    } else if (data.fileType === "video") {
      return <ReactPlayer className="react-player" url={data.activityVideo} controls={true} width={"100%"} height={"100%"} />;
    }
  };
  return (
    <div>
      <MenuHeader header={t("common:activity")} />
      <Grid container my={5} spacing={1}>
        {media}
      </Grid>

      <Grid container item xs={6} className="py-5 mx-auto">
        <div className="items-center text-center">
          <div className="xs:text-sm sm:text-md md:text-xl lg:text-2xl" style={{ lineHeight: 2 }}>
            {detail}
          </div>
        </div>
      </Grid>
      <ViewMoreBtn to="activity" />
    </div>
  );
}

import HeaderView from "@/components/Header";
import Grid from "@mui/material/Grid";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { sdgsService } from "services/sdgs.service";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function SDGSForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [fileType, setFileType] = useState("image");
  const get = async () => {
    const data = {
      id: id,
    };
    sdgsService
      .getById(data)
      .then((item: any) => {
        const data = item.data;

        setFileType(data.fileType);
        setImg(data.img);
        setVideo(data.video);

        if (router.locale === "th") {
          setName(data.nameTh);
          setDetail(data.detailTh);
        } else {
          setName(data.nameEn);
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
    <>
      <HeaderView name={t("common:sdgs")} size="sm:text-5xl" />
      <Grid container item xs={12} pb={5}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} mb={5}>
          <div className="text-left s-xxs:text-3xl s-xs:text-3xl s-sm:text-4xl s-md:text-5xl s-lg:text-5xl s-xl:text-text-6xl text-bold text-[#0090E5] drop-shadow-lg pl-5 ">
            {name}
          </div>
          <div
            className="text-left s-xxs:text-xl s-xs:text-xl s-sm:text-2xl s-md:text-3xl s-lg:text-3xl s-xl:text-text-4xl text-bold pl-5 mt-10"
            style={{ lineHeight: 1.5 }}
          >
            {detail}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} px={3} mb={10}>
          {fileType === "image" ? (
            <div className="flex justify-center">
              <img alt="img" src={img || "/assets/icon/ic_image@2x.png"} />
            </div>
          ) : (
            <ReactPlayer className="react-player" url={video} controls={true} width={"100%"} height={"100%"} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

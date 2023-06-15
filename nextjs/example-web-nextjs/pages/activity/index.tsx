import HeaderView from "@/components/Header";
import Grid from "@mui/material/Grid";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { activityService } from "services/activity.service";

export default function Activity() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("1");
  const [pageCount, setPageCount] = useState("1");

  const { t } = useTranslation();
  const router = useRouter();
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [fileType, setFileType] = useState("image");
  const get = async () => {
    activityService
      .get({
        page: page,
        pageSize: pageSize,
      })
      .then((item: any) => {
        const data = item.data[0];
        const count = item.count;
        if (count !== 0) {
          setPageCount(count || 1);
        }
        setFileType(data.fileType);
        setImg(data.activityImg);
        setVideo(data.activityVideo);

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
  }, [router.locale, page, pageSize]);
  const handleChangePage = (value: any) => setPage(value);
  return (
    <>
      <HeaderView name={t("common:activity")} />
      <Grid container item xs={12}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} px={3}>
          {fileType === "image" ? (
            <div className="flex justify-center">
              <img alt="img" src={img || "/assets/icon/ic_image@2x.png"} />
            </div>
          ) : (
            <ReactPlayer className="react-player" url={video} controls={true} width={"100%"} height={"100%"} />
          )}
        </Grid>
      </Grid>
      <Pagination count={parseInt(`${Math.ceil(parseInt(pageCount) / parseInt(pageSize))}`)} page={page} handleChange={handleChangePage} />
    </>
  );
}

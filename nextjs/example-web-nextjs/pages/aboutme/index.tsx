import HeaderView from "@/components/Header";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { aboutUsService } from "services/about.service";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
export default function About() {
  const { t } = useTranslation();
  const router = useRouter();
  const [detail, setDetail] = useState();
  const [video, setVideo] = useState();
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
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);
  return (
    <>
      <HeaderView name={t("common:aboutme")} />
      <div className="bg-amber-400 h-[80vh]">
        <ReactPlayer playing={true} className="react-player" url={video} controls={true} width={"100%"} height={"100%"} />
      </div>
      <div
        className="text-left s-xxs:text-xl s-xs:text-xl s-sm:text-2xl s-md:text-3xl s-lg:text-3xl s-xl:text-text-4xl pt-10 pb-14 xs:px-2 sm:px-10"
        style={{ lineHeight: 2 }}
      >
        {detail}
      </div>
    </>
  );
}

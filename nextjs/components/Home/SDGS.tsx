import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import MenuHeader from "components/Home/MenuHeader";
import ViewMoreBtn from "components/Home/ViewMoreBtn";
import { useRouter } from "next/router";
import { sdgsService } from "services/sdgs.service";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function SDGS() {
  const { t } = useTranslation();
  const router = useRouter();
  const [items, setItems] = useState<any>([]);
  const get = async () => {
    sdgsService
      .getHome()
      .then((item: any) => {
        const data = item.data;
        if (router.locale === "th") {
          const pc = data.map((item: any) => {
            return {
              imgPath: item.img,
              video: item.video,
              title: item.nameTh,
              content: item.detailTh,
              fileType: item.fileType,
            };
          });
          setItems(pc);
        } else {
          const pc = data.map((item: any) => {
            return {
              imgPath: item.img,
              title: item.nameEn,
              content: item.detailEn,
              video: item.video,
              fileType: item.fileType,
            };
          });
          setItems(pc);
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
      <div style={{ paddingTop: "30px" }} className="w-[100%] overflow-x-auto">
        <MenuHeader header={t("common:sdgs")} />
        <div
          className=" h-[540px] foot-bg flex py-4 my-12 overflow-x-auto"
          style={{ minWidth: "800px", overflowX: "auto", paddingLeft: items.length === 4 ? "1rem" : 0 }}
        >
          {items.map((item: any, index: number) => {
            const firstEle = index === 0 ? true : false;
            let width = firstEle ? "40%" : "20%";
            let borderLeft = firstEle ? "5px solid white" : "5px solid white";
            let bottom = "0px";
            let textTitle = "22px";
            let textContent = "16px";
            if (items.length === 1) {
              width = "50%";
              borderLeft = "5px solid white";
              textTitle = "32px";
              textContent = "20px";
              return (
                <React.Fragment key={item.title}>
                  <div
                    key={item.title}
                    className="imageCover border-white border-t-[5px]  border-b-[5px]"
                    style={{ width: width, position: "relative", overflow: "hidden" }}
                  >
                    {item.fileType === "image" ? (
                      <img
                        src={item.imgPath}
                        alt="img"
                        style={{
                          width: "100%",
                        }}
                      />
                    ) : (
                      <ReactPlayer className="react-player" url={item.video} controls={true} width={"100%"} height={"100%"} />
                    )}
                  </div>
                  <div className="border-white border-t-[5px]  border-b-[5px] " style={{ borderLeft: borderLeft, width: width, top: "50%" }}>
                    <div className="px-10 text-center  wrap-content-center" style={{ width: "100%", height: "100%" }}>
                      <div>
                        <p style={{ fontSize: textTitle }} className="font-bold text-white">
                          {item.title}
                        </p>
                        <p className="text-white mt-10 px-11" style={{ fontSize: textContent }}>
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            } else if (items.length === 2) {
              width = firstEle ? "50%" : "50%";
              borderLeft = firstEle ? "0" : "5px solid white";
            } else if (items.length === 3) {
              width = firstEle ? "33.33%" : "33.33%";
              borderLeft = firstEle ? "0" : "5px solid white";
            }
            return (
              <div
                key={item.title}
                className="imageCover border-white border-t-[5px]  border-b-[5px]"
                style={{ borderLeft: borderLeft, width: width, position: "relative", overflow: "hidden" }}
              >
                {item.fileType === "image" ? (
                  <img
                    src={item.imgPath}
                    alt="img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <ReactPlayer className="react-player" url={item.video} controls={true} width={"100%"} height={"100%"} />
                )}

                <div className="items-center text-left absolute px-2 bg-text-home" style={{ width: "100%", bottom: bottom, paddingBottom: "20px" }}>
                  <div className="wrap-text">
                    <p style={{ fontSize: textTitle }} className="font-bold ">
                      {item.title}
                    </p>
                  </div>
                  <p style={{ fontSize: textContent, overflow: "hidden", textOverflow: "ellipsis", height: "4.5ch" }}>{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ViewMoreBtn to="sdgs" />
    </>
  );
}

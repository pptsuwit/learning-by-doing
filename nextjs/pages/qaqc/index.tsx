import MenuHeader from "@/components/Home/MenuHeader";
import { Grid } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import Pagination from "@/components/Pagination";
import { qualityService } from "services/quality.service";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import Button from "@mui/material/Button";
import Link from "next/link";
export default function QaQc() {
  const { t } = useTranslation();
  const router = useRouter();
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("6");
  const [pageCount, setPageCount] = useState("1");
  const handleChangePage = (value: any) => setPage(value);
  const search = async () => {
    qualityService
      .get()
      .then((resp: any) => {
        const data = resp.data;
        const count = resp.count;
        if (count !== 0) {
          setPageCount(count || 1);
        }

        if (router.locale === "th") {
          const entity = data.map((item: any) => {
            return {
              id: item.id,
              bgImg: item.img,
              title: item.nameTh,
              video: item.video,
              fileType: item.fileType,
            };
          });
          setItems(entity);
        } else {
          const entity = data.map((item: any) => {
            return {
              id: item.id,
              bgImg: item.img,
              title: item.nameEn,
              video: item.video,
              fileType: item.fileType,
            };
          });
          setItems(entity);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale, page, pageSize]);

  return (
    <>
      <MenuHeader header={t("common:qaqc")} />

      <Grid container item xs={12} my={3} alignContent="flex-start">
        {items.map((item: any) => {
          return (
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} height={"500px"} key={item.id} className="px-10">
              {item.fileType === "image" ? (
                <div
                  className="relative shadow-lg drop-shadow-lg rounded-tr-[60px] rounded-bl-[60px] "
                  style={{
                    backgroundImage: `url("${item.bgImg}")`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="text-center pt-[350px]">
                    <div className=" bg-text-home overflow-hidden rounded-bl-[60px]">
                      <div className={`text-xl font-bold ${item.bgImg !== null ? "text-white" : "text-black"}`}>
                        <p style={{ overflow: "hidden", textOverflow: "ellipsis", height: "2ch" }}>{item.title}</p>
                      </div>

                      <Link href={`/qaqc/${item.id}`}>
                        <Button variant="contained" className="bg-amber-400 mb-5" sx={{ borderRadius: 25, width: "120px", textTransform: "none", mt: 2 }}>
                          {t("common:viewmore")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative shadow-lg drop-shadow-lg  rounded-tr-[60px] rounded-bl-[60px]">
                    <div className="player-wrapper h-[350px]">
                      <ReactPlayer className="react-player-qaqc" url={item.video} controls={true} width={"100%"} height={"100%"} />
                    </div>
                    <div className="text-center">
                      <div className=" bg-text-home overflow-hidden rounded-bl-[60px]">
                        <div className={`text-xl font-bold text-white`}>
                          <p style={{ overflow: "hidden", textOverflow: "ellipsis", height: "2ch" }}>{item.title}</p>
                        </div>

                        <Link href={`/qaqc/${item.id}`}>
                          <Button variant="contained" className="bg-amber-400 mb-5" sx={{ borderRadius: 25, width: "120px", textTransform: "none", mt: 2 }}>
                            {t("common:viewmore")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Grid>
          );
        })}
      </Grid>
      {/* <Pagination count={parseInt(`${Math.ceil(parseInt(pageCount) / parseInt(pageSize))}`)} page={page} handleChange={handleChangePage} /> */}
    </>
  );
}

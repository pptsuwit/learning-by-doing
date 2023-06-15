import HeaderView from "@/components/Header";
import Grid from "@mui/material/Grid";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { productService } from "services/product.service";

export default function ProductForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [detail, setDetail] = useState();
  const [name, setName] = useState();
  const [img, setImg] = useState("");
  const get = async () => {
    const data = {
      id: id,
    };
    productService
      .getById(data)
      .then((item: any) => {
        const data = item.data;
        if (router.locale === "th") {
          setDetail(data.detailTh);
          setName(data.nameTh);
        } else {
          setDetail(data.detailEn);
          setName(data.nameEn);
        }
        setImg(data.productImg);
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);
  return (
    <>
      <HeaderView name={t("common:product")} />
      <Grid container item xs={12} my={5}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} mb={3}>
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
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} px={3} mb={5}>
          <div className="flex justify-center">
            <img alt="img" src={img || "/assets/icon/ic_image@2x.png"} />
          </div>
          {/* <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image unoptimized alt="img" layout="fill" loader={() => img || "/assets/icon/ic_image@2x.png"} src={img || "/assets/icon/ic_image@2x.png"} />
          </div> */}
        </Grid>
      </Grid>
    </>
  );
}

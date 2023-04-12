import HeaderView from "@/components/Header";
import Grid from "@mui/material/Grid";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { certificateService } from "services/certificate.service";

export default function CertificateForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [img, setImg] = useState("");
  const get = async () => {
    const data = {
      id: id,
    };
    certificateService
      .getById(data)
      .then((item: any) => {
        const data = item.data;
        setImg(data.cerImg);

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
      <HeaderView name={t("common:certificate")} />
      <Grid container item xs={12}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} mb={10}>
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
          <div className="flex justify-center">
            <img alt="img" src={img || "/assets/icon/ic_image@2x.png"} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

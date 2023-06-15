import useTranslation from "next-translate/useTranslation";
import MenuHeader from "components/Home/MenuHeader";
import ViewMoreBtn from "components/Home/ViewMoreBtn";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { certificateService } from "services/certificate.service";

export default function Certificate() {
  const { t } = useTranslation();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const get = async () => {
    certificateService
      .getHome()
      .then((item: any) => {
        const data = item.data[0];

        setImg(data.cerImg);
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
    <div style={{ height: "100%", paddingTop: 12, paddingBottom: 10 }}>
      <MenuHeader header={t("common:certificate")} />
      <Grid container my={5}>
        <Grid item xs={12} sm={12} md={8} lg={8} mb={3}>
          <div className="px-10 xs:text-sm sm:text-md md:text-xl lg:text-2xl mt-10" style={{ lineHeight: 2 }}>
            {content}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} className="xs:px-2 sm:px5" mb={3}>
          <Image
            unoptimized
            alt="img"
            layout="responsive"
            objectFit="cover"
            loader={() => img || "/assets/icon/ic_image@2x.png"}
            src={img || "/assets/icon/ic_image@2x.png"}
            width={100}
            height={100}
          />
        </Grid>
      </Grid>
      <ViewMoreBtn to="certificate" />
    </div>
  );
}

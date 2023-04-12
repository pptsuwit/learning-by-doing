import { Button } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { styles } from "styles/styles";

export default function ViewMoreBtn(props: any) {
  const { t } = useTranslation();
  return (
    <div className="my-10 mb-[80px]  text-center">
      <Link href={props.to}>
        <Button color="primary" variant="contained" className="bg-amber-400" sx={styles.viewBtn}>
          {t("common:viewmore")}
        </Button>
      </Link>
    </div>
  );
}

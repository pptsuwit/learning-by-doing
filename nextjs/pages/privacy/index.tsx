import HeaderView from "@/components/Header";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { policyService } from "services/policy.service";
import { useRouter } from "next/router";

export default function Privacy() {
  const { t } = useTranslation();
  const router = useRouter();
  const [detail, setDetail] = useState();
  const get = async () => {
    policyService
      .get()
      .then((item: any) => {
        const data = item.data;
        if (router.locale === "th") {
          setDetail(data.detailTh);
        } else {
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
      <HeaderView name={t("common:privacy")} />
      <div
        className="text-left sm:pl-4 md:px-10 s-xxs:text-xl s-xs:text-xl s-sm:text-2xl s-md:text-3xl s-lg:text-3xl s-xl:text-text-4xl  p-4"
        style={{ lineHeight: 2 }}
      >
        {detail}
      </div>
    </>
  );
}

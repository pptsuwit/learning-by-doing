import useTranslation from "next-translate/useTranslation";
import MenuHeader from "components/Home/MenuHeader";
import ViewMoreBtn from "components/Home/ViewMoreBtn";
import Image from "next/image";
import { contactUsService } from "services/contact.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Contact() {
  const { t } = useTranslation();
  const router = useRouter();
  const [companyName, setName] = useState("");
  const [address, setAddress] = useState("");

  const get = async () => {
    contactUsService
      .get()
      .then((item: any) => {
        const data = item.data;

        if (router.locale === "th") {
          setName(data.companyNameTh);
          setAddress(data.addressTh);
        } else {
          setName(data.companyNameEn);
          setAddress(data.addressEn);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);
  return (
    <div style={{ height: "100%", paddingTop: "20px" }}>
      <MenuHeader header={t("common:contact")} />
      <div className="items-center text-center mt-10">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "auto",
            maxHeight: 500,
            position: "relative",
          }}
        >
          <Image src={`/assets/images/contact_img.JPG`} alt="thumbnail" width="100%" height="100%" layout="responsive" objectFit="cover" />
        </div>
        {/* <Image layout="fill" objectFit="contain" loader={() => "/assets/images/contact_img.JPG"} src="/assets/images/contact_img.JPG" alt="contact" unoptimized /> */}
      </div>
      <div className="my-10 mx-auto text-center">
        <div className="xs:text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-primary">{companyName}</div>
        <div className="mt-4 xs:text-sm sm:text-xl md:text-xl lg:text-xl font-bold">{address}</div>
      </div>

      <ViewMoreBtn to="contact" />
    </div>
  );
}

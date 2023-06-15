import Image from "next/image";
import { useEffect, useState } from "react";
import { logoService } from "services/logo.service";

export default function Sponser() {
  const [imgSponsor, setImgSponsor] = useState<any>([]);

  const get = async () => {
    logoService
      .getHome()
      .then((item: any) => {
        const data = item.data;
        setImgSponsor(data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-screen">
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {imgSponsor?.map((item: any, index: number) => {
          return (
            <div key={index} className="my-11 transition duration-200 hover:grayscale-0 flex justify-center">
              <Image unoptimized alt="sponsor" layout="fixed" loader={() => item.logoImg} src={item.logoImg} width={192} height={144} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

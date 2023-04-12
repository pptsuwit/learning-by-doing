import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { contactUsService } from "services/contact.service";
import { useRouter } from "next/router";

export const AnyReactComponent = (text: any) => <div>{text}</div>;
export default function Map() {
  const router = useRouter();
  // const apiKey = String(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
  // const [center, setCenter] = useState<any>();
  const [lat, setLat] = useState(13.724667);
  const [lng, setLng] = useState(100.516315);

  const get = async () => {
    contactUsService
      .get()
      .then((item: any) => {
        const data = item.data;
        setLat(data.lat);
        setLng(data.long);
      })
      .catch(() => {});
  };

  useEffect(() => {
    get();
  }, [router.locale]);
  // const renderMarkers = async (map: any, maps: any) => {
  //   contactUsService
  //     .get()
  //     .then((item: any) => {
  //       const data = item.data;
  //       setCenter({
  //         lat: Number(data.lat) || undefined,
  //         lng: Number(data.long) || undefined,
  //       });
  //       let marker = new maps.Marker({
  //         position: { lat: Number(data.lat) || defaultCenter.lat, lng: Number(data.long) || defaultCenter.lng },
  //         map,
  //         label: {
  //           text: "---" || "",
  //           color: "red",
  //           fontSize: "12px",
  //           className: "marker-position",
  //         },
  //       });
  //       return marker;
  //     })
  //     .catch(() => {});
  // };
  return (
    // <GoogleMapReact
    //   bootstrapURLKeys={{ key: apiKey }}
    //   defaultCenter={defaultCenter}
    //   center={center}
    //   zoom={14}
    //   onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
    // >
    //   {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
    // </GoogleMapReact>
    <iframe
      width="100%"
      height="100%"
      src={`https://maps.google.com/maps?q=${lat},${lng}&output=embed`}
      allowFullScreen
      loading="lazy"
      // frameborder="0"
      // scrolling="no"
      // marginheight="0"
      // marginwidth="0"
    ></iframe>
  );
}

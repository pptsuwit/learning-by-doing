import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Header(props: any) {
  return (
    <>
      <Grid container mb={3}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <div className="items-center text-center mt-5">
            <div className={`s-xxs:text-3xl s-xs:text-3xl s-sm:text-4xl s-md:text-5xl s-lg:text-5xl s-xl:text-text-6xl  font-bold justify-center`}>
              <span className="" style={{ color: "#0097E8" }}>
                &mdash; &ensp;
              </span>
              {props.name}

              <span className="" style={{ color: "#0097E8" }}>
                &ensp;&mdash;
              </span>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} container alignContent="center">
          <Box className="w-full foot-bg h-8 mt-6 shadow-gray-400 shadow-md"></Box>
        </Grid>
      </Grid>
    </>
  );
}

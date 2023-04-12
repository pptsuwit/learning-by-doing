import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuHeader from "./Home/MenuHeader";

export default function HeaderView(props: any) {
  return (
    <>
      <Grid container mb={3}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <MenuHeader header={props.name} size={props.size} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} container alignContent="center">
          <Box className="w-full foot-bg h-8 mt-6 shadow-gray-400 shadow-md"></Box>
        </Grid>
      </Grid>
    </>
  );
}

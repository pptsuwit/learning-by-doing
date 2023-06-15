import { Grid, Pagination } from "@mui/material";
import { useState } from "react";
export default function PageSize(props: any) {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    props.handleChange(value);
  };
  return (
    <Grid container justifyContent="center" alignContent="center" mt={5} mb={3}>
      <Pagination count={props.count || 1} page={page || 1} onChange={handleChange} color="primary" siblingCount={1} boundaryCount={2} />
    </Grid>
  );
}

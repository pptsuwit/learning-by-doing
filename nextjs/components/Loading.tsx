import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
interface Props {
  loading?: boolean;
}
export default function Loading(props: Props) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading || false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

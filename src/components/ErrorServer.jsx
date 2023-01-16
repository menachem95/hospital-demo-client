import { Box } from "@mui/material";
import Header from "./Header";

const ErrorServer = () => {
  return (
    <Box m="20px">
      {/* <Box
        sx={{ width: 1 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top="80px"
      > */}
      {/* <Header title="...תקלה בשרת" subtitle="ניתן לשלוח מייל לכתובת menachemf95@gmail.com" /> */}
      {/* </Box> */}
      <h1>תקלה זמנית בשרת</h1>
      <h3>ניתן לשלוח מייל לכתובת</h3>
      <h3>menachemf95@gmail.com</h3>
    </Box>
  );
};

export default ErrorServer;

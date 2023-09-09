
import { Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Input } from "@mui/material";

const PrinterInfoItem = ({ title, subTitle, editMode, blur }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  

  

  return (
    <>
      {" "}
      <Typography
        marginTop={"10px"}
        variant="h5"
        fontWeight="bold"
        sx={{ color: colors.greenAccent[300] }}
      >
        {title}
      </Typography>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ color: colors.grey[100] }}
      >
        {!editMode ? (
          subTitle
        ) : (
          <Input
        
          onBlur={(e) => blur({name: "printerModel", value: e.target.value})}
            inputProps={{
              sx: {
                "&::placeholder": {
                  textAlign: "end",
                },
              },
            }}
            style={{ textAlign: "end", padding: "0" }}
            placeholder={subTitle}
            // defaultValue={subTitle}
          />
        )}
      </Typography>
    </>
  );
};

export default PrinterInfoItem;

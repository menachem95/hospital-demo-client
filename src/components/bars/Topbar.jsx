import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

import { Box, CircularProgress, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

import { updatePrinters, updateTime, updateSearch } from "../../store/displayPrintersSlice";

import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";




const Topbar = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      bgcolor={colors.primary[700]}
      position="sticky"
      top="0px"
    >
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        onClick={() => navigate("/search")}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          onChange={(ev) => {
            console.log(ev.target.value);
            dispatch(updateSearch(ev.target.value));
          }}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        {isLoading ? (
          <CircularProgress
            size={"20px"}
            style={{ color: "white", marginTop: "7px" }}
          />
        ) : (
          <IconButton
            onClick={() => {
              setIsLoading(true);
              socket.emit("refresh", (printers, time) => {
                setIsLoading(false);
                dispatch(updatePrinters([...printers]));
                dispatch(updateTime(time));
              });
            }}
          >
            <RefreshIcon />
          </IconButton>
        )}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => navigate("/server-setting")}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

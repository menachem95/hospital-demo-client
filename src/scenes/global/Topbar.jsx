import { Box, CircularProgress, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { updateSearch } from "../../store/displayPrintersSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import LinearDeterminate from "../../components/UI/LinearDeterminate";
import SettingsIcon from "@mui/icons-material/Settings";
import { updatePrinters, updateTime } from "../../store/displayPrintersSlice";

import { useNavigate } from "react-router-dom";

const Topbar = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false)
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
      {/* SEARCH BAR */}
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

      {/* ICONS */}
      <Box display="flex">
        {/* <LinearDeterminate /> */}

       {isLoading ? 
          <CircularProgress size={"20px"} style={{color:"white", marginTop: "7px"}}  /> :
      
        <IconButton
          onClick={() => {
            setIsLoading(true)
            socket.emit("refresh", (printers, time) => {
              setIsLoading(false)
              dispatch(updatePrinters([...printers]));
              dispatch(updateTime(time));
            });
          }}
        >
          <RefreshIcon />
        </IconButton>}
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

        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default Topbar;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { createStyles, makeStyles } from "@material-ui/core";

import {
  updateSearch,
} from "../../store/displayPrintersSlice";

import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";

export const useStyles = makeStyles(() =>
  createStyles({
    rotateIcon: {
      animation: "$spin 1s linear infinite",
    },
    "@keyframes spin": {
      "0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
  })
);

const Topbar = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    socket.emit("refresh");
  };

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
          <IconButton>
            <RefreshIcon className={classes.rotateIcon} />
          </IconButton>
        ) : (
          <IconButton onClick={handleRefresh}>
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
        <IconButton disabled onClick={() => navigate("/server-setting")}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

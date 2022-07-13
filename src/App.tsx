import React from "react";
import { ThemeProvider } from "@mui/system";
import {
  AppBar,
  createTheme,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import { WeatherForecast } from "./components";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Dados climáticos
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <WeatherForecast />
      </main>
    </ThemeProvider>
  );
}

export default App;

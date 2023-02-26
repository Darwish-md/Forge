import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard/index";
import Overview from "scenes/overview";
import EloBoard from "scenes/EloBoard/index";
import React, { useState } from "react";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout onChangeDate={(date) => setSelectedDate(date)}/>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard date={selectedDate}/>} />
              <Route path="/relationship" element={<Overview />} />
              <Route path="/eloboard" element={<EloBoard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

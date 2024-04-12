import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, socketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

  const theme = createTheme(
    {
      scrollbarStyles: {
        "&::-webkit-scrollbar": {
          width: '8px',
          height: '8px',
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
          backgroundColor: mode === "light" ? "#00bfff" : "#fff !important",
          borderRadius: "8px",
        },
      },
      scrollbarStylesSoft: {
        "&::-webkit-scrollbar": {
          width: "8px",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: mode === "light" ? "#00bfff" : "#fff !important",
          borderRadius: "8px",
        },
      },
      palette: {
        type: mode,
        primary: { main: mode === "light" ? "#00bfff" : "#ffffff  !important" },
        textPrimary: mode === "light" ? "#00bfff" : "#ffffff  !important",
        borderPrimary: mode === "light" ? "#00bfff" : "#ffffff  !important",
        dark: { main: mode === "light" ? "#1C2E36" : "#ffffff " },
        light: { main: mode === "light" ? "#F3F3F3" : "#1C2E36" },
        tabHeaderBackground: mode === "light" ? "#FFFFFF" : "#1C2E36", //Menu Atendimentos (Abertas, Grupos...)
        optionsBackground: mode === "light" ? "#F1F5F5" : "#0F1B20", //Aba Atendimentos (Novos, Todos, Filas)
        chatlist: mode === "light" ? "#1C2E36" : "#1C2E36", //
        boxchatlist: mode === "light" ? "#ededed" : "#1C2E36", // ONDE???????????
        messageIcons: mode === "light" ? "ff0378" : "#F3F3F3",
        inputBackground: mode === "light" ? "#FFFFFF" : "#1C2E36", // ONDE???????????
        options: mode === "light" ? "#FFFFFF" : "#1C2E36",
        announcements: mode === "light" ? "#ededed" : "#1C2E36",
        fontecor: mode === "light" ? "#0000FF" : "#39ACE7",
        fancyBackground: mode === "light" ? "#fafafa" : "#333",
        bordabox: mode === "light" ? "#eee" : "#333",
        newmessagebox: mode === "light" ? "#eee" : "#333",
        inputdigita: mode === "light" ? "#fff" : "#666",
        contactdrawer: mode === "light" ? "#fff" : "#666",
        login: mode === "light" ? "#fff" : "#1C1C1C",
        announcementspopover: mode === "light" ? "#fff" : "#1C2E36",
        boxlist: mode === "light" ? "#ededed" : "#1C2E36",
        total: mode === "light" ? "#fff" : "#1C2E36",
        barraSuperior: mode === "light" ? "linear-gradient(to right, #00bfff, #004861, #04bbfc)" : "linear-gradient(to right, #31363d, #000000, #31363d)",//Barra Horizontal
        boxticket: mode === "light" ? "#EEE" : "#1C2E36",
        campaigntab: mode === "light" ? "#ededed" : "#1C2E36",
      },
      mode,
    },
    locale
  );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                	<SocketContext.Provider value={socketManager}>
	                    <Routes />
	                </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;

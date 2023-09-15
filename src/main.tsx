import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import global_en from "../src/translations/en/global.json";

import global_es from "../src/translations/es/global.json";

import App from "./App";
import "./styles/style.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <I18nextProvider i18n={i18next}>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </ChakraProvider>
  </I18nextProvider>
);

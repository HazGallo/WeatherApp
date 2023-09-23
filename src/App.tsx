import { useEffect, useState } from "react";
import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
// import { Card } from './components/Card';
// import { Button } from './components/button';
import SearchInput from "./components/SearchInput";
import { useWeather } from "./hooks/useWeather";
import useInputStore from "./store/weatherlyStore";
import { DataWeatherInfo } from "./components/DataWeatherInfo";
import { TransButton } from "./components/TransButton";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";

import "./styles/Spinner.css"; // Importa los estilos CSS
// ES6 Modules or TypeScript
// import Swal from "sweetalert2";

function App() {
  // Initialize inputValue from localStorage or an empty string
  const [inputValue, setInputValue] = useState(
    localStorage.getItem("inputValue") || ""
  );

  const handleInputChange = (value: string) => {
    // Update inputValue when the input changes
    setInputValue(value);
  };

  // The rest of your component code remains the same
  const { isError, data, mutate, isSuccess, isLoading } = useWeather();
  const { setDataWeather } = useInputStore();

  const [pageLoaded, setPageLoaded] = useState(true);
  const [t] = useTranslation("global");

  useEffect(() => {
    // This effect will run only once when the component is mounted
    setPageLoaded(false);
  }, []);

  // Use localStorage to save and load inputValue
  useEffect(() => {
    localStorage.setItem("inputValue", inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (pageLoaded) {
      return; // Don't make the API call and show loading message
    }
    mutate({ city: inputValue ? inputValue : "London" });
  }, [inputValue, mutate, pageLoaded]);

  useEffect(() => {
    if (isError) {
      messageError();
      //   // Swal.fire({
      //   //   icon: "error",
      //   //   title: "Oops...",
      //   //   text: "Something went wrong!",
      //   //   footer: "Please Enter A valid city name",
      //   // });
    }
    if (data && isSuccess) {
      setDataWeather(data);
    }
  }, [data, isSuccess, setDataWeather, isError]);

  const messageError = () => {
    toast.error(t("ErrorMessage"), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      bgImage={
        "https://images.pexels.com/photos/1605148/pexels-photo-1605148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      // bg={"blue.800"}
      w={"100%"}
      h={"100vh"}
      gap={"20px"}
    >
      <TransButton />

      {/* Weather Api */}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"10px"}
        p={"1rem"}
        w={["80%", "70%"]}
        h={["80%", "70%", "75%", "65%"]}
      >
        {/* Weather */}
        <Box bg={"white"} borderRadius={"md"} p={"1rem"} w={"90%"} h={"100%"}>
          <Box
            mb={["5px", "10px"]}
            justifyContent={"center"}
            width={"100%"}
            display={"flex"}
          >
            <SearchInput
              inputValue={inputValue}
              handleChange={handleInputChange}
            />
          </Box>
          <Box color={"black"}>
            {isLoading ? (
              <CircularProgress
                alignItems={"center"}
                mt={["100%", "10%"]}
                ml={["40%", "45%"]}
                isIndeterminate
                color="pink.500"
              />
            ) : isError ? (
              t("ErrorMessage")
            ) : (
              <DataWeatherInfo />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;

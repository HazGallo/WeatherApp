import { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
// import { Card } from './components/Card';
// import { Button } from './components/button';
import SearchInput from "./components/SearchInput";
import { useWeather } from "./hooks/useWeather";
import useInputStore from "./store/weatherlyStore";
import { DataWeatherInfo } from "./components/DataWeatherInfo";
import { TransButton } from "./components/TransButton";

import { Pulsar } from "@uiball/loaders"; //Spinners, page name is : uiball.com

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";

// import { Transition } from "react-transition-group";

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

  // const [inProp, setInProp] = useState(false);
  // const nodeRef = React.useRef(null);

  useEffect(() => {
    // This effect will run only once when the component is mounted
    setPageLoaded(false);
  }, []);

  console.log(Error);
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
      className="background"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      w={"100%"}
      h={"100vh"}
      gap={"20px"}
    >
      <TransButton />

      {/* Weather Api */}
      <Box
        bg={"white"}
        borderRadius={"md"}
        p={"1rem"}
        // w={"90%"}
        // h={"80%"}
        // display={"flex"}
        // alignItems={"center"}
        // justifyContent={"center"}

        w={["80%", "50%", "50%", "50%"]}
        h={["65%", "70%", "75%", "65%"]}
      >
        {/* Weather */}
        <Box>
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
              <Box
                display={"flex"}
                h={"200px"}
                w={"100%"}
                mt={["40%", "0%"]}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Pulsar size={80} speed={1.75} color="black" />
              </Box>
            ) : isError ? (
              <Box
                w={"100%"}
                h={"200px"}
                mt={["40%", "0%"]}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"red"}
                fontSize={"lg"}
                gap={"20px"}
              >
                <Image
                  w={["20%", "10%"]}
                  src={`https://www.pngarts.com/files/3/Letter-X-PNG-Free-Download.png`}
                />
                {t("ErrorMessage")}
              </Box>
            ) : (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <DataWeatherInfo />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;

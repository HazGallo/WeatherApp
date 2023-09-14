import { Box, Image } from "@chakra-ui/react";

import IconEs from "../../../assets/icons/IconEs.svg";

function EsButton() {
  return (
    <Box w={["30px", "25px"]}>
      <Image src={IconEs} alt="Icono en inglés" />
    </Box>
  );
}

export default EsButton;

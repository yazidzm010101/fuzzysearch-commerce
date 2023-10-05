import { Box, Button, Icon } from "@chakra-ui/react";
import React from "react";
import { BsX } from "react-icons/bs";

function CatalogueFilter({ isOpen, onClose, ...rest }) {
  const width = "300px";
  return (
    <Box
      w={{ base: 0, lg: isOpen && width }}
      h={{ base: 0, lg: "100vh" }}
      maxW={"full"}
      pos={"relative"}
      {...rest}
    >
      <Box
        bg={"white"}
        zIndex={998}
        w={width}
        maxW={"full"}
        px={4}
        py={4}
        borderRight={"1px solid rgb(0 0 0 / 0.1)"}
        h={"100vh"}
        pos={"fixed"}
        top={0}
        left={isOpen ? 0 : "-" + width}
        transition={"left .2s ease-in-out"}
        pt={20}
      >
        <Button
          rounded={"none"}
          display={{ lg: "none" }}
          p={1}
          variant={"ghost"}
          onClick={onClose}
          marginRight={"auto"}
          pos={"absolute"}
          top={20}
          right={4}
        >
          <Icon h={7} w={7} as={BsX} />
        </Button>
      </Box>
    </Box>
  );
}

export default CatalogueFilter;

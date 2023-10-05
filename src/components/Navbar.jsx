import { Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

function Navbar() {
  return (
    <Container
      pos={"fixed"}
      top={0}
      left={0}
      h={16}
      w={"full"}
      maxW={"full"}
      zIndex={999}
      bg={"gray.800"}
      borderBottom={"1px solid rgb(0 0 0 / 0.1)"}
    >
      <Text
        color={"red.500"}
        fontWeight={"extrabold"}
        left={"50%"}
        fontSize={"xl"}
        pos={"absolute"}
        top={"50%"}
        textAlign={"center"}
        transform={"translate(-50%, -50%)"}
      >
        FuzzySearch Commerce.
      </Text>
    </Container>
  );
}

export default Navbar;

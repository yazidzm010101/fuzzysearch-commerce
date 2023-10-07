import { Container, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import icon from "~/public/fuzzysearch-commerce.svg";

function Navbar() {
  return (
    <Container
      pos={"fixed"}
      top={0}
      left={0}
      h={14}
      w={"full"}
      maxW={"full"}
      zIndex={999}
      bg={"#0d0d27ff"}
      borderBottom={"1px solid rgb(0 0 0 / 0.1)"}
    >
      <HStack
        pos={"absolute"}
        left={"50%"}
        top={"50%"}
        transform={"translate(-50%, -50%)"}
      >
        <Image src={icon} w={8} h={8} />
        <Text
          color={"red.500"}
          fontWeight={"extrabold"}
          fontSize={{ base: "xs", sm: "md" }}
          textAlign={"center"}
          lineHeight={1}
        >
          FuzzySearch
          <br />
          Commerrce.
        </Text>
      </HStack>
    </Container>
  );
}

export default Navbar;

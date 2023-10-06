import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { number_format } from "../libs/text-utils";

function CatalogueList({ data, ratio = "normal", onItemClick }) {
  const ratioMap = {
    small: [
      "full",
      `${(1 / 2) * 100}%`,
      `${(1 / 2) * 100}%`,
      "full",
      `${(1 / 2) * 100}%`,
    ],
    large: [
      "full",
      `${(1 / 2) * 100}%`,
      `${(1 / 2) * 100}%`,
      `${(1 / 3) * 100}%`,
    ],
  };
  const ratioSize = ratioMap[ratio] || [
    "full",
    `${(1 / 2) * 100}%`,
    `${(1 / 3) * 100}%`,
    `${(1 / 4) * 100}%`,
  ];
  return (
    <Flex
      w={"full"}
      flexDir={"row"}
      alignItems={"stretch"}
      flexWrap={"wrap"}
    >
      {data?.map((item, i) => (
        <Box p={4} w={ratioSize}>
          <VStack
            border={"1px solid rgb(0 0 0 / 0.1)"}
            spacing={2}
            h={"full"}
            overflow={"hidden"}
            onClick={() => onItemClick(item)}
            _hover={{ border: "1px solid orange", cursor: "pointer" }}
          >
            <AspectRatio w={"full"} ratio={4 / 3}>
              <Image src={item.image} style={{ objectFit: "contain" }} />
            </AspectRatio>
            <VStack py={3} px={4} w={"full"} alignItems={"flex-start"}>
              <Heading
                textAlign={"start"}
                as={"h5"}
                fontSize={"xl"}
                fontWeight={"normal"}
              >
                {item.name}
              </Heading>
              <Text color={"orange.500"}>
                IDR {number_format(item.price, 2, ".", ",")}
              </Text>
            </VStack>
          </VStack>
        </Box>
      ))}
    </Flex>
  );
}

export default CatalogueList;

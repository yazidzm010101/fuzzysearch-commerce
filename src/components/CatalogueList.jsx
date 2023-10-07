import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { number_format } from "../libs/text-utils";
import { useCatalogues } from "@/hooks/catalogue-hook";

function CatalogueList({ data, ratio = "normal", onItemClick, activeItem }) {
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
    <Flex w={"full"} flexDir={"row"} alignItems={"stretch"} flexWrap={"wrap"}>
      {data?.map((item) => (
        <Box p={4} w={ratioSize} key={item.id}>
          <VStack
            pos={"relative"}
            spacing={2}
            h={"full"}
            overflow={"hidden"}
            border={
              (item.id === activeItem.id && "1px solid orange") ||
              "1px solid rgb(0 0 0 / 0.1)"
            }
            onClick={() => onItemClick(item)}
            _hover={{ border: "1px solid orange", cursor: "pointer" }}
          >
            <AspectRatio w={"full"} ratio={4 / 3}>
              <Image
                src={item.image}
                fallbackSrc={"https://via.placeholder.com/100"}
                style={{ objectFit: "contain" }}
              />
            </AspectRatio>
            {item.finalScore ? (
              <Box rounded={0} bg={"orange.400"} pos={"absolute"} left={0}>
                <VStack spacing={0} color={"white"}>
                  <Text>{Math.round(item.finalScore * 10000) / 100}</Text>
                  <Text fontSize={"10px"}>Fuzzy Score</Text>
                </VStack>
              </Box>
            ) : null}
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

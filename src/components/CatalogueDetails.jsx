import { number_format } from "@/libs/text-utils";
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsX, BsFan } from "react-icons/bs";
import { LuMemoryStick, LuHardDrive, LuCpu } from "react-icons/lu";

function CatalogueDetail({ isOpen, onClose, data, ...rest }) {
  const width = "400px";
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
        py={4}
        borderLeft={"1px solid rgb(0 0 0 / 0.1)"}
        h={"100vh"}
        pos={"fixed"}
        top={0}
        right={isOpen ? 0 : "-" + width}
        transition={"right .2s ease-in-out"}
        pt={20}
      >
        <Button
          rounded={"none"}
          p={1}
          variant={"ghost"}
          onClick={onClose}
          marginRight={"auto"}
          pos={"absolute"}
          top={20}
          right={4}
          zIndex={999}
        >
          <Icon h={7} w={7} as={BsX} />
        </Button>
        {data && (
          <>
            <AspectRatio ratio={1} borderBottom={"1px solid rgb(0 0 0 / 0.1)"}>
              <Image p={4} src={data.image} style={{ objectFit: "contain" }} />
            </AspectRatio>
            <Button rounded={0} bg={"orange.400"} pos={"absolute"} left={0} transform={"translateY(-100%)"}>
              <VStack spacing={0} color={"white"}><Text>100</Text><Text fontSize={"10px"}>Fuzzy Score</Text></VStack>
            </Button>
            <VStack p={4} alignItems={"start"}>
              <Heading
                color={"gray.800"}
                as={"h4"}
                fontSize={"2xl"}
                textAlign={"start"}
              >
                {data.name}
              </Heading>
              <Text color={"orange.500"} fontSize={"xl"}>
                IDR {number_format(data.price, 0, ".", ",")}
              </Text>
              <Text color={"gray.600"}>{data.description}</Text>
            </VStack>
            <Spacer as={'hr'} mx={6}/>
            <VStack py={3} px={4} w={"full"} alignItems={"flex-start"}>
              <Text color={"gray.700"}>Specification</Text>
              <HStack w={"full"} alignItems="flex-start">
                <Icon
                  color={"gray.600"}
                  as={LuMemoryStick}
                  w={6}
                  h={6}
                  flexShrink={0}
                />
                <Text color={"gray.600"} mr={"auto"}>
                  RAM
                </Text>
                <Text
                  fontWeight={"medium"}
                  maxW={"50%"}
                  textAlign="right"
                  color={"gray.700"}
                >
                  {data.ram} GB
                </Text>
              </HStack>
              <HStack w={"full"} alignItems="flex-start">
                <Icon
                  color={"gray.600"}
                  as={LuHardDrive}
                  w={6}
                  h={6}
                  flexShrink={0}
                />
                <Text color={"gray.600"} mr={"auto"}>
                  Storage
                </Text>
                <Text
                  fontWeight={"medium"}
                  maxW={"50%"}
                  textAlign="right"
                  color={"gray.700"}
                >
                  {data.storage} GB
                </Text>
              </HStack>
              <HStack w={"full"} alignItems="flex-start">
                <Icon
                  color={"gray.600"}
                  as={LuCpu}
                  w={6}
                  h={6}
                  flexShrink={0}
                />
                <Text color={"gray.600"} mr={"auto"}>
                  CPU
                </Text>
                <Text
                  fontWeight={"medium"}
                  maxW={"50%"}
                  textAlign="right"
                  color={"gray.700"}
                >
                  {data.cpu_core} Core @ {data.cpu_base_speed} GHz
                </Text>
              </HStack>
              <HStack w={"full"} alignItems="flex-start">
                <Icon
                  color={"gray.600"}
                  as={BsFan}
                  w={6}
                  h={6}
                  flexShrink={0}
                />
                <Text color={"gray.600"} mr={"auto"}>
                  GPU
                </Text>
                <Text
                  fontWeight={"medium"}
                  maxW={"50%"}
                  textAlign="right"
                  color={"gray.700"}
                >
                  {data.gpu_memory} GB @ {data.gpu_clock_speed} MHz clockspeed
                </Text>
              </HStack>
            </VStack>
          </>
        )}
      </Box>
    </Box>
  );
}

export default CatalogueDetail;

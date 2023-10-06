import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import { PiDotsSixVerticalThin } from "react-icons/pi";

function CatalogueFilter({ isOpen, onClose, ...rest }) {
  const width = "300px";
  const [ramRange, setRamRange] = useState([1, 32]);
  const [storageRange, setStorageRange] = useState([32, 2048]);
  const [cpuNumberRange, setCpuNumberRange] = useState([1, 32]);
  const [gpuMemoryRange, setGpuMemoryRange] = useState([1, 32]);
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
        borderRight={"1px solid rgb(0 0 0 / 0.1)"}
        h={"100vh"}
        pos={"fixed"}
        top={0}
        left={isOpen ? 0 : "-" + width}
        transition={"left .2s ease-in-out"}
        pt={20}
      >
        <Heading
          pos={"absolute"} w={"full"} top={16} left={0}
            as={"h6"}
            textAlign={"start"}
            px={4}
            borderBottom={"1px solid rgb(0 0 0 / 0.1)"}
            py={6}
            color={"gray.700"}
            fontSize={"xl"}
          >
            Fuzzy Filter
          </Heading>
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
        <VStack w={"full"} spacing={6} pt={20} pb={60} px={4} overflowY={"auto"}>
          <VStack w={"full"} alignItems={"flex-start"}>
            <Text>Price</Text>
            <HStack w={"full"}>
              <Input
                variant={"filled"}
                placeholder="Min"
                borderRadius={0}
                _focus={{borderColor: "orange.500"}}
                type="number"
              />
              <Text mx={"auto"}>-</Text>
              <Input
                variant={"filled"}
                placeholder="Max"
                borderRadius={0}
                _focus={{borderColor: "orange.500"}}
                type="number"
              />
            </HStack>
          </VStack>
          <VStack w={"full"} alignItems={"flex-start"}>
            <Text>Storage</Text>
            <HStack w={"full"} px={3}>
              <RangeSlider
                aria-label={["min", "max"]}
                mt={6}
                defaultValue={[32, 2048]}
                min={32}
                max={2048}
                step={32}
                onChange={(val) => setStorageRange(val)}
              >
                <RangeSliderMark
                  value={storageRange[0]}
                  textAlign="center"
                  bg="orange.500"
                  color="white"
                  mt="-10"
                  ml="-2"
                  w="12"
                >
                  {(storageRange[0] > 512 &&
                    `${Math.round((storageRange[0] * 100) / 1024) / 100}TB`) ||
                    `${storageRange[0]}GB`}
                </RangeSliderMark>
                <RangeSliderMark
                  value={storageRange[1]}
                  textAlign="center"
                  bg="orange.500"
                  color="white"
                  mt="-10"
                  ml="-10"
                  w="12"
                >
                  {(storageRange[1] > 512 &&
                    `${Math.round((storageRange[1] * 100) / 1024) / 100}TB`) ||
                    `${storageRange[1]}GB`}
                </RangeSliderMark>
                <RangeSliderTrack bg="red.100">
                  <RangeSliderFilledTrack bg="orange" />
                </RangeSliderTrack>
                <RangeSliderThumb
                  rounded={"sm"}
                  boxSize={6}
                  index={0}
                  border={"1px solid rgb(0 0 0 / 0.1)"}
                >
                  <Icon as={PiDotsSixVerticalThin} h={4} w={4} />
                </RangeSliderThumb>
                <RangeSliderThumb
                  rounded={"sm"}
                  boxSize={6}
                  index={1}
                  border={"1px solid rgb(0 0 0 / 0.1)"}
                >
                  <Icon as={PiDotsSixVerticalThin} h={4} w={4} />
                </RangeSliderThumb>
              </RangeSlider>
            </HStack>
          </VStack>
          <VStack w={"full"} alignItems={"flex-start"}>
            <Text>RAM</Text>
            <HStack w={"full"} px={3}>
              <RangeSlider
                aria-label={["min", "max"]}
                mt={6}
                defaultValue={[1, 32]}
                min={1}
                max={32}
                onChange={(val) => setRamRange(val)}
              >
                <RangeSliderMark
                  value={ramRange[0]}
                  textAlign="center"
                  bg="orange.500"
                  color="white"
                  mt="-10"
                  ml="-2"
                  w="12"
                >
                  {ramRange[0]}GB
                </RangeSliderMark>
                <RangeSliderMark
                  value={ramRange[1]}
                  textAlign="center"
                  bg="orange.500"
                  color="white"
                  mt="-10"
                  ml="-10"
                  w="12"
                >
                  {ramRange[1]}GB
                </RangeSliderMark>
                <RangeSliderTrack bg="red.100">
                  <RangeSliderFilledTrack bg="orange" />
                </RangeSliderTrack>
                <RangeSliderThumb
                  rounded={"sm"}
                  boxSize={6}
                  index={0}
                  border={"1px solid rgb(0 0 0 / 0.1)"}
                >
                  <Icon as={PiDotsSixVerticalThin} h={4} w={4} />
                </RangeSliderThumb>
                <RangeSliderThumb
                  rounded={"sm"}
                  boxSize={6}
                  index={1}
                  border={"1px solid rgb(0 0 0 / 0.1)"}
                >
                  <Icon as={PiDotsSixVerticalThin} h={4} w={4} />
                </RangeSliderThumb>
              </RangeSlider>
            </HStack>
          </VStack>
          <VStack w={"full"} alignItems={"flex-start"}>
            <Text>No. of CPU</Text>
            <HStack w={"full"} px={3}>
              <RangeSlider
                aria-label={["min", "max"]}
                mt={6}
                defaultValue={[1, 32]}
                min={1}
                max={32}
                onChange={(val) => setCpuNumberRange(val)}
              >
                <RangeSliderMark
                  value={cpuNumberRange[0]}
                  textAlign="center"
                  bg="orange.500"
                  color="white"
                  mt="-10"
                  ml="-2"
                  w="12"
                >
                  {cpuNumberRange[0]}
                </RangeSliderMark>
                <RangeSliderMark
                  value={cpuNumberRange[1]}
                  textAlign="center"
                  bg="orange.500"
                  color="white"
                  mt="-10"
                  ml="-10"
                  w="12"
                >
                  {cpuNumberRange[1]}
                </RangeSliderMark>
                <RangeSliderTrack bg="red.100">
                  <RangeSliderFilledTrack bg="orange" />
                </RangeSliderTrack>
                <RangeSliderThumb
                  rounded={"sm"}
                  boxSize={6}
                  index={0}
                  border={"1px solid rgb(0 0 0 / 0.1)"}
                >
                  <Icon as={PiDotsSixVerticalThin} h={4} w={4} />
                </RangeSliderThumb>
                <RangeSliderThumb
                  rounded={"sm"}
                  boxSize={6}
                  index={1}
                  border={"1px solid rgb(0 0 0 / 0.1)"}
                >
                  <Icon as={PiDotsSixVerticalThin} h={4} w={4} />
                </RangeSliderThumb>
              </RangeSlider>
            </HStack>
          </VStack>
          <VStack w={"full"} alignItems={"flex-start"}>
            <Text>CPU Speed</Text>
            <HStack w={"full"}>
              <Input
                variant={"filled"}
                placeholder="Min"
                borderRadius={0}
                _focus={{borderColor: "orange.500"}}
                type="number"
              />
              <Text mx={"auto"}>-</Text>
              <Input
                variant={"filled"}
                placeholder="Max"
                borderRadius={0}
                _focus={{borderColor: "orange.500"}}
                type="number"
              />
            </HStack>
          </VStack>
          <VStack w={"full"} alignItems={"flex-start"}>
            <Text>GPU Memory</Text>
            <HStack w={"full"} px={3}>
              <RangeSlider
                aria-label={["min", "max"]}
                mt={6}
                defaultValue={[1, 32]}
                min={1}
                max={32}
                onChange={(val) => setGpuMemoryRange(val)}
              >
                <RangeSliderMark
                  value={gpuMemoryRange[0]}
                  textAlign="center"
                  bg="orange.500"
                  color="white"
                  mt="-10"
                  ml="-2"
                  w="12"
                >
                  {gpuMemoryRange[0]}GB
                </RangeSliderMark>
                <RangeSliderMark
                  value={gpuMemoryRange[1]}
                  textAlign="center"
                  bg="orange.500"
                  color="white"
                  mt="-10"
                  ml="-10"
                  w="12"
                >
                  {gpuMemoryRange[1]}GB
                </RangeSliderMark>
                <RangeSliderTrack bg="red.100">
                  <RangeSliderFilledTrack bg="orange" />
                </RangeSliderTrack>
                <RangeSliderThumb
                  rounded={"sm"}
                  boxSize={6}
                  index={0}
                  border={"1px solid rgb(0 0 0 / 0.1)"}
                >
                  <Icon as={PiDotsSixVerticalThin} h={4} w={4} />
                </RangeSliderThumb>
                <RangeSliderThumb
                  rounded={"sm"}
                  boxSize={6}
                  index={1}
                  border={"1px solid rgb(0 0 0 / 0.1)"}
                >
                  <Icon as={PiDotsSixVerticalThin} h={4} w={4} />
                </RangeSliderThumb>
              </RangeSlider>
            </HStack>
          </VStack>
          <VStack w={"full"} alignItems={"flex-start"}>
            <Text>GPU Clock Speed</Text>
            <HStack w={"full"}>
              <Input
                variant={"filled"}
                placeholder="Min"
                borderRadius={0}
                _focus={{borderColor: "orange.500"}}
                type="number"
              />
              <Text mx={"auto"}>-</Text>
              <Input
                variant={"filled"}
                placeholder="Max"
                borderRadius={0}
                _focus={{borderColor: "orange.500"}}
                type="number"
              />
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default CatalogueFilter;

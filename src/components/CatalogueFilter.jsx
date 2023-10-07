import { useCatalogues } from "@/hooks/catalogue-hook";
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
  const defaultFilter = {
    ram: [1, 32],
    storage: [32, 2048],
    cpu_core: [1, 32],
    gpu_memory: [1, 32],
  };
  const { filterCatalogues } = useCatalogues();
  const [filterData, setFilterData] = useState(defaultFilter);
  return (
    <Box
      bg={"white"}
      zIndex={998}
      w={width}
      maxW={"full"}
      borderRight={"1px solid rgb(0 0 0 / 0.1)"}
      h={"calc(100vh - 3.5rem)"}
      pos={"fixed"}
      overflowY={"auto"}
      top={"3.5rem"}
      left={isOpen ? 0 : "-" + width}
      transition={"left .2s ease-in-out"}
      {...rest}
    >
      <Heading
        pos={"absolute"}
        w={"full"}
        top={0}
        left={0}
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
        top={4}
        right={4}
      >
        <Icon h={7} w={7} as={BsX} />
      </Button>
      <VStack w={"full"} spacing={6} pt={20} pb={60} px={4} overflowY={"auto"}>
        <CatalogueRangeInput
          label={"Price"}
          name={"price"}
          value={filterData.price}
          onChange={(val, name) =>
            setFilterData({ ...filterData, [name]: val })
          }
        />
        <CatalogueRangeSlider
          name={"storage"}
          label={"Storage"}
          minValue={32}
          maxValue={2048}
          stepValue={32}
          onChange={(val, name) =>
            setFilterData({ ...filterData, [name]: val })
          }
          value={filterData.storage}
          valueTextTransform={(val) =>
            (val > 512 && `${Math.round((val * 100) / 1024) / 100}TB`) ||
            `${val}GB`
          }
        />
        <CatalogueRangeSlider
          name={"ram"}
          label={"RAM"}
          minValue={1}
          maxValue={32}
          stepValue={1}
          onChange={(val, name) =>
            setFilterData({ ...filterData, [name]: val })
          }
          value={filterData.ram}
          valueTextTransform={(val) => `${val}GB`}
        />
        <CatalogueRangeSlider
          name={"cpu_core"}
          label={"No. of CPU"}
          minValue={1}
          maxValue={32}
          stepValue={1}
          onChange={(val, name) =>
            setFilterData({ ...filterData, [name]: val })
          }
          value={filterData.cpu_core}
          valueTextTransform={(val) => val}
        />
        <CatalogueRangeInput
          label={"CPU Speed"}
          name={"cpu_base_speed"}
          value={filterData.cpu_base_speed}
          onChange={(val, name) =>
            setFilterData({ ...filterData, [name]: val })
          }
        />
        <CatalogueRangeSlider
          name={"gpu_memory"}
          label={"GPU Memory"}
          minValue={1}
          maxValue={32}
          value={filterData.gpu_memory}
          valueTextTransform={(val) => `${val}GB`}
          onChange={(val, name) =>
            setFilterData({ ...filterData, [name]: val })
          }
        />
        <CatalogueRangeInput
          name={"gpu_clock_speed"}
          label={"GPU Clock Speed"}
          value={filterData.gpu_clock_speed}
          onChange={(val, name) =>
            setFilterData({ ...filterData, [name]: val })
          }
        />
        <Button
          bg={"orange.400"}
          color={"white"}
          borderRadius={0}
          w={"full"}
          onClick={() => filterCatalogues(filterData)}
        >
          Apply Filter
        </Button>
        <Button
          bg={"gray.100"}
          variant={"ghost"}
          borderRadius={0}
          w={"full"}
          onClick={() => {
            setFilterData(defaultFilter);
            filterCatalogues({});
          }}
        >
          Reset Filter
        </Button>
      </VStack>
    </Box>
  );
}

export default CatalogueFilter;

function CatalogueRangeSlider({
  label,
  name,
  value: currentValue,
  valueTextTransform,
  onChange,
  minValue,
  maxValue,
  stepValue,
}) {
  const value = currentValue || [minValue, maxValue];
  return (
    <VStack w={"full"} alignItems={"flex-start"}>
      <Text>{label}</Text>
      <HStack w={"full"} px={3}>
        <RangeSlider
          aria-label={["min", "max"]}
          mt={6}
          defaultValue={[minValue, maxValue]}
          min={minValue}
          max={maxValue}
          step={stepValue}
          name={name}
          value={value}
          onChange={(val) => onChange(val, name)}
        >
          <RangeSliderMark
            value={value[0]}
            textAlign="center"
            bg="orange.500"
            color="white"
            mt="-10"
            ml="-2"
            w="12"
          >
            {valueTextTransform(value[0])}
          </RangeSliderMark>
          <RangeSliderMark
            value={value[1]}
            textAlign="center"
            bg="orange.500"
            color="white"
            mt="-10"
            ml="-10"
            w="12"
          >
            {valueTextTransform(value[1])}
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
  );
}

function CatalogueRangeInput({ label, name, value = [], onChange }) {
  const onFocusOut = () => {
    if (!!value[0] && !!value[1]) {
      if (value[0] > value[1]) {
        onChange([value[1], value[1]], name);
      } else if (value[1] < value[0]) {
        onChange([value[1], value[1]], name);
      }
    }
  };
  return (
    <VStack w={"full"} alignItems={"flex-start"}>
      <Text>{label}</Text>
      <HStack w={"full"}>
        <Input
          onBlur={onFocusOut}
          variant={"filled"}
          placeholder="Min"
          borderRadius={0}
          _focus={{ borderColor: "orange.500" }}
          type="number"
          value={value[0] || ""}
          onChange={(e) => onChange([Number(e.target.value), value[1]], name)}
        />
        <Text mx={"auto"}>-</Text>
        <Input
          onBlur={onFocusOut}
          variant={"filled"}
          placeholder="Max"
          borderRadius={0}
          _focus={{ borderColor: "orange.500" }}
          type="number"
          value={value[1] || ""}
          onChange={(e) => onChange([value[0], Number(e.target.value)], name)}
        />
      </HStack>
    </VStack>
  );
}

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
import { BsArrowLeft, BsFan } from "react-icons/bs";
import { LuMemoryStick, LuHardDrive, LuCpu } from "react-icons/lu";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { fuzzySearch } from "@/libs/fuzzy-helper";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend
);

function CatalogueFuzzy({ isOpen, onClose, data, ...rest }) {
  const width = "400px";
  return (
    <Box pos={"relative"} {...rest}>
      <Box
        bg={"white"}
        zIndex={998}
        w={width}
        maxW={"full"}
        py={4}
        borderLeft={"1px solid rgb(0 0 0 / 0.1)"}
        h={"100vh"}
        overflowY={"auto"}
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
          left={4}
          zIndex={999}
        >
          <Icon h={6} w={6} as={BsArrowLeft} />
        </Button>
        <Heading
          pos={"absolute"}
          top={16}
          left={0}
          paddingLeft={16}
          color={"gray.800"}
          as={"h4"}
          py={6}
          textAlign={"start"}
          w={"full"}
          borderBottom={"1px solid rgb(0 0 0 / 0.1)"}
        >
          {data?.name && (
            <>
              <Text fontSize={"xl"}>Fuzzy Score</Text>
              <Text fontSize={"md"} color={"gray.500"} fontWeight={"normal"}>
                {data.name}
              </Text>
            </>
          )}
        </Heading>
        {data && (
          <>
            <VStack px={6} pb={4} pt={24} spacing={5} alignItems={"start"} w={"full"}>
              <Box w={"full"}>
                <FuzzyScore
                  title={"Price"}
                  crispInput={750000}
                  fuzzySets={[
                    { x: 500000, y: 0 },
                    { x: 1000000, y: 1 },
                    { x: 3500000, y: 1 },
                    { x: 4000000, y: 0 },
                  ]}
                />
                <Box w={"full"}>
                  <HStack w={"full"}>
                    <Text as={"h4"} w={"50%"}>
                      Price
                    </Text>
                    <Text textAlign={"end"} as={"h4"} w={"50%"}>
                      IDR {number_format(data.price, 2, ".", ",")}
                    </Text>
                  </HStack>
                  <HStack w={"full"}>
                    <Text as={"h4"} w={"50%"}>
                      Score
                    </Text>
                    <Text
                      color={"orange.500"}
                      textAlign={"end"}
                      as={"h4"}
                      w={"50%"}
                      fontWeight={"bold"}
                    >
                      100
                    </Text>
                  </HStack>
                </Box>
              </Box>
              <Spacer as={"hr"}/>
              <Box w={"full"}>
                <FuzzyScore
                  title={"Price"}
                  crispInput={750000}
                  fuzzySets={[
                    { x: 500000, y: 0 },
                    { x: 1000000, y: 1 },
                    { x: 3500000, y: 1 },
                    { x: 4000000, y: 0 },
                  ]}
                />
                <Box w={"full"}>
                  <HStack w={"full"}>
                    <Text as={"h4"} w={"50%"}>
                      Price
                    </Text>
                    <Text textAlign={"end"} as={"h4"} w={"50%"}>
                      IDR {number_format(data.price, 2, ".", ",")}
                    </Text>
                  </HStack>
                  <HStack w={"full"}>
                    <Text as={"h4"} w={"50%"}>
                      Score
                    </Text>
                    <Text
                      color={"orange.500"}
                      textAlign={"end"}
                      as={"h4"}
                      w={"50%"}
                      fontWeight={"bold"}
                    >
                      100
                    </Text>
                  </HStack>
                </Box>
              </Box>
              <Spacer as={"hr"}/>
              <HStack w={"full"} bg={"gray.800"} color={"white"} px={4} py={2}>
                <Text fontSize={"xl"}>Fuzzy Score</Text>
                <Text fontSize={"xl"} fontWeight={"bold"} color={"orange.400"} marginLeft={"auto"}>100</Text>
              </HStack>
              <HStack mt={-5} py={2} border={"1px solid rgb(0 0 0 / 0.3)"} spacing={4} w={"full"} justifyContent={"center"}>
                <Text>Final Score</Text>
                <Text>=</Text>
                <VStack spacing={0}>
                  <HStack borderBottom={"1px solid rgb(0 0 0 / 0.5)"}><Text>100</Text><Text>+</Text><Text>100</Text></HStack>
                  <Text>2</Text>
                </VStack>
                <Text>=</Text>
                <Text>100</Text>
              </HStack>
            </VStack>
          </>
        )}
      </Box>
    </Box>
  );
}

export default CatalogueFuzzy;

function FuzzyScore({ title, crispInput, fuzzySets }) {
  const crispOutput = fuzzySearch(crispInput, fuzzySets);

  const options = {
    reponsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: false,
        // position: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (val) => ([0, 1].indexOf(val) > -1 ? val * 100 : ""),
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Score",
        data: [{ x: crispInput, y: crispOutput }],
        borderColor: "rgb(0 0 0)",
        backgroundColor: "rgb(0 0 0)",
      },
      {
        label: "Fuzzy Sets",
        data: fuzzySets,
        borderColor: "rgb(255 132 99)",
        showLine: true,
        fill: true,
        backgroundColor: "rgb(255 132 99 / 0.25)",
      },
    ],
  };

  const arbitraryLine = {
    id: "arbitraryLine",
    afterDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.setLineDash([4]);
      ctx.strokeStyle = "black";
      ctx.moveTo(
        x.getPixelForValue(crispInput),
        y.getPixelForValue(crispOutput)
      );
      ctx.lineTo(x.getPixelForValue(crispInput), bottom);
      ctx.stroke();
      ctx.restore();
    },
  };

  return <Scatter options={options} data={data} plugins={[arbitraryLine]} />;
}

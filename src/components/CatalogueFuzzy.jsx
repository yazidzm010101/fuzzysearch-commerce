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
import { fuzzySearch, generateFuzzySets } from "@/libs/fuzzy-helper";
import { useCatalogues } from "@/hooks/catalogue-hook";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
);

function CatalogueFuzzy({ isOpen, onClose, data, ...rest }) {
  const {
    fuzzyFilter: { data: filter },
  } = useCatalogues();
  const width = "400px";

  const scores = [];
  let finalScore = 1;

  if (filter?.price) {
    scores.push({
      title: "Price",
      crispInput: data.price,
      crispInputText: "IDR " + number_format(data.price, 2, ".", ","),
      crispOutput: fuzzySearch(data.price, filter.price),
      fuzzySets: filter.price,
    });
  }
  if (filter?.storage) {
    scores.push({
      title: "Storage",
      crispInput: data.storage,
      crispInputText: data.storage + "GB",
      crispOutput: fuzzySearch(data.storage, filter.storage),
      fuzzySets: filter.storage,
    });
  }
  if (filter?.ram) {
    scores.push({
      title: "RAM",
      crispInput: data.ram,
      crispInputText: data.ram + "GB",
      crispOutput: fuzzySearch(data.ram, filter.ram),
      fuzzySets: filter.ram,
    });
  }
  if (filter?.cpu_core) {
    scores.push({
      title: "No. of CPU",
      crispInput: data.cpu_core,
      crispInputText: data.cpu_core,
      crispOutput: fuzzySearch(data.cpu_core, filter.cpu_core),
      fuzzySets: filter.cpu_core,
    });
  }
  if (filter?.cpu_base_speed) {
    scores.push({
      title: "CPU base speed",
      crispInput: data.cpu_base_speed,
      crispInputText: data.cpu_base_speed,
      crispOutput: fuzzySearch(data.cpu_base_speed, filter.cpu_base_speed),
      fuzzySets: filter.cpu_base_speed,
    });
  }
  if (filter?.gpu_memory) {
    scores.push({
      title: "GPU memory",
      crispInput: data.gpu_memory,
      crispInputText: data.gpu_memory,
      crispOutput: fuzzySearch(data.gpu_memory, filter.gpu_memory),
      fuzzySets: filter.gpu_memory,
    });
  }
  if (filter?.gpu_clock_speed) {
    scores.push({
      title: "GPU clock speed",
      crispInput: data.gpu_clock_speed,
      crispInputText: data.gpu_clock_speed,
      crispOutput: fuzzySearch(data.gpu_clock_speed, filter.gpu_clock_speed),
      fuzzySets: filter.gpu_clock_speed,
    });
  }
  if (scores.length > 0) {
    finalScore = Math.min(...scores.map((score) => score.crispOutput));
  }

  return (
    <Box
      bg={"white"}
      zIndex={998}
      w={width}
      maxW={"full"}
      py={4}
      borderLeft={"1px solid rgb(0 0 0 / 0.1)"}
      h={"calc(100vh - 3.5rem)"}
      overflowY={"auto"}
      pos={"fixed"}
      top={"3.5rem"}
      right={isOpen ? 0 : "-" + width}
      transition={"right .2s ease-in-out"}
      pt={4}
      {...rest}
    >
      <Button
        rounded={"none"}
        p={1}
        variant={"ghost"}
        onClick={onClose}
        marginRight={"auto"}
        pos={"absolute"}
        top={4}
        left={4}
        zIndex={999}
      >
        <Icon h={6} w={6} as={BsArrowLeft} />
      </Button>
      <Heading
        pos={"absolute"}
        top={0}
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
          <VStack
            px={6}
            pb={4}
            pt={24}
            spacing={5}
            alignItems={"start"}
            w={"full"}
          >
            {scores.map((item, i) => (
              <FuzzyScore
                key={i}
                title={item.title}
                crispInput={item.crispInput}
                crispInputText={item.crispInputText}
                fuzzySets={item.fuzzySets}
              />
            ))}
            <HStack w={"full"} bg={"gray.800"} color={"white"} px={4} py={2}>
              <Text fontSize={"xl"}>Fuzzy Score</Text>
              <Text
                fontSize={"xl"}
                fontWeight={"bold"}
                color={"orange.400"}
                marginLeft={"auto"}
              >
                {Math.round(finalScore * 10000) / 100}
              </Text>
            </HStack>
            {scores.length > 0 && (
              <HStack
                mt={-5}
                py={2}
                border={"1px solid rgb(0 0 0 / 0.3)"}
                spacing={1}
                w={"full"}
                justifyContent={"center"}
              >
                <Text flexShrink={0}>Final Score = </Text>
                <Text>
                  Min (
                  {scores
                    .map((score) => Math.round(score.crispOutput * 10000) / 100)
                    .join(", ")}
                  )
                </Text>
              </HStack>
            )}
          </VStack>
        </>
      )}
    </Box>
  );
}

export default CatalogueFuzzy;

function FuzzyScore({
  title,
  crispInput: curCrispInput,
  fuzzySets,
  crispInputText,
}) {
  const crispInput = Math.max(
    fuzzySets[0].x,
    Math.min(curCrispInput, fuzzySets[fuzzySets.length - 1].x),
  );
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
      ctx.lineWidth = 1;
      ctx.setLineDash([10]);
      ctx.strokeStyle = "black";
      ctx.moveTo(x.getPixelForValue(crispInput), bottom);
      ctx.lineTo(
        x.getPixelForValue(crispInput),
        y.getPixelForValue(crispOutput),
      );
      ctx.moveTo(
        x.getPixelForValue(crispInput),
        y.getPixelForValue(crispOutput),
      );
      ctx.lineTo(left, y.getPixelForValue(crispOutput));
      ctx.stroke();
      ctx.restore();
    },
  };

  return (
    <>
      <Box w={"full"}>
        <Scatter
          options={options}
          data={data}
          plugins={[arbitraryLine]}
          redraw={true}
        />
        <HStack w={"full"}>
          <Text as={"h4"} w={"50%"}>
            {title}
          </Text>
          <Text textAlign={"end"} as={"h4"} w={"50%"}>
            {crispInputText || crispInput}
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
            {Math.round(crispOutput * 10000) / 100}
          </Text>
        </HStack>
        <Spacer as={"hr"} my={2} />
      </Box>
    </>
  );
}

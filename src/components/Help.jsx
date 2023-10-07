"use client";

import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import Step1 from "@/assets/step1.png";
import Step2 from "@/assets/step2.png";
import Step3 from "@/assets/step3.png";
import Step4 from "@/assets/step4.png";
import Step5 from "@/assets/step5.png";
import Step6 from "@/assets/step6.png";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  appendDots: (dots) => (
    <div
      style={{
        backgroundColor: "rgb(0 0 0 / 0.05)",
        padding: "10px",
        bottom: 0,
      }}
    >
      <ul style={{ margin: "0px" }}> {dots} </ul>
    </div>
  ),
};

export default function Help({ isOpen, onClose }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: "Step 1",
      text: "FuzzySearch Commerce menampilkan simulasi daftar produk yang dimuat secara random sebanyak seratus data.",
      image: Step1,
    },
    {
      title: "Step 2",
      text: "Anda dapat memfilter katalog yang diimplementasikan menggunakan algoritma fuzzy search.",
      image: Step2,
    },
    {
      title: "Step 3",
      text: "Katalog yang telah terfilter akan menampilkan sebuah badge kecil berwarna jingga menampilkan skor final fuzzy dengan range nol sampai seratus diurutkan berdasarkan skor tertinggi",
      image: Step3,
    },
    {
      title: "Step 4",
      text: "Anda dapat melihat detil produk dengan mengklik salah satu item dari katalog produk, pada mode pencarian fuzzy badge berwarna jingga juga ditampilkan pada pojok kiri bawah gambar produk dan dapat diklik untuk melihat summary perhitungan filter fuzzy",
      image: Step4,
    },
    {
      title: "Step 5",
      text: "Summary filter fuzzy menampilkan daftar grafik dari parmameter pencarian yang anda pilih dan secara otomatis akan mengkalkulasi setiap parameter jatuh pada skor apa dari area fuzzy yang terbentuk.",
      image: Step5,
    },
    {
      title: "Step 6",
      text: "Perhitungan akhir skor fuzzy didapat dengan mengambil skor terendah diantara produk, karena metode ini tidak menerapkan pembobotan parameter.",
      image: Step6,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        w={"1000px"}
        mx={4}
        maxW={"container.md"}
        scrollBehavior={"outside"}
        overflow={"hidden"}
        borderRadius={0}
      >
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton top={4} borderRadius={0} />
        <ModalBody px={0} py={0}>
          <Box position={"relative"} width={"full"} overflow={"hidden"}>
            {/* CSS files for react-slick */}
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            {/* Left Icon */}
            <IconButton
              aria-label="left-arrow"
              colorScheme="orange"
              borderRadius={0}
              position="absolute"
              left={2}
              bottom={-4}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
            >
              <BiLeftArrowAlt />
            </IconButton>
            {/* Right Icon */}
            <IconButton
              aria-label="right-arrow"
              colorScheme="orange"
              borderRadius={0}
              position="absolute"
              right={2}
              bottom={-4}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
            >
              <BiRightArrowAlt />
            </IconButton>
            {/* Slider */}
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
              {cards.map((card, index) => (
                <VStack w={"full"} key={index} pb={12}>
                  <Image
                    src={card.image}
                    borderTop={"1px solid rgb(0 0 0/0.1)"}
                    borderBottom={"1px solid rgb(0 0 0/0.1)"}
                  />
                  <Text
                    px={4}
                    py={6}
                    textAlign={"center"}
                    fontSize={{ base: "md", sm: "lg" }}
                  >
                    {card.text}
                  </Text>
                </VStack>
              ))}
            </Slider>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

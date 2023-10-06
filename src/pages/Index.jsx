import { useState } from "react";
import { generateCatalogues } from "@/libs/faker-data";
import CatalogueList from "@/components/CatalogueList";
import {
  Box,
  Button,
  Container,
  HStack,
  Icon,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { BsFilter } from "react-icons/bs";
import CatalogueFilter from "@/components/CatalogueFilter";
import CatalogueDetail from "@/components/CatalogueDetails";

const catalogue = generateCatalogues(100);

function Index() {
  const catalogueDisc = useDisclosure();
  const detailDisc = useDisclosure();
  const [detail, setDetail] = useState(null);

  const onDetailClick = (item) => {
    detailDisc.onOpen();
    setDetail(item);
  };

  let ratioSize = "normal";

  if (catalogueDisc.isOpen && detailDisc.isOpen) {
    ratioSize = "small";
  } else if (catalogueDisc.isOpen ^ detailDisc.isOpen) {
    ratioSize = "large";
  }

  return (
    <>
      <Navbar />
      <HStack>
        <Box
          isOpen={catalogueDisc.isOpen}
          onClose={catalogueDisc.onClose}
          as={CatalogueFilter}
          flexShrink={0}
        />
        <VStack mt={'4rem'} py={5} transition={"width .2s ease-in-out"} maxH={"calc(100vh - 4rem)"} overflowY={"auto"}>
          <HStack px={4} w={"full"}>
            <Button
              onClick={catalogueDisc.onToggle}
              variant={"outline"}
              rounded={0}
              leftIcon={<Icon h={4} w={4} as={BsFilter} />}
            >
              Filter
            </Button>
          </HStack>
          <CatalogueList
            data={catalogue}
            ratio={ratioSize}
            onItemClick={onDetailClick}
          />
        </VStack>
        <Box
          isOpen={detailDisc.isOpen}
          onClose={detailDisc.onClose}
          data={detail}
          as={CatalogueDetail}
          flexShrink={0}
        />
      </HStack>
    </>
  );
}

export default Index;

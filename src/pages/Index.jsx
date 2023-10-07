import { useEffect, useState } from "react";
import { generateCatalogues } from "@/libs/faker-data";
import CatalogueList from "@/components/CatalogueList";
import {
  Box,
  Button,
  Container,
  HStack,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { BsFilter, BsQuestion } from "react-icons/bs";
import CatalogueFilter from "@/components/CatalogueFilter";
import CatalogueDetail from "@/components/CatalogueDetails";
import { useCatalogues } from "@/hooks/catalogue-hook";
import Help from "@/components/Help";

function Index() {
  const filterDisc = useDisclosure();
  const detailDisc = useDisclosure();
  const helpDisc = useDisclosure();
  const [detail, setDetail] = useState({});
  const {
    fuzzyFilter: { data: filter },
  } = useCatalogues();
  const {
    catalogues: { data: catalogues },
  } = useCatalogues();

  const onDetailClick = (item) => {
    detailDisc.onOpen();
    setDetail(item);
  };

  const onDetailClose = () => {
    detailDisc.onClose();
    setDetail({});
  };

  let ratioSize = "normal";

  if (filterDisc.isOpen && detailDisc.isOpen) {
    ratioSize = "small";
  } else if (filterDisc.isOpen ^ detailDisc.isOpen) {
    ratioSize = "large";
  }

  useEffect(() => {
    onDetailClose();
  }, [filter]);

  return (
    <>
      <Navbar />
      <HStack>
        <Box
          isOpen={filterDisc.isOpen}
          onClose={filterDisc.onClose}
          as={CatalogueFilter}
          flexShrink={0}
        />
        <VStack
          mt={"3.5rem"}
          py={5}
          maxH={"calc(100vh - 3.5rem)"}
          h={"calc(100vh - 3.5rem)"}
          overflowY={"auto"}
          paddingLeft={{ lg: filterDisc.isOpen && "300px" }}
          paddingRight={{ lg: detailDisc.isOpen && "400px" }}
          transition={{ lg: "padding .3s ease-in-out" }}
        >
          <HStack px={4} w={"full"}>
            <Button
              onClick={filterDisc.onToggle}
              variant={"outline"}
              rounded={0}
              leftIcon={<Icon h={4} w={4} as={BsFilter} />}
            >
              Filter
            </Button>
            <Button
              onClick={helpDisc.onToggle}
              variant={"outline"}
              rounded={0}
              leftIcon={<Icon h={4} w={4} as={BsQuestion} />}
            >
              Help
            </Button>
            {Object.keys(filter).length > 0 && (
              <Text marginLeft={"auto"} w={"max-content"}>
                Showing {catalogues.length} filter results
              </Text>
            )}
          </HStack>
          <CatalogueList
            data={catalogues}
            ratio={ratioSize}
            activeItem={detail}
            onItemClick={onDetailClick}
          />
          <Help isOpen={helpDisc.isOpen} onClose={helpDisc.onClose} />
        </VStack>
        <Box
          isOpen={detailDisc.isOpen}
          onClose={onDetailClose}
          data={detail}
          as={CatalogueDetail}
          flexShrink={0}
        />
      </HStack>
    </>
  );
}

export default Index;

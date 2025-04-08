import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Button,
  List,
  ListItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Lottie from "react-lottie-player";
import Notes from "../Assets/notes.json";
import Videos from "../Assets/video.json";
import Exam from "../Assets/ExamAni.json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudyMaterialSection = ({ youtubeLinks = [], attachments = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeLabel, setActiveLabel] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const {
    isOpen: isMainModalOpen,
    onOpen: onMainModalOpen,
    onClose: onMainModalClose,
  } = useDisclosure();

  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose,
  } = useDisclosure();

  const cardData = [
    { label: "Notes", animation: Notes },
    { label: "Videos", animation: Videos },
    { label: "Exam", animation: Exam },
  ];

  const handleCardClick = (label) => {
    setActiveLabel(label);
    onMainModalOpen();
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onDetailModalOpen();
  };

  const renderContentPreview = () => {
    if (activeLabel === "Videos") {
      return (
        <Box
          as="iframe"
          src={selectedItem}
          width="100%"
          height="400px"
          title="Video"
        />
      );
    }

    if (activeLabel === "Notes") {
      return (
        <Box
          as="iframe"
          src={`http://localhost:5000/${selectedItem}`}
          width="100%"
          height="600px"
          title="PDF"
        />
      );
    }

    return <Text>No preview available.</Text>;
  };

  const getItems = () => {
    if (activeLabel === "Notes") return attachments;
    if (activeLabel === "Videos") return youtubeLinks;
    return []; // Exam or other cases
  };
  const [randomNotes, setRandomNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const categories = ["Class 9 Math", "Class 9 Science"];
        const urls = categories.map(
          (category) =>
            `http://localhost:5000/notes/${encodeURIComponent(category)}/random`
        );

        const responses = await Promise.all(urls.map((url) => fetch(url)));

        responses.forEach((res, index) => {
          if (!res.ok) {
            throw new Error(`❌ Failed to fetch ${categories[index]} notes`);
          }
        });

        const data = await Promise.all(responses.map((res) => res.json()));

        const combinedNotes = [...data[0], ...data[1]];
        setRandomNotes(combinedNotes);
      } catch (error) {
        console.error("❌ Error fetching random notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <Box mt="6">
      <Flex
        direction={["column", null, "row"]}
        gap={12}
        align="flex-end"
        flexWrap="wrap"
      >
        <Box flex="1" minW={["90%", null, "60%"]}>
          <Text fontSize="lg" fontWeight="medium" mb={4}>
            Study Material
          </Text>
          <HStack spacing={4} mb={6} flexWrap="wrap">
            {cardData.map((item, idx) => (
              <VStack
                key={idx}
                p={4}
                bg="white"
                borderRadius="md"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.200"
                flex="1"
                minW={["90px", "120px", "150px"]}
                maxW="300px"
                opacity={
                  hoveredIndex === null || hoveredIndex === idx ? 1 : 0.5
                }
                transition="all 0.3s ease"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                cursor="pointer"
                onClick={() => handleCardClick(item.label)}
              >
                <Lottie
                  loop
                  play
                  animationData={item.animation}
                  style={{ width: 130, height: 130 }}
                />
                <Text fontWeight="bold" fontSize="md">
                  {item.label}
                </Text>
              </VStack>
            ))}
          </HStack>
          
          <Text fontSize="lg" fontWeight="medium" mb={4}>
            Related Links
          </Text>
          <Flex wrap="wrap" gap={4}>
            {randomNotes.map((note) => (
              <Button
                key={note._id}
                onClick={() => {
                  const category = encodeURIComponent(note.category); // Example: "Class 10 Math"
                  navigate(`/note/${category}/${note._id}`);
                }}
              >
                {note.title || "Untitled Note"}
              </Button>
            ))}
          </Flex>
        </Box>

        {/* Right Side Panel */}
        {/* <VStack
          spacing={6}
          align="stretch"
          flex="1"
          minW={["70%", null, "35%"]}
          alignItems="end"
        >
          <Box
            bg="white"
            borderRadius="md"
            p={4}
            border="1px solid"
            borderColor="gray.200"
            maxW="350px"
            w="100%"
          >
            <Text fontWeight="semibold" mb={2}>
              CBSE Sample Papers
            </Text>
            <List spacing={1} fontSize="sm">
              {Array(6)
                .fill("CBSE Sample Papers Class 8 Maths")
                .map((text, idx) => (
                  <ListItem key={idx}>• {text}</ListItem>
                ))}
            </List>
          </Box>

          <Box
            bg="white"
            borderRadius="md"
            p={4}
            border="1px solid"
            borderColor="gray.200"
            maxW="350px"
            w="100%"
          >
            <Text fontWeight="semibold" mb={2}>
              CBSE Previous Year Question Papers
            </Text>
            <List spacing={1} fontSize="sm">
              {Array(6)
                .fill("CBSE Previous Year Class 8 Maths")
                .map((text, idx) => (
                  <ListItem key={idx}>• {text}</ListItem>
                ))}
            </List>
          </Box>
        </VStack> */}
      </Flex>

     
      <Modal
        isOpen={isMainModalOpen}
        onClose={onMainModalClose}
        isCentered
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{activeLabel} </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              {getItems().length > 0 ? (
                <VStack spacing={4}>
                  {getItems().map((item, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleItemClick(item)}
                      colorScheme="blue"
                      w="100%"
                    >
                      {activeLabel === "Notes" ? item.split("/").pop() : item}
                    </Button>
                  ))}
                </VStack>
              ) : (
                <Text textAlign="center" fontSize="lg" color="gray.500">
                  🚧 Coming Soon 🚧
                </Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal 2: Preview Content */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        isCentered
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{activeLabel} Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderContentPreview()}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StudyMaterialSection;

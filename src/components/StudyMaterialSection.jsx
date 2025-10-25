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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Lottie from "react-lottie-player";
import Notes from "../Assets/notes.json";
import Videos from "../Assets/video.json";
import Exam from "../Assets/ExamAni.json";

import comingSoonAnimation from "../assets/soon.json"; // Adjust path as needed
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const StudyMaterialSection = ({
  youtubeLinks = [],
  attachments = [],
  isLoggedIn,
  chapter,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeLabel, setActiveLabel] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const cancelRef = useRef();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [previewRestricted, setPreviewRestricted] = useState(false);
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
  const handleYouTubeLink = (link) => {
    const videoId = getVideoId(link);
    const embedUrl = `${import.meta.env.VITE_API_URL}/embed/${videoId}`;
    navigate(embedUrl);
  };

  const handleItemClick = (item) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      setSelectedItem(item); // Save to open after "Continue"
    } else {
      if (activeLabel === "Videos" && item) {
        const videoUrl = handleYouTubeLink(item); // Process the YouTube URL
        setSelectedItem(videoUrl); // Set the processed video URL
      } else {
        setSelectedItem(item);
      }
      onDetailModalOpen();
    }
  };
  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    const maxHeight = 800; // Set your desired maximum height for scrolling
    iframe.contentWindow.document.addEventListener("scroll", () => {
      if (iframe.contentWindow.document.documentElement.scrollTop > maxHeight) {
        iframe.contentWindow.document.body.style.overflow = "hidden"; // Disable further scrolling
      }
    });
  };
  const renderContentPreview = () => {
    if (!selectedItem) {
      return <Text>No content selected.</Text>;
    }

    if (activeLabel === "Videos") {
      // Check if it's a valid YouTube URL and embed it
      return (
        <Box
          as="iframe"
          src={selectedItem}
          width="100%"
          height="400px"
          title="Video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (activeLabel === "Notes") {
      const previewSrc = previewRestricted
        ? `https://mozilla.github.io/pdf.js/web/viewer.html?file=${import.meta.env.VITE_API_URL}/${selectedItem}#page=1&zoom=page-fit`
        : `https://mozilla.github.io/pdf.js/web/viewer.html?file=${import.meta.env.VITE_API_URL}/${selectedItem}#page=1`;

      return (
        <Box
          as="iframe"
          src={previewSrc}
          width="100%"
          height="800px"
          title="PDF"
          onLoad={handleIframeLoad}
          style={{
            pointerEvents: isLoggedIn ? "auto" : "none", // Disables any interaction when not logged in
          }}
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
    const fetchNotesSequentially = async () => {
      try {
        const categories = ["Class 9 Math", "Class 9 Science"];
        const combinedNotes = [];

        for (const category of categories) {
          const url = `${import.meta.env.VITE_API_URL}/notes/${encodeURIComponent(
            category
          )}/random`;
          const res = await fetch(url);

          if (!res.ok) {
            throw new Error(`❌ Failed to fetch ${category} notes`);
          }

          const data = await res.json();
          combinedNotes.push(...data);
        }

        setRandomNotes(combinedNotes);
      } catch (error) {
        console.error("❌ Error fetching random notes:", error);
      }
    };

    fetchNotesSequentially();
  }, []);
  console.log("Selected Item:", selectedItem);

  return (
    <Box mt="6">
      <Flex
        direction={["column", null, "row"]}
        gap={12}
        align="flex-start"
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
        <VStack
          spacing={6}
          align="stretch"
          flex="1"
          minW={["70%", null, "35%"]}
          alignItems="center"
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
        </VStack>
      </Flex>

      <Modal
        isOpen={isMainModalOpen}
        onClose={onMainModalClose}
        isCentered
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{activeLabel} </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} className="flex items-center justify-center">
            <VStack spacing={4}>
              {getItems().length > 0 ? (
                <HStack spacing={4} flexWrap="wrap">
                  {getItems().map((item, idx) =>
                    activeLabel === "Videos" ? (
                      <div className="flex gap-4 flex-wrap justify-start items-start">
                        <Button
                          key={idx}
                          as="a"
                          href={item}
                          target="_blank"
                          rel="noopener noreferrer"
                          colorScheme="teal"
                          w="100%"
                        >
                          {chapter} Video {idx + 1}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        key={idx}
                        onClick={() => handleItemClick(item)}
                        colorScheme="blue"
                        w="100%"
                      >
                        {chapter} Notes {idx + 1}
                      </Button>
                    )
                  )}
                </HStack>
              ) : (
                <div className="flex justify-center items-center">
                  <Lottie
                    loop
                    animationData={comingSoonAnimation}
                    play
                    style={{ width: 200, height: 200 }}
                    justifyContent="center"
                    alignItems="center"
                  />
                </div>
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
        size="2xl"
        className={isLoggedIn ? "" : "no-scroll-modal"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{activeLabel} Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderContentPreview()}</ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={showLoginPrompt}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowLoginPrompt(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Login Required</AlertDialogHeader>
            <AlertDialogBody>
              These contents are only accessible when logged in.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setPreviewRestricted(true);
                  setShowLoginPrompt(false);
                  if (selectedItem) {
                    onDetailModalOpen();
                  }
                }}
              >
                Continue with Limited Access
              </Button>
              <Button
                colorScheme="blue"
                ml={3}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default StudyMaterialSection;

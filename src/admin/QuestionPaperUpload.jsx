import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Container,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import AdminNavbar from "./AdminNavbar";

// Function to upload question papers
const uploadQuestionPaper = async (formData) => {
  const res = await fetch("http://localhost:5000/upload-question-paper", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Upload failed");
  }

  return res.json();
};

// Function to fetch question papers
const fetchQuestionPapers = async () => {
  const response = await fetch("http://localhost:5000/question-papers");
  if (!response.ok) throw new Error("Failed to fetch question papers");
  return response.json();
};

const QuestionPaperUpload = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const toast = useToast();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const mutation = useMutation({
    mutationFn: uploadQuestionPaper,
    onSuccess: (data) => {
      toast({
        title: "Upload Successful",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Reset the form fields after successful submission
      setName("");
      setFile(null);
      setCategory("");
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setSelectedFiles(files); // Update the state with selected files
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPapers();
    if (!name || !file || !category) {
      toast({
        title: "Missing Fields",
        description:
          "Please provide a name, select a file, and choose a category.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
      
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("category", category);

    mutation.mutate(formData);
  };

  // Fetch question papers and filter by category
  const {
    data: papers,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["questionPapers"],
    queryFn: fetchQuestionPapers,
  });

  // Filter papers based on selected category
  const filteredPapers = papers
    ? category && category !== "" // Only filter if category is selected
      ? papers.filter((paper) => paper.category === category)
      : [] // If no category selected, don't show any papers
    : [];

  // Modal for viewing the question paper
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewPaper, setViewPaper] = useState(null);

  const handleView = (paper) => {
    setViewPaper(paper);
    onOpen();
  };

  const handleDelete = async (paperId) => {
    try {
      // Call API to delete the paper using fetch
      const response = await fetch(`http://localhost:5000/delete-question-paper/${paperId}`, {
        method: 'DELETE',
      });
  
      // Check if the deletion was successful
      if (response.ok) {
        console.log("✅ Paper deleted successfully");
  
        // Optionally refetch the papers or update state to remove the deleted paper
        // You can either call an API to fetch papers again or update the local state directly
        // For example:
        // setPapers(prevPapers => prevPapers.filter(paper => paper._id !== paperId));
  
        // If you are fetching papers again after deletion:
        // fetchPapers();
        refetch();
      } else {
        // Handle failed deletion
        const error = await response.text();
        console.error("❌ Failed to delete paper:", error);
        alert("❌ Failed to delete the paper");
      }
    } catch (error) {
      console.error("❌ Error deleting paper:", error);
      alert("❌ Failed to delete the paper");
    }
  };
  

  return (
    <>
      <AdminNavbar />
      <Container maxW="2xl" py={8}>
        <Heading mb={6}>Upload Question Paper</Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Select Category</FormLabel>
            <Select
              placeholder="Select category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="class10maths">Class 10 - Maths</option>
              <option value="class10sciences">Class 10 - Sciences</option>
              <option value="class9maths">Class 9 - Maths</option>
              <option value="class9sciences">Class 9 - Sciences</option>
            </Select>
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Question Paper Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Upload File</FormLabel>
            <Box
              as="label"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px dashed #3182ce"
              borderRadius="md"
              p={4}
              cursor="pointer"
              _hover={{ bg: "blue.50" }}
            >
              <Text color="blue.600" fontWeight="bold">
                Click to upload files
              </Text>
              <VisuallyHiddenInput
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0]) || handleFileChange(e)}
              />
            </Box>
          </FormControl>
          <Box mt={4}>
            {selectedFiles.length > 0 && (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>File Name</Th>
                    <Th>File Size</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedFiles.map((file, index) => (
                    <Tr key={index}>
                      <Td>{file.name}</Td>
                      <Td>{(file.size / 1024).toFixed(2)} KB</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={mutation.isLoading}
          >
            Upload
          </Button>
        </Box>

        <Container maxW="xl" mt={8}>
          <Heading size="lg" mb={6}>
            Question Papers
          </Heading>

          {isLoading && (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" thickness="4px" color="blue.500" />
              <Text mt={4}>Loading papers...</Text>
            </Box>
          )}

          {isError && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error.message}
            </Alert>
          )}

          {filteredPapers && filteredPapers.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredPapers.map((paper) => (
                  <Tr key={paper._id}>
                    <Td>{paper.name}</Td>
                    <Td>
                      <IconButton
                        icon={<ViewIcon />}
                        colorScheme="blue"
                        onClick={() => handleView(paper)}
                        aria-label="View"
                        mr={2}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleDelete(paper._id)}
                        aria-label="Delete"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            !isLoading && (
              <Text fontStyle="italic" color="gray.500">
                No question papers found for this category.
              </Text>
            )
          )}
        </Container>

        {/* Modal for Viewing Paper */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {viewPaper ? viewPaper.name : "View Paper"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {viewPaper ? (
                <Link
                  color="blue.500"
                  href={`http://localhost:5000/${viewPaper.file}`}
                  isExternal
                >
                  Veiw {viewPaper.name}
                </Link>
              ) : (
                <Text>No paper selected</Text>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
};

export default QuestionPaperUpload;

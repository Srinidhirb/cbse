import { useState, useRef, useEffect } from "react";
import { useDisclosure, UnorderedList, ListItem, Flex } from "@chakra-ui/react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  Text,
  Link,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Textarea,
  Td,
  IconButton,
  VisuallyHiddenInput,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  List,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import AdminNavbar from "./AdminNavbar";
const categories = [
  "Class 1 Math",
  "Class 1 Science",
  "Class 2 Math",
  "Class 2 Science",
  "Class 3 Math",
  "Class 3 Science",
  "Class 4 Math",
  "Class 4 Science",
  "Class 5 Math",
  "Class 5 Science",
  "Class 6 Math",
  "Class 6 Science",
  "Class 7 Math",
  "Class 7 Science",
  "Class 8 Math",
  "Class 8 Science",
  "Class 9 Math",
  "Class 9 Science",
  "Class 10 Math",
  "Class 10 Science",
];

const API_URL = import.meta.env.VITE_API_URL;

const addNote = async (formData) => {
  const response = await fetch(`${API_URL}/addNote`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to add note");
  return response.json();
};

const updateNote = async (category, id, formData) => {
  const response = await fetch(
    `${API_URL}/updateNote/${category}/${id}`,
    {
      method: "PUT",
      body: formData,
    }
  );
  if (!response.ok) throw new Error("Failed to update note");
  return response.json();
};

const deleteNote = async (category, id) => {
  const response = await fetch(
    `${API_URL}/deleteNote/${category}/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Failed to delete note");
  return response.json();
};

const fetchNotes = async (category) => {
  if (!category) return [];
  const response = await fetch(`${API_URL}/notes/${category}`);
  if (!response.ok) throw new Error("Failed to fetch notes");
  return response.json();
};

const AddNote = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const cancelRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [youtubeLinks, setYoutubeLinks] = useState("");

  const [initialTitle, setInitialTitle] = useState("");
  const [initialFiles, setInitialFiles] = useState([]);
  const { data: notes = [], refetch } = useQuery({
    queryKey: ["notes", category],
    queryFn: () => fetchNotes(category),
    enabled: !!category,
  });

  const addMutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes", category]);
      toast({
        title: "Note added successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ category, id, formData }) =>
      updateNote(category, id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes", category]);
      toast({
        title: "Note updated successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ category, id }) => deleteNote(category, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes", category]);
      toast({
        title: "Note deleted successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    },
  });
  useEffect(() => {
    if (editingId && selectedNote) {
      setInitialTitle(selectedNote.title);
      setInitialFiles(selectedNote.files);
      setDescription(selectedNote.description || ""); // ✅ Added
      setYoutubeLinks(selectedNote.youtubeLinks?.join(",") || ""); // ✅ Added
    }
  }, [editingId, selectedNote]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Check for duplicates
    const existingFileNames = files.map((file) => file.name);
    const filteredFiles = newFiles.filter(
      (file) => !existingFileNames.includes(file.name)
    );

    if (filteredFiles.length < newFiles.length) {
      toast({
        title: "Duplicate file detected!",
        description: "Some files were already added.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (filteredFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !title || files.length === 0) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("youtubeLinks", youtubeLinks);

    files.forEach((file) => formData.append("files", file));

    editingId
      ? updateMutation.mutate({ category, id: editingId, formData })
      : addMutation.mutate(formData);
  };

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const resetForm = () => {
    setCategory("");
    setTitle("");
    setDescription(""); // ✅ Added
    setYoutubeLinks(""); // ✅ Added

    setFiles([]);
    setEditingId(null);
  };

  return (
    <>
      {" "}
      <AdminNavbar />
      <Box
        maxW="700px"
        mx="auto"
        mt={10}
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Select Category</FormLabel>
            <Select
              placeholder="Select category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          {/* New Fields */}
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter note description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>YouTube Links (comma-separated)</FormLabel>
            <Input
              placeholder="Enter YouTube links"
              value={youtubeLinks}
              onChange={(e) => setYoutubeLinks(e.target.value)}
            />
          </FormControl>

          <FormControl></FormControl>

          <FormControl isRequired>
            <FormLabel>Upload Files</FormLabel>
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
                multiple
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </Box>
          </FormControl>

          {files.length > 0 && (
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>File Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {files.map((file, index) => (
                  <Tr key={index}>
                    <Td>{file.name}</Td>
                    <Td className="flex gap-3">
                      <IconButton
                        icon={<ViewIcon />}
                        colorScheme="blue"
                        variant="ghost"
                        background="white"
                        border="1px"
                        onClick={() => {
                          if (file.url) {
                            window.open(file.url, "_blank");
                          } else {
                            const fileURL = URL.createObjectURL(file);
                            window.open(fileURL, "_blank");
                          }
                        }}
                        aria-label="View File"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="ghost"
                        background="white"
                        border="1px"
                        onClick={() => handleRemoveFile(file.name)}
                        aria-label="Delete File"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={addMutation.isPending || updateMutation.isPending}
            isDisabled={
              (editingId &&
                title.trim() === initialTitle.trim() &&
                files.length === initialFiles.length) ||
              (!editingId && title.trim() === "" && files.length === 0)
            }
          >
            {editingId ? "Update Note" : "Add Note"}
          </Button>

          {editingId && isEditing && (
            <Button
              colorScheme="gray"
              onClick={() => {
                setIsEditing(false);
                setEditingId(null);
                setTitle("");
                setFiles([]);
                setDescription("");
                setYoutubeLinks("");
              }}
              ml={2} // Adds spacing between buttons
            >
              Cancel
            </Button>
          )}
        </VStack>

        {category && (
          <>
            <Divider my={6} />
            <Text fontSize="lg" fontWeight="bold">
              Existing Notes ({category})
            </Text>

            {notes.length === 0 ? (
              <Text my={4}>No notes available.</Text>
            ) : (
              <Table variant="simple" mt={4}>
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {notes.map((note) => (
                    <Tr key={note._id}>
                      <Td className="max-w-48">{note.title}</Td>
                      <Td className="max-w-16">
                        <Button
                          colorScheme="blue"
                          size="sm"
                          onClick={() => {
                            setSelectedNote(note);
                            onOpen();
                          }}
                        >
                          View More
                        </Button>
                        <IconButton
                          icon={<EditIcon />}
                          ml={2}
                          onClick={() => {
                            setEditingId(note._id);
                            setTitle(note.title);
                            setDescription(note.description || ""); // ✅ Added
                            setYoutubeLinks(note.youtubeLinks?.join(",") || ""); // ✅ Added
                            
                            setIsEditing(true);
                            // Ensure existing files are set in state
                            const fetchedFiles = note.files.map((file) => ({
                              name: file.split("/").pop(), // Extract file name
                              url: `${API_URL}/${file}`, // Keep the full URL for preview
                            }));

                            setFiles(fetchedFiles);
                          }}
                        />
                        <IconButton
                          aria-label="Delete Note"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          ml={2}
                          onClick={() => {
                            setNoteToDelete({ category, id: note?._id }); // Optional chaining to prevent errors
                            setIsAlertOpen(true);
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </>
        )}
        {selectedNote && (
          <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedNote.title}</ModalHeader>
              <ModalBody>
                {/* Description */}
                {selectedNote.description && (
                  <Box mb={4}>
                    <Text fontWeight="bold">Description:</Text>
                    <Text>{selectedNote.description}</Text>
                  </Box>
                )}

                {/* YouTube Links */}
                {selectedNote.youtubeLinks &&
                  selectedNote.youtubeLinks.length > 0 && (
                    <List spacing={2}>
                      {selectedNote.youtubeLinks.map((link, index) => (
                        <ListItem key={index}>
                          <Link href={link.trim()} color="blue.500" isExternal>
                            {link.trim()}
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  )}

                {/* Files Table */}
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>File</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedNote.files.map((file, index) => (
                      <Tr key={index}>
                        <Td>{file.split("/").pop()}</Td>
                        <Td>
                          <IconButton
                            icon={<ViewIcon />}
                            colorScheme="blue"
                            onClick={() =>
                              window.open(
                                `${API_URL}/${file}`,
                                "_blank"
                              )
                            }
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsAlertOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Note
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    if (noteToDelete) {
                      deleteMutation.mutate(noteToDelete);
                    }
                    setIsAlertOpen(false);
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
  );
};

export default AddNote;

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Center,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";

// Replace process.env with import.meta.env
const API_URL = import.meta.env.VITE_API_URL;

function BlogUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs`);
        const data = await response.json();

        // Log the entire response to inspect the structure
        console.log("Full API response:", data);

        // Check if the response is an object and look for the array inside it
        if (data && Array.isArray(data.blogs)) {
          setBlogs(data.blogs); // Use the correct field name for the blogs array
        } else {
          console.error("API returned invalid data format:", data);
          toast({
            title: "Error",
            description: "Failed to load blogs. Invalid data format.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        toast({
          title: "Error",
          description: "Failed to load blogs.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchBlogs();
  }, []);

  const handleImageChange = (e) => {
    const img = e.target.files[0];
    setImage(img);

    if (img) {
      const previewURL = URL.createObjectURL(img);
      setPreview(previewURL);
    } else {
      setPreview(null);
    }
  };

  // Ensure that preview is set when editing (i.e., image is a string URL)
  useEffect(() => {
    if (isEditing && image && typeof image === "string") {
      setPreview(image);
    }
  }, [image, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || (!image && !isEditing)) {
      toast({
        title: "Missing required fields",
        description:
          "Please fill in the title and description. Image is required for new blogs.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image); // Only add if a new one is selected

    if (file) formData.append("file", file);

    try {
      const url = isEditing
        ? `${API_URL}/blogs/${editingBlog._id}` // Ensure _id is accessed correctly
        : `${API_URL}/blogs/upload`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload or update blog");

      const data = await response.json();

      toast({
        title: "Success",
        description: isEditing
          ? "Blog updated successfully."
          : "Blog uploaded successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Clear form and reset states
      setTitle("");
      setDescription("");
      setImage(null);
      setFile(null);
      setPreview(null);
      setIsEditing(false);

      // Re-fetch blogs after upload/update
      setBlogs(data.blogs); // Assuming the response returns the updated list of blogs
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditingBlog(blog); // Store the entire blog object for later reference

    // Pre-fill form fields
    setTitle(blog.title || "");
    setDescription(blog.description || "");

    // Reset file inputs (user can upload new ones if they want)
    setImage(null);
    setFile(null);

    // Set preview using full URL if image exists
    if (blog.image) {
      setPreview(`${API_URL}/${blog.image.replace(/\\/g, "/")}`);
    } else {
      setPreview(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete blog");

      toast({
        title: "Success",
        description: "Blog deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <AdminNavbar />
      <Box className="p-6 max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow-md">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Upload Blog
        </Text>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormControl mb={4} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter blog description"
              rows={5}
            />
          </FormControl>

          <FormControl mb={4} isRequired={!isEditing}>
            <FormLabel>
              Upload Image{" "}
              {isEditing ? "(leave empty to keep current image)" : null}
            </FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-full h-64 object-contain rounded"
              />
            )}
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>Upload File (Optional)</FormLabel>
            <Input type="file"  accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            {isEditing ? "Save Changes" : "Submit Blog"}
          </Button>
          {isEditing && (
            <Button
              colorScheme="red"
              variant="outline"
              ml={2}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          )}
        </form>

        <Box mt={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Blogs
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(blogs) && blogs.length > 0 ? (
                blogs.map((blog) => (
                  <Tr key={blog._id}>
                    <Td>{blog.title}</Td>
                    <Td>{blog.description}</Td>
                    <Td flex="1" display="flex" justifyContent="space-between">
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit Blog"
                        mr={2}
                        onClick={() => handleEdit(blog)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete Blog"
                        onClick={() => handleDelete(blog._id)}
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="3">No blogs found</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default BlogUpload;

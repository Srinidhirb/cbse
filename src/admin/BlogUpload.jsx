import React, { useState } from "react";
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
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";

function BlogUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const toast = useToast();



  const handleImageChange = (e) => {
    const img = e.target.files[0];
    setImage(img);
    if (img) {
      setPreview(URL.createObjectURL(img));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      toast({
        title: "Missing required fields",
        description: "Please fill in the title, description, and image.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    if (file) formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/blogs/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload blog");

      toast({
        title: "Success",
        description: "Blog uploaded successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Clear form
      setTitle("");
      setDescription("");
      setImage(null);
      setFile(null);
      setPreview(null);
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
      <Box className="p-6 max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-md">
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

          <FormControl mb={4} isRequired>
            <FormLabel>Upload Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-full h-64 object-cover rounded"
              />
            )}
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>Upload File (Optional)</FormLabel>
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Submit Blog
          </Button>
        </form>
      </Box>
    </>
  );
}

export default BlogUpload;

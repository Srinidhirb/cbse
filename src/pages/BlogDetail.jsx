import React, { useEffect, useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();  // Initialize useNavigate
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blogs/${id}`);
        const data = await response.json();
        setBlog(data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <Text>Loading...</Text>;

  return (
    <Box p={6}>
      <Button mb={4} onClick={() => navigate("/blogs")}>  {/* Use navigate instead of history.push */}
        Back to All Blogs
      </Button>
      <Image src={`http://localhost:5000/${blog.image}`} alt={blog.title} boxSize="500px" objectFit="cover" />
      <Text fontSize="4xl" fontWeight="bold" mt={4}>
        {blog.title}
      </Text>
      <Text fontSize="lg" mt={4}>
        {blog.description}
      </Text>
      {blog.file && (
        <Box mt={4}>
          <Button as="a" href={`http://localhost:5000/${blog.file}`} download>
            Download File
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default BlogDetail;

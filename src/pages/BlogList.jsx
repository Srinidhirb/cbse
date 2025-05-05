import React, { useEffect, useState } from "react";
import { Box, Button, Image, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/blogs");
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        All Blogs
      </Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {blogs.map((blog) => (
          <Box key={blog._id} border="1px" borderColor="gray.300" borderRadius="lg" p={4}>
            <Image src={`http://localhost:5000/${blog.image}`} alt={blog.title} boxSize="200px" objectFit="cover" />
            <Text fontSize="xl" fontWeight="bold" mt={4}>
              {blog.title}
            </Text>
            <Text>{blog.description.slice(0, 100)}...</Text>
            <Link to={`/blogs/${blog._id}`}>
              <Button mt={4} colorScheme="teal">
                Read More
              </Button>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default BlogList;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchRelatedBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blogs`);
        const data = await response.json();
        // Filter out the current blog and shuffle the rest
        const others = data.blogs.filter((b) => b._id !== id);

        // Shuffle related blogs
        const shuffledBlogs = others.sort(() => 0.5 - Math.random());

        // Set the first 3 random blogs
        setRelatedBlogs(shuffledBlogs.slice(0, 3));
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    fetchRelatedBlogs();
  }, [id]);

  if (!blog) return <Spinner size="xl" />;

  return (
    <>
    <Nav />
    <Box p={6} maxW="1300px" mx="auto">
      <Button mb={4} onClick={() => navigate("/blogs")}>
        Back to All Blogs
      </Button>

      <Image
        src={`http://localhost:5000/${blog.image}`}
        alt={blog.title}
        borderRadius="xl"
        width="100%"
        maxH="500px"
        objectFit="contain"
        mb={6}
      />

      <Heading size="2xl" mb={2}>
        {blog.title}
      </Heading>
      <Text fontSize="md" color="gray.600" mb={4}>
        {blog.description}
      </Text>

      {blog.file && (
        <Button
          as="a"
          href={`http://localhost:5000/${blog.file}`}
          download
          colorScheme="teal"
          mb={6}
        >
          Download PDF
        </Button>
      )}

      <Divider my={10} />

      <Heading size="lg" mb={4}>
        Related Blogs
      </Heading>

      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {relatedBlogs.map((item) => (
            <Box
              key={item._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={() => navigate(`/blogs/${item._id}`)}
              transition="0.2s ease"
              _hover={{ shadow: "md", transform: "scale(1.02)" }}
            >
              <Image
                src={`http://localhost:5000/${item.image}`}
                alt={item.title}
                height="200px"
                width="100%"
                objectFit="contain"
                objectPosition="top"
              />
              <Box p={4}>
                <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                  {item.title}
                </Text>
                <Text fontSize="sm" color="gray.500" noOfLines={2}>
                  {item.description}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
    <Footer />
    </>
  );
}

export default BlogDetail;

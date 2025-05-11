import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Text,
  SimpleGrid,
  VStack,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Lottie from "react-lottie-player";
import Blogs from "../assets/blogs.json";
function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const blogsPerPage = 8;
  const [loading, setLoading] = useState(false);

  const observer = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/blogs");
        const data = await response.json();
        setBlogs(data.blogs);
        setVisibleBlogs(data.blogs.slice(0, blogsPerPage));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (loading) return;

    const handleScroll = (entries) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        !loading &&
        visibleBlogs.length < blogs.length
      ) {
        loadMoreBlogs();
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleScroll, options);
    if (observer.current) {
      const target = document.querySelector("#load-more-trigger");
      if (target) {
        observer.current.observe(target);
      }
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, visibleBlogs, blogs]);

  const loadMoreBlogs = () => {
    if (visibleBlogs.length >= blogs.length) return; // Prevent further loading
    setLoading(true);
    setTimeout(() => {
      const start = page * blogsPerPage;
      const end = start + blogsPerPage;
      const nextBlogs = blogs.slice(start, end);
      setVisibleBlogs((prev) => [...prev, ...nextBlogs]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Nav />
      <Box px={[4, 8]} pb={10}>
        <div className="flex gap-2 justify-center items-center"><Lottie
            loop
            animationData={Blogs}
            play
            style={{ width: 200, height: 200, marginBottom: "20px" }}
          />
        
        </div>

        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {visibleBlogs.map((blog) => (
            <Box
              key={blog._id}
              borderRadius="xl"
              overflow="hidden"
              position="relative"
              boxShadow="md"
              bg="white"
              _hover={{ boxShadow: "lg" }}
            >
              {/* Blog Image */}
              <Image
                src={`http://localhost:5000/${blog.image.replace(/\\/g, "/")}`}
                alt={blog.title}
                height="300px"
                width="100%"
                objectFit="cover"
                objectPosition="top"
                borderRadius="xl"
              />

              {/* Blog Details */}
              <VStack
                p={4}
                spacing={3}
                align="start"
                justify="center"
                color="gray.800"
              >
                <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
                  {blog.title}
                </Text>
                <Text fontSize="sm" noOfLines={3}>
                  {blog.description}
                </Text>
                <Link to={`/blogs/${blog._id}`}>
                  <Button size="sm" colorScheme="green">
                    Read More
                  </Button>
                </Link>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Load More Trigger */}
        <Box id="load-more-trigger" />
        {loading && (
          <VStack mt={8}>
            <Spinner color="green.500" />
          </VStack>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default BlogList;

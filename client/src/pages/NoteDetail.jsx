import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import dotenv from "dotenv";

import StudyMaterialSection from "../components/StudyMaterialSection";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

dotenv.config();

const NoteDetail = () => {
  const { category, id } = useParams();
  const { userEmail } = useAuth();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);
  const cancelRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoteSequentially = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/note/${category}/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch note");
        const data = await response.json();
        setNote(data);

        // Only require login for Class 9 and Class 10
        const requiresLogin =
          category === "Class 9 Math" ||
          category === "Class 9 Science" ||
          category === "Class 10 Math" ||
          category === "Class 10 Science";

        if (requiresLogin && !userEmail) {
          setShowAlert(true);
          setAllowAccess(false); // Ensure access is restricted until explicitly allowed
        } else {
          setAllowAccess(true);
        }
      } catch (err) {
        setError("Failed to load the note. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNoteSequentially();
  }, [category, id, userEmail]);

  const handleLoginRedirect = () => {
    setShowAlert(false);
    navigate("/login");
  };

  const handleContinue = () => {
    setShowAlert(false);
    setAllowAccess(true); // allow limited access
  };

  if (loading) {
    return (
      <motion.div
        key="loader"
        className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Loader />
      </motion.div>
    );
  }

  return (
    <>
      <Nav />
      <Box className="container" mx="auto" px={10} mt="6" py={[4, 6, 8]}>
        {error && (
          <div className="flex h-52 justify-center items-center">
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
          </div>
        )}

        {!error && note && (
          <Box>
            <Text
              fontSize={["xl", "2xl", "3xl"]}
              bgColor="#0245A3"
              color="#BDF1F6"
              px={[4, 6]}
              py={[2, 4]}
              borderRadius="2xl"
              textTransform="capitalize"
              fontWeight="bold"
              mb={4}
            >
              {note.title}
            </Text>

            <Text
              fontSize={["md", "lg"]}
              px={[2, 2]}
              mb={6}
              textAlign="justify"
            >
              {note.description}
            </Text>

            <StudyMaterialSection
              youtubeLinks={note.youtubeLinks}
              attachments={note.files}
              chapter={note.title}
              isLoggedIn={!!userEmail}
              allowAccess={allowAccess}
            />

            {note.youtubeLinks.length > 0 && (
              <div className="mb-4">
                <Text className="text-lg font-semibold">YouTube Links</Text>
                <ul>
                  {note.youtubeLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Box>
        )}
      </Box>
      <Footer />

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={showAlert}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowAlert(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={4}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Login Required
            </AlertDialogHeader>
            <AlertDialogBody>
              These contents are only accessible when logged in. Please login or
              continue with limited access.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleContinue}>
                Continue
              </Button>
              <Button colorScheme="blue" onClick={handleLoginRedirect} ml={3}>
                Login
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default NoteDetail;

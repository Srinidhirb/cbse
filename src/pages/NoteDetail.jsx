import React, { useState, useEffect, useRef } from "react";
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
import StudyMaterialSection from "../components/StudyMaterialSection";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

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
    const fetchNote = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/note/${category}/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch note");
        const data = await response.json();
        setNote(data);

        if (!userEmail) {
          setShowAlert(true);
        } else {
          setAllowAccess(true); // user is logged in
        }
      } catch (err) {
        setError("Failed to load the note. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [category, id, userEmail]);

  const handleLoginRedirect = () => {
    setShowAlert(false);
    navigate("/login");
  };

  const handleContinue = () => {
    setShowAlert(false);
    setAllowAccess(false); // continue without login
  };

  if (loading) return <Loader />;

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
              isLoggedIn={userEmail || allowAccess}
            />
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
              These contents are only accessible when logged in. Please login
              or continue with limited access.
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

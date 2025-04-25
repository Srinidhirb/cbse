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
        setError("Error fetching note details.");
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
  if (error) return <p>{error}</p>;
  if (!note) return <p>No note found.</p>;

  return (
    <>
      <Nav />
      <Box className="container" mx="auto" px={10} mt="6">
        <Text
          fontSize="3xl"
          bgColor={"#0245A3"}
          textColor={"#BDF1F6"}
          pl={6}
          py={4}
          borderRadius={22}
          textTransform={"capitalize"}
          fontWeight="bold"
          mb={4}
        >
          {note.title}
        </Text>
        <Text fontSize="lg" px="2" mb={4}>
          {note.description}
        </Text>

        {/* StudyMaterialSection with login check prop */}
        <StudyMaterialSection
          youtubeLinks={note.youtubeLinks}
          attachments={note.files}
          chapter={note.title}
          isLoggedIn={userEmail || allowAccess}
        />
      </Box>
      <Footer />

      {/* Alert Dialog for login prompt */}
      <AlertDialog
        isOpen={showAlert}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowAlert(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
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

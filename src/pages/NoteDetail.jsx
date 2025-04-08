import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import StudyMaterialSection from "../components/StudyMaterialSection";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const NoteDetail = () => {
  const { category, id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/note/${category}/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch note");
        const data = await response.json();
        setNote(data);
      } catch (err) {
        setError("Error fetching note details.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [category, id]);

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

        {/* StudyMaterialSection with props */}
        <StudyMaterialSection
          youtubeLinks={note.youtubeLinks}
          attachments={note.files}
        />
      </Box>
      <Footer />
    </>
  );
};

export default NoteDetail;

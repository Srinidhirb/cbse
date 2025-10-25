import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import Nav from "../components/Nav";
import Lottie from "react-lottie-player";
import Footer from "../components/Footer";
const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "This platform helps students share notes and watch educational videos based on their syllabus.",
  },
  {
    question: "How do I upload my notes?",
    answer:
      "You can go to the Upload section after logging in and choose files categorized by class and subject.",
  },
  {
    question: "Is it free to use?",
    answer: "Yes! All features are completely free for students and educators.",
  },
  {
    question: "How can I report incorrect content?",
    answer: "You can use the 'Report' button found next to any note or video.",
  },
  {
    question: "Can I refer this to my friends?",
    answer:
      "Absolutely! We even offer referral bonuses for new signups through your link.",
  },
  {
    question: "Do I need to sign up to view content?",
    answer:
      "No, but signing up unlocks additional features like uploading notes, saving favorites, and earning rewards.",
  },
  {
    question: "Are the notes verified?",
    answer:
      "Notes are community-driven. Our moderation team checks and verifies content regularly.",
  },
  {
    question: "What type of videos are available?",
    answer:
      "You can find syllabus-based tutorials, exam preparation videos, and subject-wise concept explanations.",
  },
  {
    question: "Is my personal data safe?",
    answer:
      "Yes, we follow industry-standard practices to ensure data privacy and protection.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Just click on ‘Forgot Password’ on the login page and follow the instructions sent to your email.",
  },
];

export default function FaqPage() {
  const [faqAnimationData, setFaqAnimationData] = useState(null);

  useEffect(() => {
    // Fetch JSON data
    const fetchFaqAnimation = async () => {
      const response = await fetch("/json/faq.json");
      setFaqAnimationData(await response.json());
    };

    fetchFaqAnimation();
  }, []);

  return (
    <>
      <Nav />
      <div className="min-h-screen  px-4 py-12 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          {faqAnimationData && (
            <Lottie
              loop
              animationData={faqAnimationData}
              play
              style={{ width: 100, height: 100 }}
            />
          )}
          <h1 className="text-4xl font-extrabold text-gray-800">FAQs</h1>
        </div>
        <p className="text-gray-600 max-w-4xl text-lg text-center mb-10">
          Got questions? We’ve got answers! Browse our frequently asked
          questions below to learn more about the platform.
        </p>

        <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-3xl shadow-lg">
          <Accordion allowMultiple>
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} border="none" className="mb-2">
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "blue.50", color: "blue.700" }}
                    className="rounded-lg hover:bg-blue-50 px-4 py-3 transition-all duration-200"
                  >
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      className="text-lg font-semibold text-gray-800"
                    >
                      {faq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="text-gray-600 px-4 pt-2">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
    </>
  );
}

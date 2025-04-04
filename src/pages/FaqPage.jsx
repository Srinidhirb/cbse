import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import Nav from "../components/Nav";

const faqs = [
  {
    question: "What is this platform about?",
    answer: "This platform helps students share notes and watch educational videos based on their syllabus."
  },
  {
    question: "How do I upload my notes?",
    answer: "You can go to the Upload section after logging in and choose files categorized by class and subject."
  },
  {
    question: "Is it free to use?",
    answer: "Yes! All features are completely free for students and educators."
  },
  {
    question: "How can I report incorrect content?",
    answer: "You can use the 'Report' button found next to any note or video."
  },
  {
    question: "Can I refer this to my friends?",
    answer: "Absolutely! We even offer referral bonuses for new signups through your link."
  }
];

export default function FaqPage() {
  return (
    <>
    <Nav />
    <div className="min-h-screen  flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h1>
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-md">
        <Accordion allowMultiple>
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} border="none">
              <h2>
                <AccordionButton
                  _expanded={{ bg: "blue.100", color: "blue.800" }}
                  className="rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  <Box as="span" flex="1" textAlign="left" className="text-lg font-medium text-gray-700">
                    {faq.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="text-gray-600">
                {faq.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
    </>
  );
}

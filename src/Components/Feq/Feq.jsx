import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import login from "../../assets/raq.json";
import { ChevronDown } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

const faqData = [
  {
    question: "How can I add my own recipe?",
    answer:
      "You need to log in first. Then go to the 'Add Recipe' page and fill in the required information.",
  },
  {
    question: "Can I edit or delete a recipe after adding it?",
    answer:
      "Yes, go to 'My Recipes' and click 'Edit' or 'Delete' next to your recipe.",
  },
  {
    question: "Do I need to log in to view recipes?",
    answer:
      "No, anyone can browse the recipes. But to add, like, or save them, login is required.",
  },
  {
    question: "Why can't I like my own recipe?",
    answer:
      "To keep interactions fair, liking your own content is restricted.",
  },
];

const Feq = () => {
  return (
    <section className="bg-gray-900 text-white px-6 py-10 flex flex-col items-center justify-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked{" "}
        <span className="text-orange-500">
          <Typewriter
            words={['Questions']}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </motion.h2>

      {/* Responsive Layout Container */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl items-center">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={login} loop={true} />
        </div>

        {/* Accordion */}
        <div className="w-full md:w-1/2">
          <Accordion allowZeroExpanded className="space-y-4">
            {faqData.map((item, idx) => (
              <AccordionItem
                key={idx}
                className="rounded-2xl border border-orange-500 overflow-hidden shadow-lg bg-gray-900"
              >
                <AccordionItemHeading>
                  <AccordionItemButton className="flex justify-between items-center p-5 text-left text-lg font-semibold text-orange-400 bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
                    {item.question}
                    <ChevronDown className="w-5 h-5 text-orange-400" />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <motion.div
                    className="p-5 bg-gray-900 text-orange-200 leading-relaxed"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </motion.div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Feq;

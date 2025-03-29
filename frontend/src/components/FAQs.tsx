"use client"
import { useState } from "react";
import PlusIcon from "../assets/icons/plus.svg";
import MinusIcon from "../assets/icons/minus.svg";
import clsx from "clsx";
import {motion , AnimatePresence} from 'framer-motion';

const items = [
  {
    question: "How does the one-click auto-apply feature work?",
    answer:
      "Our system uses your uploaded resume and job description to intelligently fill out forms and generate personalized cover letters and responses for each job application, saving you time and effort.",
  },
  {
    question: "What is the smart tracker?",
    answer:
      "The smart tracker helps you keep tabs on every job you’ve applied to. It records where you applied, what answers you submitted, and notifies you of any next steps or updates.",
  },
  {
    question: "How does the insider edge help me get referrals?",
    answer:
      "We show you current employees at the company you’re applying to and provide you with templates and strategies to reach out for referrals and interview advice. Networking made easy.",
  },
  {
    question: "What can I expect from the mock interviews?",
    answer:
      "You’ll practice behavioral and technical interviews powered by AI. After each session, you’ll receive personalized feedback to help you improve your answers and confidence.",
  },
];

const AccordinationItem = ({question, answer}:{question:string, answer: string}) => {
  const[isOpen, setIsOpen] = useState(false);
  return(
   
    <div className=" py-7 border-b border-white/30" onClick={() => setIsOpen(!isOpen)}>
    <div className="flex items-center ">
      <span className="flex-1 text-lg font-bold">{question}</span>
      {isOpen ? <MinusIcon /> :<PlusIcon />}
      
      </div>
      <AnimatePresence>
      {isOpen && (
        <motion.div 
        initial={{opacity: 0, height: 0, marginTop: 0}}
        animate={{opacity: 1, height: "auto" , marginTop:'16px'}}
        exit={{opacity: 0, height: 0, marginTop: 0}}
          >{answer}</motion.div>

      )}
      </AnimatePresence>
    
  </div>
  
    
  )
}

export const FAQs = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24 bg-gradient-to-b from-[#5D2CA8] to-black ">
      <div className="container">
        <h2 className="text-5xl sm:text-6xl sm:w-[648px] mx-auto text-center text-white tracking-tighter">
          Frequently Asked Questions
        </h2>
        <div className="mt-12 max-w-[648px] mx-auto">
         {items.map(({question, answer}) => (
            <AccordinationItem question={question} answer={answer} key={question}/>
         ))}
        </div>
      </div>
    </div>
  )
};

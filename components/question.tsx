"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const QUESTION_DATA = {
  title: "Quiz Question",
  question: "Which tag is used to define the main content of an HTML document?",
  options: [
    { value: "a", label: "<main>" },
    { value: "b", label: "<content>" },
    { value: "c", label: "<body>" },
    { value: "d", label: "<article>" },
  ],
  correctAnswer: "c",
};

type Option = {
  value: string;
  label: string;
};

type Question = {
  title: string;
  question: string;
  options: Option[];
  correctAnswer: string;
};

export function Question() {
  const [questionData, setQuestionData] = useState<Question>(QUESTION_DATA);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    setIsCorrect(selectedAnswer === "c");
  };

  return (
    <div className="mt-6 p-6 bg-muted rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{questionData.title}</h2>
      <p className="mb-4">{questionData.question}</p>
      <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
        {questionData.options.map((option, id) => {
          return (
            <div key={id} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          );
        })}
      </RadioGroup>
      <Button onClick={handleSubmit} disabled={!selectedAnswer}>
        Submit Answer
      </Button>
      {isCorrect !== null && (
        <p className={`mt-4 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
          {isCorrect ? "Correct!" : "Incorrect. Try again!"}
        </p>
      )}
    </div>
  );
}

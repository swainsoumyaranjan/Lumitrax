import React from "react";
import { Card, CardBody, CardFooter, Button, Progress, RadioGroup, Radio } from "@heroui/react";
import { Icon } from "@iconify/react";
import { quizQuestions } from "../data/passion-data";

interface PassionQuizProps {
  onComplete: (results: any) => void;
}

export const PassionQuiz: React.FC<PassionQuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = React.useState<string>("");
  
  const totalSteps = quizQuestions.length;
  const progress = Math.round((currentStep / totalSteps) * 100);
  const currentQuestion = quizQuestions[currentStep];
  
  const handleNext = () => {
    if (currentAnswer) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: currentAnswer
      });
      
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
        setCurrentAnswer("");
      } else {
        // Calculate results
        const results = calculateResults(answers);
        onComplete(results);
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentAnswer(answers[quizQuestions[currentStep - 1].id] || "");
    }
  };
  
  const calculateResults = (answers: Record<string, string>) => {
    // Simple scoring system based on answers
    const scores: Record<string, number> = {
      climate: 0,
      education: 0,
      healthcare: 0,
      equality: 0,
      poverty: 0,
      animal_rights: 0,
      arts_culture: 0
    };
    
    // Map answers to categories
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      if (!question) return;
      
      const option = question.options.find(opt => opt.id === answer);
      if (!option) return;
      
      option.categories.forEach(category => {
        scores[category] += option.weight;
      });
    });
    
    // Sort categories by score
    const sortedResults = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([category, score]) => ({
        category,
        score,
        percentage: Math.round((score / (Object.keys(answers).length * 10)) * 100)
      }));
    
    return sortedResults;
  };

  return (
    <Card className="border border-divider">
      <CardBody className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-small text-default-500">Question {currentStep + 1} of {totalSteps}</p>
            <p className="text-small text-default-500">{progress}% Complete</p>
          </div>
          <Progress 
            aria-label="Quiz progress" 
            value={progress} 
            color="primary" 
            className="h-2"
          />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
          
          <RadioGroup
            value={currentAnswer}
            onValueChange={setCurrentAnswer}
          >
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <Radio key={option.id} value={option.id}>
                  {option.text}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </div>
      </CardBody>
      <CardFooter className="justify-between">
        <Button
          variant="flat"
          onPress={handlePrevious}
          isDisabled={currentStep === 0}
          startContent={<Icon icon="lucide:arrow-left" width={16} height={16} />}
        >
          Previous
        </Button>
        <Button
          color="primary"
          onPress={handleNext}
          isDisabled={!currentAnswer}
          endContent={currentStep < totalSteps - 1 ? 
            <Icon icon="lucide:arrow-right" width={16} height={16} /> : 
            <Icon icon="lucide:check" width={16} height={16} />
          }
        >
          {currentStep < totalSteps - 1 ? "Next" : "Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
};
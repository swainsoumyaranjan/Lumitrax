import React from "react";
import { Card, CardBody, CardFooter, Button, Progress, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { passionCategories } from "../data/passion-data";

interface PassionResultProps {
  results: any[];
  onReset: () => void;
}

export const PassionResult: React.FC<PassionResultProps> = ({ results, onReset }) => {
  const topResults = results.slice(0, 3);
  
  return (
    <div className="space-y-6">
      <Card className="border border-divider">
        <CardBody className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Your Passion Profile</h2>
            <p className="text-default-600">
              Based on your responses, here are the causes that align with your values and interests.
            </p>
          </div>
          
          <div className="space-y-8">
            {topResults.map((result, index) => {
              const category = passionCategories.find(cat => cat.id === result.category);
              if (!category) return null;
              
              return (
                <div key={result.category} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-medium bg-${category.color}-100 w-fit`}>
                        <Icon icon={category.icon} className={`text-${category.color} text-lg`} />
                      </div>
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                    <Chip color={category.color as any} variant="flat">
                      {result.percentage}% Match
                    </Chip>
                  </div>
                  
                  <Progress 
                    aria-label={`${category.name} match`} 
                    value={result.percentage} 
                    color={category.color as any}
                    className="h-2"
                  />
                  
                  <p className="text-default-600 text-sm">{category.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.relatedTopics.slice(0, 5).map((topic) => (
                      <Chip key={topic} variant="flat" size="sm">{topic}</Chip>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
        <CardFooter className="flex-col gap-3">
          <div className="flex gap-3 w-full">
            <Button 
              as={Link}
              to="/content-library"
              color="primary"
              className="flex-1"
              endContent={<Icon icon="lucide:book-open" width={16} height={16} />}
            >
              Explore Content
            </Button>
            <Button 
              as={Link}
              to="/action-hub"
              color="secondary"
              className="flex-1"
              endContent={<Icon icon="lucide:rocket" width={16} height={16} />}
            >
              Take Action
            </Button>
          </div>
          <Button 
            variant="bordered" 
            onPress={onReset}
            startContent={<Icon icon="lucide:refresh-cw" width={16} height={16} />}
            className="w-full"
          >
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border border-divider bg-content2">
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold mb-3">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Learn More</h4>
                <p className="text-default-600 text-sm">
                  Explore our content library to deepen your understanding of these causes.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Connect</h4>
                <p className="text-default-600 text-sm">
                  Use our interactive map to find people and organizations working on these causes.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Take Action</h4>
                <p className="text-default-600 text-sm">
                  Visit the Action Hub to find opportunities to contribute to these causes.
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
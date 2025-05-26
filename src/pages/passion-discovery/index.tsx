import React from "react";
import { Card, CardBody, Button, Progress, Checkbox, CheckboxGroup, Chip, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { PassionQuiz } from "../../components/passion-quiz";
import { PassionResult } from "../../components/passion-result";
import { passionCategories } from "../../data/passion-data";
import { useTelegram } from "../../hooks/use-telegram"; // Add Telegram hook

export const PassionDiscoveryPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("quiz");
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  const [quizResults, setQuizResults] = React.useState<any>(null);
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>([]);
  
  // Add Telegram integration
  const { notifyAction } = useTelegram();
  
  const handleQuizComplete = async (results: any) => {
    setQuizResults(results);
    setQuizCompleted(true);
    setActiveTab("results");
    
    // Send notification to Telegram about completed quiz
    const topCategories = results.slice(0, 3).map((r: any) => {
      const category = passionCategories.find(cat => cat.id === r.category);
      return category ? category.name : r.category;
    });
    
    await notifyAction(
      "User", 
      "Completed Passion Discovery Quiz",
      `Top passions: ${topCategories.join(', ')}`
    );
  };
  
  const handleInterestsChange = (values: string[]) => {
    setSelectedInterests(values);
  };
  
  const handleTabChange = (key: React.Key) => {
    setActiveTab(key.toString());
  };
  
  const handleReset = () => {
    setQuizCompleted(false);
    setQuizResults(null);
    setActiveTab("quiz");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Passion Discovery</h1>
        <p className="text-default-600">
          Find the social causes that align with your values, interests, and skills.
        </p>
      </div>
      
      <Tabs 
        aria-label="Passion Discovery Options" 
        selectedKey={activeTab}
        onSelectionChange={handleTabChange}
        color="primary"
        variant="underlined"
      >
        <Tab key="quiz" title="Passion Quiz">
          {!quizCompleted ? (
            <PassionQuiz onComplete={handleQuizComplete} />
          ) : (
            <Card className="border border-divider">
              <CardBody className="text-center py-12">
                <Icon icon="lucide:check-circle" className="text-success text-5xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
                <p className="text-default-600 mb-6">
                  You've completed the passion discovery quiz. View your results to see which causes align with your values.
                </p>
                <div className="flex justify-center gap-4">
                  <Button 
                    color="primary" 
                    onPress={() => setActiveTab("results")}
                    endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
                  >
                    View Results
                  </Button>
                  <Button 
                    variant="bordered" 
                    onPress={handleReset}
                    startContent={<Icon icon="lucide:refresh-cw" width={16} height={16} />}
                  >
                    Retake Quiz
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </Tab>
        
        <Tab key="results" title="Your Results" isDisabled={!quizCompleted}>
          {quizCompleted && quizResults && (
            <PassionResult results={quizResults} onReset={handleReset} />
          )}
        </Tab>
        
        <Tab key="browse" title="Browse Causes">
          <div className="space-y-6">
            <Card className="border border-divider">
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Select Your Interests</h2>
                <CheckboxGroup
                  label="Choose topics that interest you"
                  value={selectedInterests}
                  onValueChange={handleInterestsChange}
                  className="gap-1"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {passionCategories.map((category) => (
                      <Checkbox key={category.id} value={category.id}>
                        {category.name}
                      </Checkbox>
                    ))}
                  </div>
                </CheckboxGroup>
              </CardBody>
            </Card>
            
            <div className="space-y-6">
              {selectedInterests.length > 0 ? (
                selectedInterests.map((interestId) => {
                  const category = passionCategories.find(cat => cat.id === interestId);
                  if (!category) return null;
                  
                  return (
                    <Card key={category.id} className="border border-divider">
                      <CardBody>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-3 rounded-medium bg-${category.color}-100 w-fit`}>
                            <Icon icon={category.icon} className={`text-${category.color} text-xl`} />
                          </div>
                          <h3 className="text-xl font-semibold">{category.name}</h3>
                        </div>
                        
                        <p className="text-default-600 mb-4">{category.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Related Topics</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.relatedTopics.map((topic) => (
                              <Chip key={topic} variant="flat" size="sm">{topic}</Chip>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            as={Link}
                            to={`/content-library?category=${category.id}`}
                            color={category.color as any}
                            variant="flat"
                            endContent={<Icon icon="lucide:book-open" width={16} height={16} />}
                          >
                            Learn More
                          </Button>
                          <Button 
                            as={Link}
                            to={`/action-hub?category=${category.id}`}
                            color={category.color as any}
                            endContent={<Icon icon="lucide:external-link" width={16} height={16} />}
                          >
                            Take Action
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })
              ) : (
                <Card className="border border-divider p-8 text-center">
                  <CardBody>
                    <Icon icon="lucide:search" className="mx-auto text-4xl text-default-400 mb-4" />
                    <h3 className="text-xl font-semibold">Select interests to explore</h3>
                    <p className="text-default-500">
                      Choose topics above to discover causes that match your interests.
                    </p>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
import React from "react";
import { Card, CardBody, CardFooter, Input, Button, Tabs, Tab, Chip, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ActionCard } from "../../components/action-card";
import { actionData } from "../../data/action-data";
import { useTelegram } from "../../hooks/use-telegram";

export const ActionHubPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  
  const filteredActions = actionData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  const categories = ["all", "climate", "education", "healthcare", "equality", "poverty", "animal_rights", "arts_culture"];
  const actionTypes = ["all", "volunteer", "donate", "campaign", "learn", "event"];

  // Add Telegram integration
  const { notifyAction } = useTelegram();
  
  // Add handler for action engagement
  const handleActionEngagement = async (action: any) => {
    // Send notification to Telegram
    await notifyAction(
      "User",
      `Engaged with action: ${action.title}`,
      `Organization: ${action.organizationName}, Type: ${action.type}`
    );
    
    // Open the action URL in a new tab
    window.open(action.actionUrl, '_blank');
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Action Hub</h1>
        <p className="text-default-600">
          Find opportunities to get involved and make a difference in causes you care about.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search for opportunities..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" className="text-default-400" />}
          className="md:max-w-md"
        />
        
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                endContent={<Icon icon="lucide:chevron-down" width={16} height={16} />}
              >
                {selectedCategory === "all" ? "All Categories" : 
                  selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace("_", " ")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Categories" 
              selectionMode="single" 
              selectedKeys={[selectedCategory]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0]?.toString();
                if (selected) setSelectedCategory(selected);
              }}
            >
              {categories.map((category) => (
                <DropdownItem key={category}>
                  {category === "all" ? "All Categories" : 
                    category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ")}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                endContent={<Icon icon="lucide:chevron-down" width={16} height={16} />}
              >
                {selectedType === "all" ? "All Types" : 
                  selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Action Types" 
              selectionMode="single" 
              selectedKeys={[selectedType]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0]?.toString();
                if (selected) setSelectedType(selected);
              }}
            >
              {actionTypes.map((type) => (
                <DropdownItem key={type}>
                  {type === "all" ? "All Types" : 
                    type.charAt(0).toUpperCase() + type.slice(1)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      
      <Tabs aria-label="Action Categories" color="primary" variant="underlined">
        <Tab key="featured" title="Featured">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredActions
              .filter(item => item.featured)
              .map(item => (
                <ActionCard 
                  key={item.id} 
                  action={item} 
                  onActionClick={handleActionEngagement} // Add handler
                />
              ))}
          </div>
        </Tab>
        <Tab key="local" title="Local Opportunities">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredActions
              .filter(item => item.isLocal)
              .map(item => (
                <ActionCard key={item.id} action={item} />
              ))}
          </div>
        </Tab>
        <Tab key="remote" title="Remote Opportunities">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredActions
              .filter(item => !item.isLocal)
              .map(item => (
                <ActionCard key={item.id} action={item} />
              ))}
          </div>
        </Tab>
        <Tab key="all" title="All Opportunities">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredActions.length > 0 ? (
              filteredActions.map(item => (
                <ActionCard key={item.id} action={item} />
              ))
            ) : (
              <Card className="col-span-full p-8 text-center">
                <CardBody>
                  <Icon icon="lucide:search-x" className="mx-auto text-4xl text-default-400 mb-4" />
                  <h3 className="text-xl font-semibold">No opportunities found</h3>
                  <p className="text-default-500">Try adjusting your search or filters.</p>
                </CardBody>
              </Card>
            )}
          </div>
        </Tab>
      </Tabs>
      
      <Card className="border border-divider bg-content2">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2">Submit Your Organization</h2>
              <p className="text-default-600 mb-4">
                Are you part of an organization working on social causes? Submit your information to be featured in our Action Hub.
              </p>
              <Button 
                color="primary" 
                endContent={<Icon icon="lucide:plus" width={16} height={16} />}
              >
                Submit Organization
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://img.heroui.chat/image/ai?w=400&h=300&u=20" 
                alt="Organization collaboration" 
                className="rounded-xl max-h-[200px] object-cover"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
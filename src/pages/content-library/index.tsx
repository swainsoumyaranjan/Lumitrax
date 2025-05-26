import React from "react";
import { Input, Tabs, Tab, Card, CardBody, Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ContentCard } from "../../components/content-card";
import { contentData } from "../../data/content-data";

export const ContentLibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState("all");
  
  const filteredContent = contentData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  const categories = ["all", "climate", "education", "healthcare", "equality", "poverty"];
  const contentTypes = ["all", "video", "article", "book", "report", "talk"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Content Library</h1>
        <p className="text-default-600">
          Discover curated resources to learn about social issues and causes.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search for content..."
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
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
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
                  {category.charAt(0).toUpperCase() + category.slice(1)}
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
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Content Types" 
              selectionMode="single" 
              selectedKeys={[selectedType]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0]?.toString();
                if (selected) setSelectedType(selected);
              }}
            >
              {contentTypes.map((type) => (
                <DropdownItem key={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      
      <Tabs aria-label="Content Categories" color="primary" variant="underlined">
        <Tab key="featured" title="Featured">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredContent
              .filter(item => item.featured)
              .map(item => (
                <ContentCard key={item.id} content={item} />
              ))}
          </div>
        </Tab>
        <Tab key="recent" title="Recent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredContent
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 6)
              .map(item => (
                <ContentCard key={item.id} content={item} />
              ))}
          </div>
        </Tab>
        <Tab key="popular" title="Popular">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredContent
              .sort((a, b) => b.views - a.views)
              .slice(0, 6)
              .map(item => (
                <ContentCard key={item.id} content={item} />
              ))}
          </div>
        </Tab>
        <Tab key="all" title="All Content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredContent.length > 0 ? (
              filteredContent.map(item => (
                <ContentCard key={item.id} content={item} />
              ))
            ) : (
              <Card className="col-span-full p-8 text-center">
                <CardBody>
                  <Icon icon="lucide:search-x" className="mx-auto text-4xl text-default-400 mb-4" />
                  <h3 className="text-xl font-semibold">No content found</h3>
                  <p className="text-default-500">Try adjusting your search or filters.</p>
                </CardBody>
              </Card>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
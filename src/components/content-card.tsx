import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ContentItem } from "../types/content";

interface ContentCardProps {
  content: ContentItem;
}

export const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return "lucide:video";
      case "article": return "lucide:file-text";
      case "book": return "lucide:book";
      case "report": return "lucide:clipboard";
      case "talk": return "lucide:mic";
      default: return "lucide:file";
    }
  };
  
  const getCategoryColor = (category: string): "primary" | "secondary" | "success" | "warning" | "danger" => {
    switch (category) {
      case "climate": return "success";
      case "education": return "primary";
      case "healthcare": return "secondary";
      case "equality": return "warning";
      case "poverty": return "danger";
      default: return "primary";
    }
  };

  return (
    <>
      <Card className="border border-divider h-full">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md font-semibold">{content.title}</p>
            <p className="text-small text-default-500">
              {new Date(content.date).toLocaleDateString()}
            </p>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0">
          <div className="h-[200px] mb-4 overflow-hidden rounded-lg">
            <img 
              src={content.image} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-default-600 line-clamp-2">{content.description}</p>
        </CardBody>
        <CardFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            <Chip
              size="sm"
              variant="flat"
              color={getCategoryColor(content.category)}
            >
              {content.category}
            </Chip>
            <Chip
              size="sm"
              variant="dot"
              color="default"
              startContent={<Icon icon={getTypeIcon(content.type)} width={14} height={14} />}
            >
              {content.type}
            </Chip>
          </div>
          <Button color="primary" variant="light" onPress={onOpen}>
            View
          </Button>
        </CardFooter>
      </Card>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {content.title}
              </ModalHeader>
              <ModalBody>
                <div className="h-[300px] mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={content.image} 
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 mb-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={getCategoryColor(content.category)}
                  >
                    {content.category}
                  </Chip>
                  <Chip
                    size="sm"
                    variant="dot"
                    color="default"
                    startContent={<Icon icon={getTypeIcon(content.type)} width={14} height={14} />}
                  >
                    {content.type}
                  </Chip>
                  <Chip
                    size="sm"
                    variant="flat"
                    color="default"
                    startContent={<Icon icon="lucide:eye" width={14} height={14} />}
                  >
                    {content.views.toLocaleString()} views
                  </Chip>
                </div>
                <p className="text-default-600 mb-4">{content.description}</p>
                <p className="text-default-600">{content.fullContent}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                  color="primary" 
                  href={content.url} 
                  as="a" 
                  target="_blank"
                  endContent={<Icon icon="lucide:external-link" width={16} height={16} />}
                >
                  Open Resource
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
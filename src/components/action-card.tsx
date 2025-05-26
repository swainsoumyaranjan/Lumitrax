import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Chip, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ActionItem } from "../types/action";

interface ActionCardProps {
  action: ActionItem;
  onActionClick?: (action: ActionItem) => void; // Add callback prop
}

export const ActionCard: React.FC<ActionCardProps> = ({ action, onActionClick }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "volunteer": return "lucide:helping-hand";
      case "donate": return "lucide:heart";
      case "campaign": return "lucide:megaphone";
      case "learn": return "lucide:book-open";
      case "event": return "lucide:calendar";
      default: return "lucide:info";
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

  // Add handler for action button
  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick(action);
    } else {
      window.open(action.actionUrl, '_blank');
    }
  };

  return (
    <>
      <Card className="border border-divider h-full">
        <CardHeader className="flex gap-3">
          <Avatar src={action.organizationLogo} size="sm" />
          <div className="flex flex-col">
            <p className="text-md font-semibold">{action.title}</p>
            <p className="text-small text-default-500">
              {action.organizationName}
            </p>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0">
          <p className="text-default-600 line-clamp-3">{action.description}</p>
        </CardBody>
        <CardFooter className="flex-col items-start gap-3">
          <div className="flex flex-wrap gap-2">
            <Chip
              size="sm"
              variant="flat"
              color={getCategoryColor(action.category)}
            >
              {action.category.replace("_", " ")}
            </Chip>
            <Chip
              size="sm"
              variant="dot"
              color="default"
              startContent={<Icon icon={getTypeIcon(action.type)} width={14} height={14} />}
            >
              {action.type}
            </Chip>
            {action.isLocal && (
              <Chip
                size="sm"
                variant="flat"
                color="default"
                startContent={<Icon icon="lucide:map-pin" width={14} height={14} />}
              >
                Local
              </Chip>
            )}
          </div>
          <Button color="primary" className="w-full" onPress={onOpen}>
            Get Involved
          </Button>
        </CardFooter>
      </Card>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action.title}
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar src={action.organizationLogo} size="lg" />
                  <div>
                    <h3 className="font-semibold">{action.organizationName}</h3>
                    <p className="text-small text-default-500">{action.location}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Chip
                    variant="flat"
                    color={getCategoryColor(action.category)}
                  >
                    {action.category.replace("_", " ")}
                  </Chip>
                  <Chip
                    variant="dot"
                    color="default"
                    startContent={<Icon icon={getTypeIcon(action.type)} width={14} height={14} />}
                  >
                    {action.type}
                  </Chip>
                  {action.isLocal && (
                    <Chip
                      variant="flat"
                      color="default"
                      startContent={<Icon icon="lucide:map-pin" width={14} height={14} />}
                    >
                      Local Opportunity
                    </Chip>
                  )}
                </div>
                
                <p className="text-default-600 mb-4">{action.fullDescription}</p>
                
                {action.requirements && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {action.requirements.map((req, index) => (
                        <li key={index} className="text-default-600">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {action.impact && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Impact</h4>
                    <p className="text-default-600">{action.impact}</p>
                  </div>
                )}
                
                {action.deadline && (
                  <div className="flex items-center gap-2 text-danger">
                    <Icon icon="lucide:clock" width={16} height={16} />
                    <p className="font-semibold">Deadline: {action.deadline}</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleActionClick} // Use new handler
                  endContent={<Icon icon="lucide:external-link" width={16} height={16} />}
                >
                  {action.actionLabel || "Get Involved"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
import React from "react";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: "primary" | "secondary" | "success" | "warning" | "danger" | "default";
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  path,
  color
}) => {
  return (
    <Card className="border border-divider">
      <CardBody className="gap-4">
        <div className={`p-3 rounded-medium bg-${color}-100 w-fit`}>
          <Icon icon={icon} className={`text-${color} text-xl`} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-default-500">{description}</p>
        </div>
      </CardBody>
      <CardFooter>
        <Button 
          as={Link} 
          to={path} 
          color={color} 
          variant="flat" 
          endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
          className="w-full"
        >
          Explore
        </Button>
      </CardFooter>
    </Card>
  );
};
import React from "react";
import { Card, CardBody, CardFooter, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  avatar
}) => {
  return (
    <Card className="border border-divider">
      <CardBody>
        <div className="mb-4">
          <Icon icon="lucide:quote" className="text-primary text-xl" />
        </div>
        <p className="text-default-600">{content}</p>
      </CardBody>
      <CardFooter className="flex items-center gap-3">
        <Avatar src={avatar} size="sm" />
        <div>
          <p className="font-semibold text-small">{name}</p>
          <p className="text-tiny text-default-500">{role}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
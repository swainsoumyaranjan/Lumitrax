import React from "react";
import { Card, CardBody, Avatar, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface MapUserCardProps {
  user: any;
  onClick: () => void;
}

export const MapUserCard: React.FC<MapUserCardProps> = ({ user, onClick }) => {
  return (
    <Card className="border border-divider">
      <CardBody>
        <div className="flex gap-4">
          <Avatar src={user.avatar} />
          <div className="flex-1 space-y-1">
            <div className="flex justify-between">
              <h3 className="font-semibold">{user.name}</h3>
              <span className="text-xs text-default-500 flex items-center gap-1">
                <Icon icon="lucide:map-pin" width={12} height={12} />
                {user.location}
              </span>
            </div>
            <p className="text-xs text-default-600 line-clamp-2">{user.bio}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {user.interests.slice(0, 3).map((interest: string) => (
                <Chip key={interest} size="sm" variant="flat">
                  {interest}
                </Chip>
              ))}
              {user.interests.length > 3 && (
                <Chip size="sm" variant="flat">+{user.interests.length - 3}</Chip>
              )}
            </div>
          </div>
        </div>
        <Button 
          size="sm" 
          color="primary" 
          variant="flat" 
          className="w-full mt-3"
          onPress={onClick}
        >
          View Profile
        </Button>
      </CardBody>
    </Card>
  );
};
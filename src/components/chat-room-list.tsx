import React from "react";
import { Card, CardBody, Input, Avatar, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  category: string;
}

interface ChatRoomListProps {
  rooms: ChatRoom[];
  activeRoom: ChatRoom;
  onRoomChange: (room: ChatRoom) => void;
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({ 
  rooms, 
  activeRoom, 
  onRoomChange 
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Card className="h-[600px] border border-divider">
      <CardBody className="p-0">
        <div className="p-3 border-b border-divider">
          <Input
            placeholder="Search rooms..."
            size="sm"
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Icon icon="lucide:search" className="text-default-400" width={16} height={16} />}
          />
        </div>
        
        <div className="overflow-y-auto h-[calc(600px-56px)]">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div 
                key={room.id}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-content2 transition-colors ${
                  activeRoom.id === room.id ? 'bg-content2' : ''
                }`}
                onClick={() => onRoomChange(room)}
              >
                <Avatar src={room.avatar} size="sm" />
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-small truncate">{room.name}</h3>
                    <span className="text-tiny text-default-500">{room.memberCount}</span>
                  </div>
                  <p className="text-tiny text-default-500 truncate">{room.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-default-500">No rooms found</p>
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-divider">
          <Button 
            color="primary" 
            size="sm" 
            className="w-full"
            startContent={<Icon icon="lucide:plus" width={16} height={16} />}
          >
            Join New Room
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
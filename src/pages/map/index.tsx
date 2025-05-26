import React from "react";
import { Card, CardBody, Input, Button, Avatar, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import { mapUserData } from "../../data/map-data";
import { MapUserCard } from "../../components/map-user-card";

export const MapPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCause, setSelectedCause] = React.useState<string | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const causes = ["Climate", "Education", "Healthcare", "Equality", "Poverty", "Animal Rights", "Arts & Culture"];
  
  const filteredUsers = mapUserData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCause = !selectedCause || user.interests.includes(selectedCause.toLowerCase());
    
    return matchesSearch && matchesCause;
  });
  
  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    onOpen();
  };

  const createClusterIcon = (count: number) => {
    return divIcon({
      html: `<div class="bg-primary text-white rounded-full flex items-center justify-center" style="width: 30px; height: 30px;">${count}</div>`,
      className: '',
      iconSize: [30, 30]
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Interactive Map</h1>
        <p className="text-default-600">
          Connect with like-minded individuals locally and globally who share your interests.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name or location..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" className="text-default-400" />}
          className="md:max-w-md"
        />
        
        <div className="flex flex-wrap gap-2">
          {causes.map((cause) => (
            <Chip 
              key={cause}
              color={selectedCause === cause ? "primary" : "default"}
              variant={selectedCause === cause ? "solid" : "bordered"}
              onClose={selectedCause === cause ? () => setSelectedCause(null) : undefined}
              onClick={() => setSelectedCause(selectedCause === cause ? null : cause)}
              className="cursor-pointer"
            >
              {cause}
            </Chip>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardBody className="p-0">
              <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredUsers.map((user) => (
                  <Marker 
                    key={user.id} 
                    position={[user.coordinates.lat, user.coordinates.lng]}
                    icon={createClusterIcon(1)}
                  >
                    <Popup>
                      <div className="flex flex-col gap-2 p-1">
                        <div className="flex items-center gap-2">
                          <Avatar src={user.avatar} size="sm" />
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-default-500">{user.location}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {user.interests.slice(0, 2).map((interest: string) => (
                            <Chip key={interest} size="sm" variant="flat">
                              {interest}
                            </Chip>
                          ))}
                          {user.interests.length > 2 && (
                            <Chip size="sm" variant="flat">+{user.interests.length - 2}</Chip>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          color="primary" 
                          variant="flat"
                          onPress={() => handleUserClick(user)}
                        >
                          View Profile
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </CardBody>
          </Card>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">People Near You</h2>
            <Chip color="primary" variant="flat">
              {filteredUsers.length} found
            </Chip>
          </div>
          
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <MapUserCard 
                  key={user.id} 
                  user={user} 
                  onClick={() => handleUserClick(user)} 
                />
              ))
            ) : (
              <Card className="p-6 text-center">
                <CardBody>
                  <Icon icon="lucide:users-x" className="mx-auto text-4xl text-default-400 mb-4" />
                  <h3 className="text-xl font-semibold">No users found</h3>
                  <p className="text-default-500">Try adjusting your search or filters.</p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User Profile
              </ModalHeader>
              <ModalBody>
                {selectedUser && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <Avatar src={selectedUser.avatar} className="w-24 h-24" />
                      <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <Icon icon="lucide:map-pin" className="text-default-500" />
                          <span className="text-default-600">{selectedUser.location}</span>
                        </div>
                        <p className="text-default-600">{selectedUser.bio}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.interests.map((interest: string) => (
                          <Chip key={interest} color="primary" variant="flat">
                            {interest}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Projects</h3>
                      <div className="space-y-3">
                        {selectedUser.projects.map((project: any) => (
                          <Card key={project.name} className="border border-divider">
                            <CardBody>
                              <h4 className="font-semibold">{project.name}</h4>
                              <p className="text-default-600 text-sm">{project.description}</p>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                  color="primary" 
                  endContent={<Icon icon="lucide:message-square" width={16} height={16} />}
                >
                  Connect
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
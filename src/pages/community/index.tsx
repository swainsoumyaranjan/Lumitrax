import React from "react";
import { Card, CardBody, Input, Button, Avatar, Tabs, Tab, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ChatMessage } from "../../components/chat-message";
import { ChatRoomList } from "../../components/chat-room-list";
import { chatRooms, chatMessages } from "../../data/chat-data";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useMatrix } from "../../hooks/use-matrix";
import { useTelegram } from "../../hooks/use-telegram";

export const CommunityPage: React.FC = () => {
  const [activeRoom, setActiveRoom] = React.useState(chatRooms[0]);
  const [message, setMessage] = React.useState("");
  const [roomMessages, setRoomMessages] = React.useState<any[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Add Matrix integration
  const { 
    isLoggedIn, 
    login, 
    logout, 
    isLoading, 
    error, 
    rooms, 
    getMessages, 
    sendMessage 
  } = useMatrix();
  
  // Add Telegram integration
  const { notifyMessage } = useTelegram();
  
  // Add Matrix login state
  const [showMatrixLogin, setShowMatrixLogin] = React.useState(false);
  const [matrixUsername, setMatrixUsername] = React.useState("");
  const [matrixPassword, setMatrixPassword] = React.useState("");
  
  React.useEffect(() => {
    // Filter messages for the active room
    const filteredMessages = chatMessages.filter(msg => msg.roomId === activeRoom.id);
    setRoomMessages(filteredMessages);
    
    // Scroll to bottom of messages
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [activeRoom]);
  
  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        id: `msg-${Date.now()}`,
        roomId: activeRoom.id,
        sender: {
          id: "current-user",
          name: "You",
          avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
        },
        content: message,
        timestamp: new Date().toISOString(),
        isCurrentUser: true
      };
      
      setRoomMessages([...roomMessages, newMessage]);
      setMessage("");
      
      // Send notification to Telegram
      await notifyMessage("You", activeRoom.name, message);
      
      // If Matrix is connected and room has Matrix ID, send there too
      if (isLoggedIn && activeRoom.matrixRoomId) {
        await sendMessage(activeRoom.matrixRoomId, message);
      }
      
      // Scroll to bottom after sending
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Add Matrix login handler
  const handleMatrixLogin = async () => {
    if (matrixUsername && matrixPassword) {
      const success = await login(matrixUsername, matrixPassword);
      if (success) {
        setShowMatrixLogin(false);
        setMatrixPassword(""); // Clear password for security
      }
    }
  };
  
  // Add Matrix message sending
  const handleSendMatrixMessage = async () => {
    if (message.trim() && isLoggedIn && activeRoom.matrixRoomId) {
      const success = await sendMessage(activeRoom.matrixRoomId, message);
      if (success) {
        // Add message to local state for immediate feedback
        const newMessage = {
          id: `msg-${Date.now()}`,
          roomId: activeRoom.id,
          sender: {
            id: "current-user",
            name: "You",
            avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
          },
          content: message,
          timestamp: new Date().toISOString(),
          isCurrentUser: true
        };
        
        setRoomMessages([...roomMessages, newMessage]);
        setMessage("");
        
        // Scroll to bottom after sending
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // Fall back to local message handling if not using Matrix
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Community Chat</h1>
        <p className="text-default-600">
          Connect with others who share your interests and passions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ChatRoomList 
            rooms={chatRooms} 
            activeRoom={activeRoom} 
            onRoomChange={setActiveRoom} 
          />
        </div>
        
        <div className="lg:col-span-3">
          <Card className="h-[600px] border border-divider">
            <CardBody className="p-0 flex flex-col">
              <div className="border-b border-divider p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={activeRoom.avatar} size="sm" />
                    <div>
                      <h3 className="font-semibold">{activeRoom.name}</h3>
                      <p className="text-tiny text-default-500">{activeRoom.memberCount} members</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button isIconOnly variant="light" size="sm">
                      <Icon icon="lucide:users" width={18} height={18} />
                    </Button>
                    <Button isIconOnly variant="light" size="sm">
                      <Icon icon="lucide:info" width={18} height={18} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4">
                <div className="space-y-4">
                  {roomMessages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className="border-t border-divider p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onValueChange={setMessage}
                    onKeyPress={handleKeyPress}
                    endContent={
                      <div className="flex gap-2">
                        <Button isIconOnly variant="light" size="sm">
                          <Icon icon="lucide:smile" width={18} height={18} />
                        </Button>
                        <Button isIconOnly variant="light" size="sm">
                          <Icon icon="lucide:paperclip" width={18} height={18} />
                        </Button>
                      </div>
                    }
                  />
                  <Button 
                    color="primary" 
                    isIconOnly
                    onPress={handleSendMatrixMessage}
                    isDisabled={!message.trim()}
                  >
                    <Icon icon="lucide:send" width={18} height={18} />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      
      {/* Add Matrix login modal */}
      <Modal isOpen={showMatrixLogin} onOpenChange={() => setShowMatrixLogin(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Connect to Matrix
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Username"
                  placeholder="Enter your Matrix username"
                  value={matrixUsername}
                  onValueChange={setMatrixUsername}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={matrixPassword}
                  onValueChange={setMatrixPassword}
                />
                {error && (
                  <p className="text-danger text-sm">{error}</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleMatrixLogin}
                  isLoading={isLoading}
                  isDisabled={!matrixUsername || !matrixPassword}
                >
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      {/* Add Matrix connection button */}
      <Card className="border border-divider bg-content2">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2">Connect with Matrix</h2>
              <p className="text-default-600 mb-4">
                Enhance your community experience by connecting with Matrix.org, an open protocol for secure, decentralized communication.
              </p>
              <Button 
                color="primary" 
                onPress={() => setShowMatrixLogin(true)}
                endContent={<Icon icon="lucide:link" width={16} height={16} />}
                isDisabled={isLoggedIn}
              >
                {isLoggedIn ? "Connected to Matrix" : "Connect to Matrix"}
              </Button>
              {isLoggedIn && (
                <Button 
                  color="danger" 
                  variant="light"
                  onPress={logout}
                  className="ml-2"
                >
                  Disconnect
                </Button>
              )}
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://img.heroui.chat/image/ai?w=400&h=300&u=22" 
                alt="Secure communication" 
                className="rounded-xl max-h-[200px] object-cover"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
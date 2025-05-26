import React from "react";
import { matrixService } from "../services/matrix-service";

export function useMatrix() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [rooms, setRooms] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  // Login to Matrix
  const login = React.useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await matrixService.login(username, password);
      
      if (result.success && result.userId) {
        setIsLoggedIn(true);
        setUserId(result.userId);
        
        // Load rooms after login
        const userRooms = await matrixService.getRooms();
        setRooms(userRooms);
        
        return true;
      } else {
        setError(result.error || "Login failed");
        return false;
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Logout from Matrix
  const logout = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await matrixService.logout();
      
      if (success) {
        setIsLoggedIn(false);
        setUserId(null);
        setRooms([]);
        return true;
      } else {
        setError("Logout failed");
        return false;
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Get messages from a room
  const getMessages = React.useCallback(async (roomId: string, limit: number = 50) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const messages = await matrixService.getMessages(roomId, limit);
      return messages;
    } catch (err) {
      setError(err.message || "Failed to fetch messages");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Send a message to a room
  const sendMessage = React.useCallback(async (roomId: string, content: string) => {
    setError(null);
    
    try {
      const success = await matrixService.sendMessage(roomId, content);
      return success;
    } catch (err) {
      setError(err.message || "Failed to send message");
      return false;
    }
  }, []);
  
  // Create a new room
  const createRoom = React.useCallback(async (name: string, isPublic: boolean = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const roomId = await matrixService.createRoom(name, isPublic);
      
      if (roomId) {
        // Refresh rooms list
        const userRooms = await matrixService.getRooms();
        setRooms(userRooms);
        return roomId;
      } else {
        setError("Failed to create room");
        return null;
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Invite a user to a room
  const inviteToRoom = React.useCallback(async (roomId: string, userId: string) => {
    setError(null);
    
    try {
      const success = await matrixService.inviteToRoom(roomId, userId);
      return success;
    } catch (err) {
      setError(err.message || "Failed to invite user");
      return false;
    }
  }, []);
  
  // Refresh rooms list
  const refreshRooms = React.useCallback(async () => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const userRooms = await matrixService.getRooms();
      setRooms(userRooms);
    } catch (err) {
      setError(err.message || "Failed to refresh rooms");
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);
  
  return {
    isLoggedIn,
    userId,
    rooms,
    isLoading,
    error,
    login,
    logout,
    getMessages,
    sendMessage,
    createRoom,
    inviteToRoom,
    refreshRooms
  };
}

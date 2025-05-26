import React from 'react';
import { telegramService } from '../services/telegram-service';

export function useTelegram() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  // Send a general notification
  const sendNotification = React.useCallback(async (message: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await telegramService.sendMessage(message);
      return result.success;
    } catch (err) {
      setError(err.message || 'Failed to send notification');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Notify about a user action
  const notifyAction = React.useCallback(async (username: string, action: string, details?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await telegramService.sendActionNotification(username, action, details);
      return success;
    } catch (err) {
      setError(err.message || 'Failed to send action notification');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Notify about a new message
  const notifyMessage = React.useCallback(async (username: string, roomName: string, messagePreview: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await telegramService.sendMessageNotification(username, roomName, messagePreview);
      return success;
    } catch (err) {
      setError(err.message || 'Failed to send message notification');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Notify about a new user registration
  const notifyNewUser = React.useCallback(async (username: string, interests: string[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await telegramService.sendNewUserNotification(username, interests);
      return success;
    } catch (err) {
      setError(err.message || 'Failed to send new user notification');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    isLoading,
    error,
    sendNotification,
    notifyAction,
    notifyMessage,
    notifyNewUser
  };
}

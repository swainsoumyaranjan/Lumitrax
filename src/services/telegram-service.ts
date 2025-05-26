import axios from 'axios';

/**
 * Telegram Bot Service for sending notifications
 */
export class TelegramService {
  private token: string;
  private chatId: string;
  private apiUrl: string;
  
  constructor(token: string, chatId: string) {
    this.token = token;
    this.chatId = chatId;
    this.apiUrl = `https://api.telegram.org/bot${token}`;
  }
  
  /**
   * Send a text message to the configured chat
   * @param message Message text to send
   * @returns Success status and message ID if successful
   */
  async sendMessage(message: string): Promise<{ success: boolean; messageId?: number; error?: string }> {
    try {
      const response = await axios.post(`${this.apiUrl}/sendMessage`, {
        chat_id: this.chatId,
        text: message,
        parse_mode: 'HTML'
      });
      
      if (response.data && response.data.ok) {
        return {
          success: true,
          messageId: response.data.result.message_id
        };
      } else {
        return {
          success: false,
          error: 'Failed to send message'
        };
      }
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return {
        success: false,
        error: error.response?.data?.description || error.message || 'Unknown error'
      };
    }
  }
  
  /**
   * Send a notification about a new user action
   * @param username User who performed the action
   * @param action Action description
   * @param details Additional details
   */
  async sendActionNotification(username: string, action: string, details?: string): Promise<boolean> {
    const message = `
<b>New User Action</b>
<b>User:</b> ${username}
<b>Action:</b> ${action}
${details ? `<b>Details:</b> ${details}` : ''}
<b>Time:</b> ${new Date().toLocaleString()}
`;
    
    const result = await this.sendMessage(message);
    return result.success;
  }
  
  /**
   * Send a notification about a new community message
   * @param username User who sent the message
   * @param roomName Room where the message was sent
   * @param messagePreview Preview of the message content
   */
  async sendMessageNotification(username: string, roomName: string, messagePreview: string): Promise<boolean> {
    const message = `
<b>New Community Message</b>
<b>User:</b> ${username}
<b>Room:</b> ${roomName}
<b>Message:</b> ${messagePreview.length > 100 ? messagePreview.substring(0, 97) + '...' : messagePreview}
<b>Time:</b> ${new Date().toLocaleString()}
`;
    
    const result = await this.sendMessage(message);
    return result.success;
  }
  
  /**
   * Send a notification about a new user registration
   * @param username New user's name
   * @param interests User's selected interests
   */
  async sendNewUserNotification(username: string, interests: string[]): Promise<boolean> {
    const message = `
<b>New User Registration</b>
<b>User:</b> ${username}
<b>Interests:</b> ${interests.join(', ')}
<b>Time:</b> ${new Date().toLocaleString()}
`;
    
    const result = await this.sendMessage(message);
    return result.success;
  }
}

// Create and export a singleton instance with the provided token and chat ID
export const telegramService = new TelegramService(
  '7883292217:AAF0paNwkHAT-jhtFkWeh0yNLbUDhkkqZbQ',
  '7668454529'
);

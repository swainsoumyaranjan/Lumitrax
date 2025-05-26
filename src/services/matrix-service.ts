import * as sdk from "matrix-js-sdk";

// Matrix.org integration service
export class MatrixService {
  private client: any;
  private isInitialized: boolean = false;
  private homeserverUrl: string;
  
  constructor(homeserverUrl: string = "https://matrix.org") {
    this.homeserverUrl = homeserverUrl;
  }
  
  /**
   * Initialize the Matrix client
   * @param accessToken User's access token
   * @param userId User's Matrix ID
   */
  async initialize(accessToken: string, userId: string): Promise<boolean> {
    try {
      this.client = sdk.createClient({
        baseUrl: this.homeserverUrl,
        accessToken,
        userId
      });
      
      await this.client.startClient({ initialSyncLimit: 10 });
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error("Failed to initialize Matrix client:", error);
      return false;
    }
  }
  
  /**
   * Login to Matrix server
   * @param username Username
   * @param password Password
   */
  async login(username: string, password: string): Promise<{success: boolean, userId?: string, accessToken?: string, error?: string}> {
    try {
      const tempClient = sdk.createClient({ baseUrl: this.homeserverUrl });
      const response = await tempClient.login("m.login.password", {
        user: username,
        password: password
      });
      
      if (response.access_token && response.user_id) {
        await this.initialize(response.access_token, response.user_id);
        return {
          success: true,
          userId: response.user_id,
          accessToken: response.access_token
        };
      } else {
        return {
          success: false,
          error: "Invalid response from server"
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Login failed"
      };
    }
  }
  
  /**
   * Get all rooms the user is in
   */
  async getRooms(): Promise<any[]> {
    if (!this.isInitialized) {
      throw new Error("Matrix client not initialized");
    }
    
    return this.client.getRooms();
  }
  
  /**
   * Get messages from a specific room
   * @param roomId Room ID
   * @param limit Maximum number of messages to retrieve
   */
  async getMessages(roomId: string, limit: number = 50): Promise<any[]> {
    if (!this.isInitialized) {
      throw new Error("Matrix client not initialized");
    }
    
    const room = this.client.getRoom(roomId);
    if (!room) {
      throw new Error("Room not found");
    }
    
    // Get timeline events
    const timelineEvents = room.getLiveTimeline().getEvents();
    
    // Filter for message events and convert to a simpler format
    return timelineEvents
      .filter(event => event.getType() === "m.room.message")
      .slice(-limit)
      .map(event => ({
        id: event.getId(),
        sender: event.getSender(),
        content: event.getContent(),
        timestamp: event.getDate(),
        roomId
      }));
  }
  
  /**
   * Send a message to a room
   * @param roomId Room ID
   * @param content Message content
   */
  async sendMessage(roomId: string, content: string): Promise<boolean> {
    if (!this.isInitialized) {
      throw new Error("Matrix client not initialized");
    }
    
    try {
      await this.client.sendTextMessage(roomId, content);
      return true;
    } catch (error) {
      console.error("Failed to send message:", error);
      return false;
    }
  }
  
  /**
   * Create a new room
   * @param name Room name
   * @param isPublic Whether the room is public
   */
  async createRoom(name: string, isPublic: boolean = false): Promise<string | null> {
    if (!this.isInitialized) {
      throw new Error("Matrix client not initialized");
    }
    
    try {
      const response = await this.client.createRoom({
        visibility: isPublic ? "public" : "private",
        name
      });
      
      return response.room_id;
    } catch (error) {
      console.error("Failed to create room:", error);
      return null;
    }
  }
  
  /**
   * Invite a user to a room
   * @param roomId Room ID
   * @param userId User ID to invite
   */
  async inviteToRoom(roomId: string, userId: string): Promise<boolean> {
    if (!this.isInitialized) {
      throw new Error("Matrix client not initialized");
    }
    
    try {
      await this.client.invite(roomId, userId);
      return true;
    } catch (error) {
      console.error("Failed to invite user:", error);
      return false;
    }
  }
  
  /**
   * Logout from Matrix server
   */
  async logout(): Promise<boolean> {
    if (!this.isInitialized) {
      return true;
    }
    
    try {
      await this.client.logout();
      this.client.stopClient();
      this.isInitialized = false;
      return true;
    } catch (error) {
      console.error("Failed to logout:", error);
      return false;
    }
  }
}

// Export singleton instance
export const matrixService = new MatrixService(
  import.meta.env.VITE_MATRIX_HOMESERVER || "https://matrix.org"
);

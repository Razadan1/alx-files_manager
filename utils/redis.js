import { createClient } from 'redis';

class RedisClient {
  constructor() {
    // Create Redis client
    this.client = createClient();

    // Handle errors
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    // Connect to Redis
    this.client.connect().catch((err) => console.error('Redis connection failed:', err));
  }

  // Check if Redis is alive
  isAlive() {
    return this.client.isReady;
  }

  // Get value by key
  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error('Error getting key from Redis:', err);
      return null;
    }
  }

  // Set value with expiration
  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
    } catch (err) {
      console.error('Error setting key in Redis:', err);
    }
  }

  // Delete key
  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error('Error deleting key from Redis:', err);
    }
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;

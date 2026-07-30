import { createContext, useEffect, useRef, useState } from 'react';

export const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeData, setRealtimeData] = useState({});
  const wsRef = useRef(null);

  useEffect(() => {
    // Simulate WebSocket connection
    // In production, connect to actual WebSocket server
    const connect = () => {
      try {
        // For demo, we'll use a mock WebSocket simulation
        setIsConnected(true);

        // Simulate receiving real-time updates
        const interval = setInterval(() => {
          setRealtimeData((prev) => ({
            ...prev,
            timestamp: new Date().toISOString(),
            activeUsers: Math.floor(Math.random() * 5000) + 8000,
            habitCompletions: Math.floor(Math.random() * 100) + 50,
          }));
        }, 5000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('WebSocket connection failed:', error);
        setIsConnected(false);
      }
    };

    const cleanup = connect();
    return cleanup;
  }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, realtimeData }}>
      {children}
    </WebSocketContext.Provider>
  );
}

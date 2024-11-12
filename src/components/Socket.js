import { useEffect } from 'react';

const usePdfSocket = (onMessage) => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/pdf/');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    return () => socket.close();
  }, [onMessage]);
};

export default usePdfSocket;

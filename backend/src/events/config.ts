export const SOCKET_CONFIG = {
  PORT: 81,
  OPTIONS: {
    transports: ['websocket', 'polling'],
    path: '/server',
    credentials: true,
  },
};

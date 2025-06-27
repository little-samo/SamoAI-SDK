export const LocationEnvironment = {
  CHAT: 'CHAT',
  AGENT_HELPER: 'AGENT_HELPER',
  LOCATION_HELPER: 'LOCATION_HELPER',
  WEB_BROWSER: 'WEB_BROWSER',
  VIDEO_GAME: 'VIDEO_GAME',
} as const;

export type LocationEnvironment =
  (typeof LocationEnvironment)[keyof typeof LocationEnvironment];

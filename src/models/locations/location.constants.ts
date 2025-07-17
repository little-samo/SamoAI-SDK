export const LocationPlatform = {
  API: 'API',
  MINIMO: 'MINIMO',
} as const;
export type LocationPlatform =
  (typeof LocationPlatform)[keyof typeof LocationPlatform];

export const LocationType = {
  PRIVATE: 'PRIVATE',
  GROUP: 'GROUP',
  PUBLIC: 'PUBLIC',
  SYSTEM: 'SYSTEM',
} as const;

export type LocationType = (typeof LocationType)[keyof typeof LocationType];

export const LocationEnvironment = {
  CHAT: 'CHAT',
  AGENT_HELPER: 'AGENT_HELPER',
  LOCATION_HELPER: 'LOCATION_HELPER',
  AGENT_DM: 'AGENT_DM',
  WEB_BROWSER: 'WEB_BROWSER',
  VIDEO_GAME: 'VIDEO_GAME',
} as const;

export type LocationEnvironment =
  (typeof LocationEnvironment)[keyof typeof LocationEnvironment];

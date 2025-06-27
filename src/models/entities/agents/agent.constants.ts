export const AgentHelperType = {
  SAMO: 'SAMO',
} as const;

export type AgentHelperType =
  (typeof AgentHelperType)[keyof typeof AgentHelperType];

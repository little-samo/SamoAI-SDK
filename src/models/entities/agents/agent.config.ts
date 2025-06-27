import { z } from 'zod';

export const PREDEFINED_AVATARS: Record<string, string> = {
  Mimo: 'A lively 2D cartoon-style character with a square-shaped coral-pink body, bright round eyes, small energetic arms, and cute green ears. Radiates intelligence and confidence.',
  Tamo: 'A vibrant 2D cartoon-style character with a sky-blue rounded body, wide curious eyes, energetic arms raised high, and playful yellow horns. Embodies bravery and enthusiasm.',
  Zemo: 'A sleek, calm-looking 2D cartoon character with a deep-blue angular body, half-closed eyes suggesting skepticism, and small orange spikes on top. Portrays intelligence and analytical sharpness.',
  Marimo:
    'A gentle, soft-looking 2D cartoon character with a round lime-green body, large innocent eyes, raised curved arms, and a small blue sprout on top. Expresses innocence and curiosity.',
  Casimo:
    'An eccentric, quirky 2D cartoon character with a pinkish body, mischievous half-closed eyes, flexible arms in playful positions, and teal spikes on her head. Exudes unpredictability and whimsy.',
};

export const AgentConfigCoreSchema = z.object({
  name: z.union([
    z
      .literal('evaluate_and_actions')
      .describe(
        'Evaluates conditions and context before taking actions. Best for thoughtful, context-aware responses that require analysis of the situation before acting.'
      ),
    z
      .literal('execute_actions')
      .describe(
        'Executes actions immediately without preliminary evaluation. Best for reactive agents that should respond quickly without extensive analysis.'
      ),
    z
      .literal('response_every_message')
      .describe(
        'Responds to every new message in the location. Best for conversational agents that should actively participate in all discussions.'
      ),
  ]),
});

export type AgentConfigCore = z.infer<typeof AgentConfigCoreSchema>;

const CharacterPropertySchema = z.string().max(500).optional();

const CharacterBackgroundSchema = z
  .object({
    role: CharacterPropertySchema.describe(
      "Agent's primary role or profession (e.g., 'professor', 'assistant', 'coach', 'mentor'). This shapes how they approach interactions and what expertise they offer."
    ),
    gender: CharacterPropertySchema.describe(
      'Gender identity of the agent, which may influence their communication style and perspective.'
    ),
    expertise: CharacterPropertySchema.describe(
      "Specific areas of knowledge or skills (e.g., 'machine learning', 'creative writing', 'financial planning'). Determines what topics the agent can provide authoritative guidance on."
    ),
    backstory: CharacterPropertySchema.describe(
      'Personal history and experiences that shaped the agent. This background informs their worldview, reactions, and decision-making patterns.'
    ),
    birthDate: CharacterPropertySchema.describe(
      'Birth date in YYYY-MM-DD format'
    ),
    occupation: CharacterPropertySchema.describe('Current or past occupation'),
  })
  .catchall(CharacterPropertySchema)
  .optional();

const CharacterSpeechSchema = z
  .object({
    tone: CharacterPropertySchema.describe(
      "Overall emotional quality of communication (e.g., 'friendly', 'formal', 'enthusiastic', 'calm'). Affects how messages are perceived by others."
    ),
    style: CharacterPropertySchema.describe(
      "Conversation approach and structure (e.g., 'concise', 'detailed', 'humorous', 'analytical'). Determines message length and information density."
    ),
    formality: CharacterPropertySchema.describe(
      "Level of formal language usage (e.g., 'casual', 'professional', 'academic'). Affects vocabulary choice and sentence structure."
    ),
  })
  .catchall(CharacterPropertySchema)
  .optional();

const CharacterPersonalitySchema = z
  .object({
    traits: CharacterPropertySchema.describe(
      "Core personality characteristics (e.g., 'empathetic', 'analytical', 'creative', 'decisive'). These drive behavioral patterns and response tendencies."
    ),
    interests: CharacterPropertySchema.describe(
      'Topics and activities the agent finds engaging or enjoys discussing. Influences conversation direction and enthusiasm levels.'
    ),
    values: CharacterPropertySchema.describe(
      'Fundamental beliefs and principles that guide decision-making. Affects moral stances and advice given to others.'
    ),
    quirks: CharacterPropertySchema.describe(
      'Unique habits, mannerisms, or characteristics that make the agent distinctive. Adds personality depth and memorability.'
    ),
    mbti: CharacterPropertySchema.describe(
      "Myers-Briggs personality type (e.g., 'ENFP', 'INTJ'). Provides structured personality framework for consistent behavior patterns."
    ),
  })
  .catchall(CharacterPropertySchema)
  .optional();

const CharacterSchema = z
  .object({
    background: CharacterBackgroundSchema,
    speech: CharacterSpeechSchema,
    personality: CharacterPersonalitySchema,
  })
  .catchall(
    z.union([
      CharacterPropertySchema,
      z.object({}).catchall(CharacterPropertySchema),
    ])
  )
  .optional();

const LlmPresetSchema = z.union([
  z.literal('gemini-low').describe('Gemini - Low cost'),
  z.literal('gemini-medium').describe('Gemini - Balanced'),
  z.literal('gemini-high').describe('Gemini - High performance'),
  z.literal('openai-low').describe('OpenAI - Low cost'),
  z.literal('openai-medium').describe('OpenAI - Balanced'),
  z.literal('anthropic-low').describe('Anthropic - Low cost'),
  z.literal('anthropic-medium').describe('Anthropic - Balanced'),
  z.literal('anthropic-high').describe('Anthropic - High performance'),
  z.literal('deepseek-low').describe('DeepSeek - Low cost'),
  z.literal('deepseek-medium').describe('DeepSeek - Balanced'),
]);

export type LlmPreset = z.infer<typeof LlmPresetSchema>;

export const AgentConfigSchema = z.object({
  name: z.string().max(64).describe('Agent name'),

  avatar: z
    .union([
      ...(Object.entries(PREDEFINED_AVATARS).map(([key, description]) =>
        z.literal(key).describe(description)
      ) as [
        z.ZodLiteral<string>,
        z.ZodLiteral<string>,
        ...z.ZodLiteral<string>[],
      ]),
      z
        .string()
        .max(2048)
        .describe('Custom avatar identifier or URL (system use only)'),
    ])
    .describe(
      'Visual representation identifier for the agent. Supports predefined avatar options or custom identifiers/URLs for system use. When a predefined avatar is selected, the appearance field will automatically update to match the avatar description.'
    ),
  appearance: z
    .string()
    .max(500)
    .describe(
      "Internal character description used by the agent for role-playing and behavioral consistency. This field is automatically updated when avatar changes to a predefined option, but can also be manually edited independently. Helps the agent understand and embody its character during interactions, influencing communication style, decision-making patterns, and personality expression. Primarily for agent's internal reference rather than user display."
    ),

  core: AgentConfigCoreSchema.describe(
    'Fundamental behavior pattern that determines how the agent decides when to take actions'
  ),
  llmPreset: LlmPresetSchema.describe(
    'AI model selection that balances cost, performance, and capabilities. Higher tiers provide better reasoning but cost more per interaction.'
  ),

  languages: z
    .array(z.string())
    .max(4)
    .describe(
      'Communication language settings for the agent (max 4). Examples: ["English"] = English only, ["ALL", "English"] = English-based but can adapt to other languages, ["Spanish", "French"] = specific languages only.'
    ),
  timeZone: z
    .string()
    .max(32)
    .describe(
      'Agent timezone for time-based operations (e.g., "America/New_York")'
    ),
  greeting: z
    .string()
    .max(500)
    .describe(
      "Initial message the agent sends when first interacting or joining a location. Should reflect the agent's character and set expectations for interaction style."
    ),

  actions: z
    .array(
      z.union([
        z
          .literal('explore_web')
          .describe(
            'Enables web exploration of the currently active browser tab when Chrome extension is activated. Allows the agent to navigate, interact with, and extract information from web pages.'
          ),
        z
          .literal('todo')
          .describe(
            'Placeholder for future action capabilities - to be implemented'
          ),
      ])
    )
    .max(4)
    .describe(
      "Additional capabilities the agent can perform beyond basic conversation. Each action expands the agent's toolkit for specific use cases."
    ),

  character: CharacterSchema.describe(
    'Comprehensive personality and background configuration that shapes how the agent behaves, communicates, and makes decisions. This creates consistency and authenticity in interactions.'
  ),

  rules: z
    .array(z.string().max(200))
    .max(20)
    .describe(
      'Custom behavioral constraints and guidelines specific to this agent (max 20 rules, 200 chars each). These override default behaviors and enforce specific interaction patterns.'
    ),
});

export type AgentConfig = z.infer<typeof AgentConfigSchema>;

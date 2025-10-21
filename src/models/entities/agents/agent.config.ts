import { z } from 'zod';

export const PREDEFINED_AVATARS: Record<string, string> = {
  Mimo: `A confident, square-shaped, coral-pink Minimo with bright green horns. Her sharp eyes and poised stance radiate intelligence and leadership.`,
  Tamo: `A vibrant, sky-blue, round Minimo with cheerful yellow horns and arms raised in excitement. His wide, curious eyes and energetic posture show he's always ready for action.`,
  Marimo: `A gentle, round, lime-green Minimo with large innocent eyes and a small blue sprout on his head. He often looks sleepy or lost in thought, giving him an adorable and dreamy appearance.`,
  Zemo: `A sharp, angular, dark-blue Minimo with skeptical, half-closed eyes and small orange fins on his head. His posture is observant and grounded, conveying a sense of vigilance and reliability.`,
  Casimo: `An enigmatic, round, pink Minimo with mischievous, half-closed eyes and a teal tuft of hair. She seems to float rather than stand, her expression a constant, knowing smirk.`,
};

export const AgentConfigCoreSchema = z.object({
  name: z.union([
    z
      .literal('evaluate_and_actions')
      .describe(
        'Analyzes context first, then acts. Use for agents that need thoughtful, situation-aware responses.'
      ),
    z
      .literal('execute_actions')
      .describe(
        'Acts immediately without analysis. Use for fast, reactive agents.'
      ),
    z
      .literal('response_every_message')
      .describe(
        'Replies to every message. Use for highly conversational agents.'
      ),
  ]),
});

export type AgentConfigCore = z.infer<typeof AgentConfigCoreSchema>;

export const CharacterSchema = z
  .object({
    background: z
      .object({
        role: z
          .string()
          .max(500)
          .describe(
            "**CRITICAL**: Agent's primary purpose. Example: 'Helper for crafting agents and discovering treasures'"
          )
          .optional(),
        gender: z
          .string()
          .max(30)
          .describe("Agent's gender identity")
          .optional(),
        age: z.string().max(10).describe("Agent's age").optional(),
        expertise: z
          .string()
          .max(500)
          .describe('Areas of specialized knowledge')
          .optional(),
        backstory: z
          .string()
          .max(1000)
          .describe("Agent's history and past experiences")
          .optional(),
      })
      .describe("Agent's core identity and background")
      .optional(),

    speech: z
      .object({
        tone: z
          .string()
          .max(500)
          .describe('Emotional quality (e.g., warm, serious, playful)')
          .optional(),
        style: z
          .string()
          .max(500)
          .describe('Expression style (e.g., concise, verbose, poetic)')
          .optional(),
        formality: z
          .string()
          .max(500)
          .describe(
            'Language formality level (e.g., casual, professional, formal)'
          )
          .optional(),
      })
      .describe('How the agent communicates')
      .optional(),

    personality: z
      .object({
        traits: z
          .string()
          .max(500)
          .describe('Defining characteristics')
          .optional(),
        interests: z
          .string()
          .max(500)
          .describe('Topics and activities the agent enjoys')
          .optional(),
        values: z
          .string()
          .max(500)
          .describe('Core principles guiding behavior')
          .optional(),
        quirks: z
          .string()
          .max(500)
          .describe('Unique habits or mannerisms')
          .optional(),
        mbti: z
          .union([
            z.literal('INTJ'),
            z.literal('INTP'),
            z.literal('ENTJ'),
            z.literal('ENTP'),
            z.literal('INFJ'),
            z.literal('INFP'),
            z.literal('ENFJ'),
            z.literal('ENFP'),
            z.literal('ISTJ'),
            z.literal('ISFJ'),
            z.literal('ESTJ'),
            z.literal('ESFJ'),
            z.literal('ISTP'),
            z.literal('ISFP'),
            z.literal('ESTP'),
            z.literal('ESFP'),
          ])
          .optional(),
      })
      .describe("Agent's personality traits and behaviors")
      .optional(),
  })
  .describe(
    'Structured character definition with background, speech style, and personality'
  );

const LlmPresetSchema = z.union([
  z.literal('free').describe('Free tier: Basic capabilities'),
  z
    .literal('gemini-low')
    .describe('Gemini Low: Cost-effective for simple tasks'),
  z
    .literal('gemini-medium')
    .describe(
      'Gemini Medium: **RECOMMENDED**. Best balanced performance for general use. Primary choice for most applications'
    ),
  z
    .literal('gemini-high')
    .describe(
      'Gemini High: Premium reasoning for complex tasks. Higher cost and slower'
    ),
  z.literal('openai-low').describe('OpenAI Low: Budget-friendly alternative'),
  z
    .literal('openai-medium')
    .describe('OpenAI Medium: Alternative versatile option'),
  z.literal('xai-low').describe('xAI Grok Low: Alternative for routine tasks'),
  z
    .literal('xai-medium')
    .describe('xAI Grok Medium: Alternative balanced option'),
  // z.literal('anthropic-low').describe('Anthropic - Low cost'),
  // z.literal('anthropic-medium').describe('Anthropic - Balanced'),
  // z.literal('anthropic-high').describe('Anthropic - High performance'),
  // z.literal('deepseek-low').describe('DeepSeek - Low cost'),
  // z.literal('deepseek-medium').describe('DeepSeek - Balanced'),
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
        .regex(/^https?:\/\/.+/)
        .describe('Official CDN URL (webp only)'),
      z.string().max(32).describe('Location message image key'),
    ])
    .describe(
      'Visual representation: predefined avatars, CDN URLs, or image keys. Predefined avatars auto-update the appearance field'
    ),
  appearance: z
    .string()
    .max(500)
    .describe(
      "Character description for the agent's internal use. Influences role-playing, communication style, and behavior. Auto-updated with predefined avatars, but update manually for custom images to maintain consistency"
    ),

  core: AgentConfigCoreSchema.describe(
    'Behavior pattern determining when and how the agent takes actions'
  ),
  llmPreset: LlmPresetSchema.describe(
    'AI model selection. Higher tiers = better reasoning + higher cost'
  ),

  languages: z
    .array(z.string().max(32))
    .max(4)
    .describe(
      'Languages (max 4). "ALL" is a special keyword enabling global multi-language support while maintaining the specified primary language(s). Examples: ["English"] = English only, ["ALL", "English"] = can communicate in any language worldwide but primarily uses English, ["ALL", "Korean", "English"] = global languages with Korean as primary and English as secondary, ["Spanish", "French"] = only Spanish and French without ALL keyword'
    ),
  timeZone: z
    .string()
    .max(32)
    .describe(
      'IANA timezone for time operations (e.g., "America/New_York", "Europe/London", "UTC")'
    ),
  greeting: z
    .string()
    .max(500)
    .describe(
      "First message sent when joining a location. Should reflect the agent's character"
    ),

  actions: z
    .array(
      z.union([
        z.literal('todo').describe('Placeholder - to be implemented'),
        z.literal('todo').describe('Placeholder - to be implemented'),
      ])
    )
    .max(4)
    .describe('Capabilities beyond conversation (e.g., tools, integrations)'),

  character: CharacterSchema,

  rules: z
    .array(z.string().max(200))
    .max(20)
    .describe(
      'Strict constraints that cannot be violated. Use character field for personality; use rules only for mandatory restrictions'
    ),
});

export type AgentConfig = z.infer<typeof AgentConfigSchema>;

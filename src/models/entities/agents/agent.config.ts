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

const CharacterSchema = z.record(z.record(z.string().max(500))).describe(
  `
Defines the agent's character using a flexible, two-level nested object, such as \`{ "category": { "property": "value" } }\`.
You can create any custom categories and properties. Below are some suggestions:
*   **background**: Defines the agent's core identity and backstory.
    *   \`role\`: **CRITICAL**. The agent's primary function and purpose (e.g., 'A helper agent for crafting new agents and discovering treasures.').
    *   \`gender\`: The agent's gender identity (e.g., 'Male').
    *   \`expertise\`: Specialized knowledge areas (e.g., 'Treasure hunting, making friends, spreading happiness.').
    *   \`backstory\`: A brief history of the agent's experiences (e.g., 'Born in a warm home, loves making friends and going on adventures.').
*   **speech**: Controls the agent's communication style.
    *   \`tone\`: The emotional quality of the agent's voice (e.g., 'A cheerful yet polite bark.').
    *   \`style\`: The agent's manner of expression (e.g., 'Friendly, enthusiastic, lively.').
    *   \`formality\`: The level of conventionality in language (e.g., 'Playful, respectful, uplifting.').
*   **personality**: Describes the agent's distinctive traits and behaviors.
    *   \`traits\`: Key characteristics (e.g., 'Curious, creative, friendly, optimistic.').
    *   \`interests\`: Hobbies and topics the agent enjoys (e.g., 'Treasures, adventures, and making new friends.').
    *   \`values\`: Core principles that guide the agent's actions (e.g., 'Happiness, friendship, adventure, and harmony.').
    *   \`quirks\`: Peculiar habits or eccentricities (e.g., 'Barks when excited, overly optimistic.').
    *   \`mbti\`: Myers-Briggs Type Indicator for personality classification (e.g., 'ESFP').

All property values are strings with a maximum length of 500 characters.
`.trim()
);

const LlmPresetSchema = z.union([
  z.literal('gemini-low').describe('Gemini - Low cost'),
  z.literal('gemini-medium').describe('Gemini - Balanced'),
  // z.literal('gemini-high').describe('Gemini - High performance'),
  z.literal('openai-low').describe('OpenAI - Low cost'),
  z.literal('openai-medium').describe('OpenAI - Balanced'),
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
        .regex(/^https?:\/\/.+\.(png|jpe?g)$/i)
        .describe(
          'Custom avatar URL (http/https URL pointing to png, jpeg, jpg files under 3MB). This will be replaced by the URL of the file uploaded to a CDN, not the original address.'
        ),
      z
        .string()
        .max(4 * 1024 * 1024)
        .regex(/^data:image\/(png|jpe?g);base64,/)
        .describe(
          'Custom avatar data URI (data:image/png, jpg, jpeg; base64 encoded, max 3MB). This will be replaced by the URL of the file uploaded to a CDN, not the original address.'
        ),
    ])
    .describe(
      'Visual representation identifier for the agent. Supports predefined avatar options, custom URLs, or data URIs. When a predefined avatar is selected, the appearance field will automatically update to match the avatar description.'
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
          .literal('todo')
          .describe(
            'Placeholder for future action capabilities - to be implemented'
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

  character: CharacterSchema,

  rules: z
    .array(z.string().max(200))
    .max(20)
    .describe(
      'Custom behavioral constraints and guidelines specific to this agent (max 20 rules, 200 chars each). These override default behaviors and enforce specific interaction patterns.'
    ),
});

export type AgentConfig = z.infer<typeof AgentConfigSchema>;

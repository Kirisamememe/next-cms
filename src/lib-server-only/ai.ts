import 'server-only'
import { openai } from '@ai-sdk/openai';
import { google } from "@ai-sdk/google";
import { anthropic } from '@ai-sdk/anthropic';
import { LanguageModelV1, streamObject } from "ai";
import { AIModel } from '@/types';
import { z } from 'zod';

type Models = {
  [K in AIModel]: LanguageModelV1
}

export class AI {
  static instance: AI
  static getInstance() {
    if (!AI.instance) AI.instance = new AI()
    return AI.instance
  }

  private geminiModels = {
    'gemini-1.5-pro-latest': google('gemini-1.5-pro-latest', { structuredOutputs: false }),
    'gemini-1.5-flash-latest': google('gemini-1.5-flash-latest', { structuredOutputs: false }),
    'gemini-2.0-flash-exp': google('gemini-2.0-flash-exp', { structuredOutputs: false }),
  }

  private claudeModels = {
    'claude-3-5-sonnet-latest': anthropic("claude-3-5-sonnet-latest"),
    'claude-3-5-haiku-latest': anthropic('claude-3-5-haiku-latest'),
  }

  private openAIModels = {
    'gpt-4o': openai("gpt-4o"),
    'gpt-4o-mini': openai("gpt-4o-mini"),
    'gpt-4-turbo': openai("gpt-4-turbo"),
    'o1-preview': openai("o1-preview"),
  }

  private models: Models = {
    ...this.geminiModels,
    ...this.claudeModels,
    ...this.openAIModels,
  }

  generate(
    model: AIModel,
    prompt: string,
    system: string,
    schema: z.ZodType<any>
  ) {
    return streamObject({
      model: this.models[model],
      prompt: prompt,
      system: system,
      schema: schema,
      maxTokens: 2000,
    })
  }


}
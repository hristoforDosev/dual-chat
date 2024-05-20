import OpenAIApi from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
  public openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAIApi({
      apiKey: configService.get('OPENAI_SECRET_KEY'),
    });
  }

  async chatGptRequest(
    prompt: string,
    messages: { text: string; ai: boolean }[],
  ): Promise<string> {
    try {
      // Convert message history to the format expected by the OpenAI API
      const history = messages.map(
        (message): ChatCompletionMessageParam => ({
          role: message.ai ? 'assistant' : 'user',
          content: message.text,
        }),
      );

      // Make a request to the ChatGPT model
      const completion: ChatCompletion =
        await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: prompt,
            },
            ...history,
          ],
        });

      // Extract the content from the response
      const [content] = completion.choices.map(
        (choice) => choice.message.content,
      );

      return content;
    } catch (e) {
      // Log and propagate the error
      console.error(e);
      throw new ServiceUnavailableException('Failed request to ChatGPT');
    }
  }
}

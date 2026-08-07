import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z
    .string()
    .default('3000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),

  // Secret / critical values — কোনো fallback নেই, মিসিং হলে crash করবে
  JWT_SECRET: z
    .string()
    .min(1, 'JWT_SECRET is required and cannot be empty'),

  DATABASE_URL: z
    .string()
    .url('DATABASE_URL must be a valid connection string'),

  FRONTEND_URL: z
    .string()
    .url('FRONTEND_URL must be a valid URL')
    .default('http://localhost:3000'),

  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): EnvConfig {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const formattedErrors = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');

    throw new Error(
      `❌ Invalid environment configuration:\n${formattedErrors}`,
    );
  }

  return result.data;
}
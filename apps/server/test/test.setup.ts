import { config } from 'dotenv';
import { existsSync } from 'node:fs';

const testEnvFile = `../../.env.test`;
const envFile = `../../.env`;

if (!existsSync(envFile)) {
  throw new Error('.env file not found');
}

// Ensure a test environment variable file exists because of the override config
// loading mechanics below.
if (!existsSync(testEnvFile)) {
  throw new Error('.env.test file found');
}

config({ path: envFile });
config({ path: testEnvFile, override: true });

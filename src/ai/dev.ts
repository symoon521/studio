import { config } from 'dotenv';
config();

import '@/ai/flows/code-evaluation.ts';
import '@/ai/flows/admin-prompt-tuning.ts';
import '@/ai/flows/mission-summary.ts';
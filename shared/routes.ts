
import { z } from 'zod';

export const api = {
  // Minimal health check or placeholder route
  health: {
    method: 'GET' as const,
    path: '/api/health' as const,
    responses: {
      200: z.object({ status: z.string() }),
    },
  },
};

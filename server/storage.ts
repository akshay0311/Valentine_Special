
import { type Attempt, type InsertAttempt } from "@shared/schema";

// Minimal storage interface since we are client-side focused
export interface IStorage {
  logAttempt(attempt: InsertAttempt): Promise<Attempt>;
}

export class MemStorage implements IStorage {
  private attempts: Map<number, Attempt>;
  private currentId: number;

  constructor() {
    this.attempts = new Map();
    this.currentId = 1;
  }

  async logAttempt(insertAttempt: InsertAttempt): Promise<Attempt> {
    const id = this.currentId++;
    const attempt: Attempt = { ...insertAttempt, id, success: insertAttempt.success ?? true };
    this.attempts.set(id, attempt);
    return attempt;
  }
}

export const storage = new MemStorage();

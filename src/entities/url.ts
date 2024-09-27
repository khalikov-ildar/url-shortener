import { randomUUID, UUID } from 'crypto';

export class UrlEntity {
  constructor(
    public url: string,
    public readonly shortCode: string,
    public updatedAt: Date = new Date(),
    public readonly createdAt: Date = new Date(),
    public readonly id: UUID = randomUUID(),
  ) {}
}

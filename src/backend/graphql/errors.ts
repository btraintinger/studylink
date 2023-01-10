export class DoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DoesNotExistError';
    this.message = this.name;
  }
}

export class NotAuthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotAuthorizedError';
    this.message = this.name;
  }
}

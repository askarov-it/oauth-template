import { Request, Response } from 'express';

export type OAuthRequest<T> = Request & {
  user: T
}

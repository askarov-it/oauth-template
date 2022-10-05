import { Request } from 'express';

export type OAuthRequest<T> = Request & {
  user: T
}

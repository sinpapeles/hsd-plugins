import { AuthChecker, MiddlewareFn } from 'type-graphql';
import { AppContext } from '../types';

export const authChecker: AuthChecker<AppContext> = ({ context }) => {
  const { authorization, key } = context;

  if (!authorization) {
    return false;
  }

  const [type, value] = authorization.split(' ');

  if (type !== 'Basic') {
    return false;
  }

  const [, pass] = Buffer.from(value, 'base64').toString().split(':');

  return key === pass;
};

export const AuthMiddleware: MiddlewareFn<any> = async (props, next) => {
  if (!authChecker(props, [])) {
    throw new Error('Unauthorized');
  }

  return next();
};

import { createGlobalState } from 'react-use/lib/factory/createGlobalState';

interface Session {
  id: string;
}

export const useSession = createGlobalState<Session>({ id: '1' });

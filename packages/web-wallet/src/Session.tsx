import { useSession } from './hooks/useSession';

interface Props {
  children: JSX.Element;
  authenticate: JSX.Element;
}
const Session = ({ children, authenticate }: Props): JSX.Element => {
  const [session] = useSession();

  if (session?.id) {
    return children;
  }

  return authenticate;
};

export default Session;

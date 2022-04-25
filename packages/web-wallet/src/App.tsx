import { Redirect, Router } from '@reach/router';
import { Header } from 'components/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from 'pages/Auth';
import Session from './Session';
import Wallets from 'pages/wallets';
import Wallet from 'pages/wallets/[id]';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="h-screen bg-gradient-to-b from-indigo-800 to-blue-700 text-gray-50">
      <div className="flex flex-col h-screen space-y-2">
        <Header />
        <Session authenticate={<Auth />}>
          <Router className="flex-1 overflow-auto">
            <Redirect from="/" to="/wallets" noThrow />
            <Wallets path="wallets" />
            <Wallet path="wallets/:id" id=":id" />
          </Router>
        </Session>
      </div>
    </div>
  );
}

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer />
  </QueryClientProvider>
);

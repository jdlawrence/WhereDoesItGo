import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

import Hours from './components/Hours';
import Header from './components/Header';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App bg-zinc-600">
        <Header></Header>
        <Hours></Hours>
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;

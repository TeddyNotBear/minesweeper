import './index.css';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';

function App() {
  const elements = useRoutes(routes);

  return (
    <div className="w-screen h-screen bg-[#08042a]">
      <Suspense>{elements}</Suspense>
    </div>
  )
}

export default App
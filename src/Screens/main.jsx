import React from 'react'
import ReactDOM from 'react-dom/client'
import { GamePage } from '../NewPacmanGame/src/pages/GamePage/GamePage'
import { Store } from '../NewPacmanGame/src/model/Store'
import { StoreProvider } from '../NewPacmanGame/src/components/StoreContext'
import './index.css'
import '../NewPacmanGame/src/GlobalStyles.css'
import 'antd/dist/reset.css' // Updated Ant Design CSS import

try {
  console.log('Starting app initialization...');
  
  // Create a new store instance
  console.log('Creating store...');
  const store = new Store()
  console.log('Store created successfully:', store);

  const rootElement = document.getElementById('root');
  console.log('Root element found:', rootElement);

  const root = ReactDOM.createRoot(rootElement)
  console.log('React root created');

  const App = () => {
    console.log('Rendering App component');
    return (
      <React.StrictMode>
        <StoreProvider value={store}>
          <div style={{ 
            border: '2px solid red', 
            minHeight: '100vh', 
            padding: '20px',
            background: '#000',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h1>Debug Container</h1>
            <GamePage />
          </div>
        </StoreProvider>
      </React.StrictMode>
    );
  };

  console.log('About to render app...');
  root.render(<App />);
  console.log('App rendered successfully');

} catch (error) {
  console.error('Error during app initialization:', error);
}

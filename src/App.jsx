import AppRoutes from './AppRoutes';
import './index.css';
import { AuthProvider } from './contexts/useAuth';


function App() {

  return (
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
  );
}

export default App;

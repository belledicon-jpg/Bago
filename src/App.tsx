import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

import Dashboard from './pages/Dashboard';
import HealthCenter from './pages/HealthCenter';
import Sanitation from './pages/Sanitation';
import Immunization from './pages/Immunization';
import Wastewater from './pages/Wastewater';
import Surveillance from './pages/Surveillance';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import Index from './pages/Index';
import PublicPortal from './pages/public/PublicPortal';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/portal' element={<PublicPortal />} />

      <Route element={<AppLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/health-center' element={<HealthCenter />} />
        <Route path='/sanitation' element={<Sanitation />} />
        <Route path='/immunization' element={<Immunization />} />
        <Route path='/wastewater' element={<Wastewater />} />
        <Route path='/surveillance' element={<Surveillance />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
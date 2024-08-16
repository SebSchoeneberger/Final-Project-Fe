import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound';
import ProtectedLayout from './Layouts/ProtectedLayout';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />

      <Route path="/" element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>,
  )
);

const App = () => <RouterProvider router={router} />;

export default App;

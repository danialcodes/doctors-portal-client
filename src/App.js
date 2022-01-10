import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import Appoinment from './Pages/Appoinment/Appoinment/Appoinment';
import Login from './Pages/Login/Login/Login';
import Registration from './Pages/Login/Registration/Registration';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';
import Payment from './Pages/Dashboard/Payment/Payment';
import AdminRoute from './Pages/Login/AdminRoute/AdminRoute';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor/AddDoctor';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/Appoinment"
              element={
                <PrivateRoute>
                  <Appoinment></Appoinment>
                </PrivateRoute>
              }
            />

            <Route path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard></Dashboard>
                </PrivateRoute>
              }
            >
              <Route exact path="/dashboard" element={<DashboardHome></DashboardHome>} />

              <Route path={`/dashboard/payment/:appoinmentId`}
                element={<Payment></Payment>}
              />

              <Route path={`/dashboard/makeAdmin`}
                element={<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>}
              />
              <Route path={`/dashboard/addDoctor`} element={<AdminRoute><AddDoctor></AddDoctor></AdminRoute>}
              />

            </Route>

            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route exact path="/" element={<Home />} />

          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}
console.log(process.env.REACT_APP_API_URL);
export default App;
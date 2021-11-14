import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import Appoinment from './Pages/Appoinment/Appoinment/Appoinment';
import Login from './Pages/Login/Login/Login';
import Registration from './Pages/Login/Registration/Registration';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute path="/Appoinment">
              <Appoinment></Appoinment>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="/users">
              <Home />
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Registration></Registration>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
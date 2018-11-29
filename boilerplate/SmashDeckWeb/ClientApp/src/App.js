import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppRoute from './components/AppRoute';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Profile from './pages/profile';
import ForgotPassword from './pages/public/ForgotPassword';
import Login from './pages/public/Login';
import ResetPassword from './pages/public/ResetPassword';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route>
                    <Switch>
                        <AppRoute exact path="/login" layout={PublicLayout} component={Login} />
                        <AppRoute exavt path='/forgot-password' layout={PublicLayout} component={ForgotPassword} />
                        <AppRoute exact path="/reset-password" layout={PublicLayout} component={ResetPassword} />

                        <AppRoute exact path="/dashboard" layout={AdminLayout} component={Dashboard} />
                        <AppRoute exact path="/" layout={AdminLayout} component={Contact} />
                        <AppRoute exact path="/profile" layout={AdminLayout} component={Profile} />

                    </Switch>
                </Route>
            </BrowserRouter>
        );
    }
}

export default App;
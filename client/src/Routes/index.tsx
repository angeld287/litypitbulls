import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes as RRoutes
} from "react-router-dom";

import Header from '../components/Header';
import SearchConsole from '../screens/SearchConsole';
import Login from '../screens/Login';

const Routes: React.FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <RRoutes>
                    <Route path="/" element={<SearchConsole />} />
                    <Route path="/login" element={<Login />} />
                </RRoutes>
            </div>
        </Router>
    );
};

export default Routes;
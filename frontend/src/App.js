
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { setToken } from './slices/jwt.js';
import { login } from './slices/user.js';
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ProtectedRoutesProxy from "./components/ProtectedRoutesProxy";
import { useDispatch } from 'react-redux';


function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));
            dispatch(login());
        }
        setIsLoading(false);
    }, []);
      return !isLoading && (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ProtectedRoutesProxy />}>
                            <Route index element={<Home />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path={"*"}
                            element={<NotFound />}
                        />
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
      );
}

export default App;

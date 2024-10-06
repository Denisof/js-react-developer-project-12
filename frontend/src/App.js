
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <BrowserRouter>
                <Routes>
                    <Route path="/" >
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                    </Route>

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

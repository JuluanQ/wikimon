import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { UserContext } from './components/UserContext';
import { useNavigate } from 'react-router-dom';

import Home from './pages/Home.js';
import PokemonPage from './pages/PokemonPage.js';

const Main = () => {

    const [user, setUser] = useState(null)
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        /* The Switch decides which component to show based on the current URL.*/
        <BrowserRouter>
            <UserContext.Provider value={value}>
                <Routes>
                    <Route path="/" element={<Home />}> </Route>
                    <Route path="/pokemon" element={<PokemonPage />}> </Route>

                    {/* path="*" route si url non déclaré */}
                    <Route path="*" element={<Home />}> </Route>
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default Main;
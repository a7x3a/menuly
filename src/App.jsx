import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./Componets/Menu";
import Admin from "./Componets/Admin";
import RootLayout from "./Componets/RootLayout";
import Login from "./Componets/Login";
import LanguageContextProvider from "./Context/LanguageContext";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
const App = () => {
  return (
    <LanguageContextProvider>
      <div className="min-w-full h-fit">
        <Router>
          <RootLayout>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
            </Routes>
          </RootLayout>
        </Router>
      </div>
    </LanguageContextProvider>
  );
};

export default App;

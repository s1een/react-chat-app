import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import "./styles/style.scss";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/react-chat-app/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-chat-app">
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="react-chat-app/login" element={<LoginPage />} />
          <Route path="react-chat-app/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

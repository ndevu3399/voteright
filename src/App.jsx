import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";
import Polls from "./pages/Polls";
import Vote from "./pages/Vote";
import Dashboard from "./pages/Dashboard";
import CreatePoll from "./pages/CreatePoll";
import Users from "./pages/Users"; // ✅ Add this line
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NotFound from "./pages/NotFound";


function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/polls" element={<PrivateRoute><Polls /></PrivateRoute>} />
          <Route path="/vote/:pollId" element={<PrivateRoute><Vote /></PrivateRoute>} />
          <Route path="/create-poll" element={<PrivateRoute><CreatePoll /></PrivateRoute>} />
          <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
          <Route path="/users"   element={<PrivateRoute><Users   /></PrivateRoute>} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

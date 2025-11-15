import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "@/context/AuthContext";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import { AboutUs } from "@/pages/AboutUs";
import ArticleDoc from "@/pages/ArticleDoc";
import ArticleGaleri from "@/pages/ArticleGaleri";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { Dashboard } from "@/pages/Dashboard";

// Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id-here";

export function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex min-h-screen w-full flex-col">
            <Routes>
              {/* Auth routes without navigation */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Main routes with navigation */}
              <Route
                path="/*"
                element={
                  <>
                    <Navigation />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/article" element={<ArticleDoc />} />
                      <Route path="/article-galeri" element={<ArticleGaleri />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                  </>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

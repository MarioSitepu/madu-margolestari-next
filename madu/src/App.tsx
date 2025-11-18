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
import { AdminLogin } from "@/pages/auth/AdminLogin";
import { ArticleManagement } from "@/pages/admin/ArticleManagement";
import { ArticleForm } from "@/pages/admin/ArticleForm";
import { UserManagement } from "@/pages/admin/UserManagement";
import { CommentManagement } from "@/pages/admin/CommentManagement";
import { GalleryManagement } from "@/pages/admin/GalleryManagement";
import { ProductManagement } from "@/pages/admin/ProductManagement";
import { ProductForm } from "@/pages/admin/ProductForm";
import { Dashboard } from "@/pages/Dashboard";
import { Settings } from "@/pages/Settings";
import { default as ProductPage } from "@/pages/Product";

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
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />

              {/* Admin routes without navigation */}
              <Route path="/admin/articles" element={<ArticleManagement />} />
              <Route path="/admin/articles/new" element={<ArticleForm />} />
              <Route path="/admin/articles/:id/edit" element={<ArticleForm />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/comments" element={<CommentManagement />} />
              <Route path="/admin/gallery" element={<GalleryManagement />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/products/new" element={<ProductForm />} />
              <Route path="/admin/products/:id/edit" element={<ProductForm />} />

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
                      <Route path="/article-galeri/:id" element={<ArticleGaleri />} />
                      <Route path="/article-galeri" element={<ArticleGaleri />} />
                      <Route path="/product" element={<ProductPage />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/settings" element={<Settings />} />
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

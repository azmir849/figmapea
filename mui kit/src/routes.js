import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPageBackup';
import DashboardAppPage from './pages/DashboardAppPage';
import CategoryPage from './pages/CategoryPage';
import CategoryStorePage from './pages/CategoryStorePage';
import ProductPage from './pages/PostPage';
import PostPage from './pages/PostPage';
import PostStorePage from './pages/PostStorePage';
import { useState } from 'react';
import Context from './context/context';
import Protected from './gurd/Protected';
import SettingPage from './pages/SettingPage';

// ----------------------------------------------------------------------

export default function Router() {


  
  const routes = useRoutes([
    {
      path: 'login',
      element: (
          <LoginPage  />
      ),
    },
    {
      path: '/dashboard',
      element:(
          <Protected Component={DashboardLayout} ></Protected>
        )
      ,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'posts', element: <PostPage /> },
        { path: 'posts/store', element: <PostStorePage /> },
        { path: 'category/store', element: <CategoryStorePage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'setting', element: <SettingPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

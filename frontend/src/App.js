import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import PasswordReset from './pages/login/PasswordReset';
import Register from './pages/register/Register';
import Category from './pages/category/Category';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PrivateRouter from './components/PrivateRouter';
import "primeicons/primeicons.css";
import MyAuctions from './pages/myAuctions/MyAuctions';

const App = () => {
  return (
    <div className="App flex flex-column min-h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path='/login' Component={Login}></Route>
          <Route path='/register' Component={Register}></Route>
          <Route path="/password-reset" Component={PasswordReset} />
          <Route element={<PrivateRouter />}>
            <Route path='/' Component={Home}></Route>
            <Route path='/category' Component={Category}></Route>
            <Route path='/my-auctions' Component={MyAuctions}></Route>
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import PasswordReset from './pages/login/PasswordReset';
import Register from './pages/register/Register';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PrivateRouter from './components/PrivateRouter';

function App() {
  return (
    <div className="App flex flex-column min-h-screen">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/login' Component={Login}></Route>
          <Route path='/register' Component={Register}></Route>
          <Route path="/password-reset" Component={PasswordReset} />
          <Route element={<PrivateRouter/>}>
            <Route path='/' Component={Home}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
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

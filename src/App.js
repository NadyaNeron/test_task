import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Home} from './pages/Home';
import {About} from './pages/About';
import {Navbar} from './components/navbar';
import {Alert} from './components/Alert';
import {AlertState} from './context/alert/AlertState';

function App() {
  return (
    <AlertState>
    <BrowserRouter>
    <Navbar />
      <div className="App">
        <Alert />
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/about'} element={<About/>} />
        </Routes>
      </div>
    </BrowserRouter>   
    </AlertState>
  );
}

export default App;

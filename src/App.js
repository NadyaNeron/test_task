import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Home} from './pages/Home';
import {About} from './pages/About';
import {Navbar} from './components/navbar';
import {Alert} from './components/Alert';
import { AlertState } from './context/alert/AlertState';
import { FirebaseState } from './context/firebase/FirebaseState';
import { NotesState } from './context/notes/NotesState';

function App() {
  return (
    <FirebaseState>
      <AlertState>
        <NotesState>
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
        </NotesState> 
      </AlertState>
    </FirebaseState>
  );
}

export default App;

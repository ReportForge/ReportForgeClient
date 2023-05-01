import { BrowserRouter,Route,Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import EnglishReport from './components/EnglishReport/EnglishReport';
import HebrewReport from './components/HebrewReport/HebrewReport';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/english" element={<EnglishReport/>} />
            <Route path="/Hebrew" element={<HebrewReport/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

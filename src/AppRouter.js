import { BrowserRouter,Route,Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import EnglishReport from './components/EnglishReport/EnglishReport';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/english" element={<EnglishReport/>} />
            </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

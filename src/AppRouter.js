import { BrowserRouter,Route,Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import EnglishReport from './components/EnglishReport/EnglishReport';
import HebrewReport from './components/HebrewReport/HebrewReport';
import EnglishMenu from './components/EnglishMenu/EnglishMenu';
import ScenarioCreate from './components/ScenarioCreatePage/ScenarioCreatePage'
import EnglishScenarioList from './components/EnglishScenarioList/EnglishScenarioList';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/english" element={<EnglishMenu/>} />
            <Route path="/Hebrew" element={<HebrewReport/>} />
            <Route path="/englishReport" element={<EnglishReport/>} />
            <Route path="/scenarioCreate" element={<ScenarioCreate/>} />
            <Route path="/englishScenarioList" element={<EnglishScenarioList/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

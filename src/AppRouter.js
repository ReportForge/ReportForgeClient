import { BrowserRouter,Route,Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import EnglishReport from './components/EnglishReport/EnglishReport';
import HebrewReport from './components/HebrewReport/HebrewReport';
import EnglishMenu from './components/EnglishMenu/EnglishMenu';
import ScenarioCreate from './components/ScenarioCreatePage/ScenarioCreatePage'
import EnglishScenarioList from './components/EnglishScenarioList/EnglishScenarioList';
import ScenarioCreatePage from './components/ScenarioCreatePage/ScenarioCreatePage'
import HebrewMenu from './components/HebrewMenu/HebrewMenu';
import HebrewScenarioCreate from './components/HebrewScenarioCreate/HebrewScenarioCreate';
import HebrewScenarioList from './components/HebrewScenarioList/HebrewScenarioList';
import Login from './components/Login/Login';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/Home" element={<HomePage/>} />
            <Route path="/english" element={<EnglishMenu/>} />
            <Route path="/englishReport" element={<EnglishReport/>} />
            <Route path="/scenarioCreate" element={<ScenarioCreate/>} />
            <Route path="/englishScenarioList" element={<EnglishScenarioList/>} />
            <Route path="/edit/:scenarioNumber" element={<ScenarioCreatePage />} />
            <Route path="/englishScenarioList/:scenarioId" element={<EnglishScenarioList/>} />
            
            <Route path="/hebrewMenu" element={<HebrewMenu/>} />
            <Route path="/hebrewScenarioCreate" element={<HebrewScenarioCreate/>} />
            <Route path="/edit/hebrew/:scenarioNumber" element={<HebrewScenarioCreate/>}/>
            <Route path="/hebrewScenarioList" element={<HebrewScenarioList/>} />
            <Route path="/hebrewReport" element={<HebrewReport/>} />
            <Route path="/hebrewScenarioList/:scenarioId" element={<HebrewScenarioList/>} />

        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

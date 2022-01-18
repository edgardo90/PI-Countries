// import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import LadingPage from './components/LadingPage';
import Home from "./components/Home";
import Detail from "./components/Detail";
import { ActivityCreate } from "./components/ActivityCreate";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
    <div >
      <Routes> {/*el Switch se cambia por Routes  */}
        <Route  path="/" element={<LadingPage /> } /> {/* el component se cambia por element , se pone {< algo  />} ahora  */}
        <Route path="/home" element={<Home/> } />
        <Route path="/home/:id" element={<Detail/>} />
        <Route path="/activity" element={<ActivityCreate/> } />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

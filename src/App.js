import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../src/style/style.css"
import AboutPage from './screen/about/about-page';
import LandingPage from './screen/landing-page';
import Signup from './screen/Signup';
import Login from './screen/Login';
import EmailVerification from './screen/email-verification';

function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about/about-page" element={<AboutPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verifivation" element={<EmailVerification />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import FindMentor from './pages/FindMentor';
import BecomeMentor from './pages/BecomeMentor';
import Contact from './pages/Contact';
// import MentorList from './components/MentorList';


export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/find-mentor" element={<FindMentor />} />
          <Route path="/become-mentor" element={<BecomeMentor />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {/* <MentorList /> */}
      <Footer />

    </div>
  );
}

import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// import HeroSection from "./components/HeroSection";
import About from './pages/About';
import Services from './pages/Services';
// import FindMentor from './pages/FindMentor';
// import BecomeMentor from './pages/BecomeMentor';
import Contact from './pages/Contact';
import CareerPage from './pages/Career';
import InternshipPage from './pages/Internship';
import JobsPage from './pages/Jobs';
import LiveProjectPage from './pages/LiveProject';
import CurrentEventPage from './pages/CurrentEvent';

const MenteeRegistraionPage = lazy(()=>import('./pages/MenteeRegistraionPage'));
const LoginPage = lazy(()=>import('./pages/Login'));
const MentorRegistraitionPage = lazy(()=>import('./pages/BecomeMentor'));
const ServiceDetailPage = lazy(()=>import('./pages/ServiceDetail'));

const CurrentJobsPage = lazy(()=>import('./pages/CurrentJobs'))
// import MentorList from './components/MentorList';


export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
           {/* <Route path="/" element={<HeroSection />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/find-mentor" element={<FindMentor />} /> */}
          <Route path='/mentee-registraion' element={<MenteeRegistraionPage />} />
          <Route path="/mentor-registration" element={<MentorRegistraitionPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/login' element={<LoginPage />} />
           <Route path='/career' element={<CareerPage />} />
           <Route path='/current-event' element={<CurrentEventPage />} />
          <Route path='/current-jobs' element={<CurrentJobsPage />} />
           <Route path='/internship' element={<InternshipPage />} />
            <Route path='/jobs' element={<JobsPage />} />
             <Route path='/live-project' element={<LiveProjectPage />} />
          <Route path='/services/detail/:id' element={<ServiceDetailPage />} />
        </Routes>
      </main>
      {/* <MentorList /> */}
      <Footer />

    </div>
  );
}

import { Routes, Route } from 'react-router-dom';
import seedCoursesToBackend from './constants/seed';
import { useServices } from './context/ServiceContext';
import { Toaster } from 'react-hot-toast';
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
const MenteeDetailPage  = lazy(()=>import('./pages/admin/MenteeDetail'))
const MentorsDetailPage = lazy(()=>import('./pages/admin/MentorDetail'));
const AdminDashboardPage = lazy(()=>import('./pages/admin/Dashboard'));
const MentorDashboardPage = lazy(()=>import('./pages/mentor/MentorDashboard'))
const UpdateMentorProfilePage = lazy(()=>import('./pages/mentor/UpdateProfile'));
const MenteeDashboardPage = lazy(()=>import('./pages/mentee/MenteeDashboard'));
const MentorDetailPageforStudent = lazy(()=>import('./pages/mentor/MentorDetails'));
const MentorsAvailableForMenteePage = lazy(()=>import('./pages/mentee/YourMentor'));
const RequestMentorPage = lazy(()=>import('./pages/RequestMentor'));

const AdminMenteeDetailPage = lazy(()=>import('./pages/admin/AdminMenteeDetail'))

const EventsPage = lazy(()=>import('./pages/admin/Events'));
const AddEventsPage = lazy(()=>import('./pages/admin/AddEvents'))

const CurrentJobsPage = lazy(()=>import('./pages/CurrentJobs'))
const EventDetailPage = lazy(()=>import('./pages/admin/EventDetail'))
// import MentorList from './components/MentorList';


export default function App() {
 
  return (
    <div className="flex flex-col min-h-screen">
       <Toaster position="top-right" />
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
             <Route path='/Clients' element={<LiveProjectPage />} />
          <Route path='/services/detail/:id' element={<ServiceDetailPage />} />


          {/* {MENTEE ROUTES} */}

          <Route path='/mentee/dashboard' element={<MenteeDashboardPage />} />
          <Route path='/mentee/mentors' element={<MentorsAvailableForMenteePage />} />
          <Route path='/booking/:id' element={<RequestMentorPage />} />

           <Route path='/mentor/dashboard' element={<MentorDashboardPage />} />
           <Route path='/mentor/profile' element={<UpdateMentorProfilePage />} />
           <Route path='/mentor/detail/:id' element={<MentorDetailPageforStudent />} />


          {/* ADMIN ROUTES */}
          <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
          <Route path='/admin/mentees' element={<MenteeDetailPage />} />
          <Route path='/admin/mentors' element={<MentorsDetailPage />} />
          <Route path='/admin/events' element={<EventsPage />} />
          <Route path='/admin/add-event' element={<AddEventsPage />} />
        <Route path='/admin/event-detail/:id' element={<EventDetailPage />} />
        <Route path='admin/mentee-detail/:id' element={<AdminMenteeDetailPage />} />
        </Routes>
      </main>
      {/* <MentorList /> */}
      <Footer />

    </div>
  );
}

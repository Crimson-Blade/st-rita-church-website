import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Ministries from './pages/Ministries';
import NoticeBoard from './pages/NoticeBoard';
import MassTimes from './pages/MassTimes';
import Donate from './pages/Donate';
// import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
// import RegistrationDemo from './pages/RegistrationDemo';
// import AdminRegistrations from './pages/AdminRegistrations';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* TODO */}
          <Route path="/ministries" element={<div className="p-8 text-center">Ministries - Coming Soon</div>} />
          <Route path="/notice-board" element={<NoticeBoard />} />
          <Route path="/mass-timings" element={<MassTimes />} />
          <Route path="/events" element={<div className="p-8 text-center">Events - Coming Soon</div>} />
          <Route path="/events/:slug" element={<EventDetail />} />
          {/* <Route path="/registration-demo" element={<RegistrationDemo />} /> */}
          {/* <Route path="/admin/registrations" element={<AdminRegistrations />} /> */}
          {/* Placeholder routes - will be implemented later */}
          <Route path="/faith-formation" element={<div className="p-8 text-center">Faith Formation - Coming Soon</div>} />
          <Route path="/news" element={<div className="p-8 text-center">News - Coming Soon</div>} />
          <Route path="/vocations" element={<div className="p-8 text-center">Vocations - Coming Soon</div>} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/feedback" element={<div className="p-8 text-center">Feedback - Coming Soon</div>} />
          {/* 404 Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
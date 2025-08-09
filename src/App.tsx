import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
// import Ministries from './pages/Ministries';
import NoticeBoard from './pages/NoticeBoard';
import MassTimes from './pages/MassTimes';
import Donate from './pages/Donate';
// import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
// import RegistrationDemo from './pages/RegistrationDemo';
// import AdminRegistrations from './pages/AdminRegistrations';
import NotFound from './pages/NotFound';
import SEO from './components/SEO';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<>
            <SEO title="About St. Rita's Church, Maina (Curtorim)" description="Learn about St. Rita Parish, Maina: our history, clergy, ministries, and mission in Curtorim, South Goa." canonical="https://saintritamaina.org/about" />
            <About />
          </>} />
          <Route path="/contact" element={<>
            <SEO title="Contact St. Rita's Church, Maina" description="Contact the parish office: St Rita's Church Maina, Curtorim, Goa 403709. Phone: 08326638644. Email: st.rita.maina1960@gmail.com" canonical="https://saintritamaina.org/contact" />
            <Contact />
          </>} />
          <Route path="/blog" element={<>
            <SEO title="Parish Blog – St. Rita's Church, Maina" description="Reflections, parish news, and spiritual resources from St. Rita Parish, Maina (Curtorim)." canonical="https://saintritamaina.org/blog" />
            <Blog />
          </>} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* TODO */}
          <Route path="/ministries" element={<div className="p-8 text-center">
            <SEO title="Ministries – St. Rita's Church, Maina" description="Explore parish ministries at St. Rita Parish, Maina." canonical="https://saintritamaina.org/ministries" />
            Ministries - Coming Soon
          </div>} />
          <Route path="/notice-board" element={<>
            <SEO title="Parish Notice Board – St. Rita's Church, Maina" description="Latest announcements, notices, and updates from St. Rita's Church, Maina (Curtorim)." canonical="https://saintritamaina.org/notice-board" />
            <NoticeBoard />
          </>} />
          <Route path="/mass-timings" element={<MassTimes />} />
          <Route path="/events" element={<div className="p-8 text-center">
            <SEO title="Events – St. Rita's Church, Maina" description="Upcoming parish events at St. Rita's Church, Maina (Curtorim)." canonical="https://saintritamaina.org/events" />
            Events - Coming Soon
          </div>} />
          <Route path="/events/:slug" element={<EventDetail />} />
          {/* <Route path="/registration-demo" element={<RegistrationDemo />} /> */}
          {/* <Route path="/admin/registrations" element={<AdminRegistrations />} /> */}
          {/* Placeholder routes - will be implemented later */}
          <Route path="/faith-formation" element={<div className="p-8 text-center">
            <SEO title="Faith Formation – St. Rita's Church, Maina" description="Faith formation programs at St. Rita's Parish, Maina (Curtorim)." canonical="https://saintritamaina.org/faith-formation" noindex />
            Faith Formation - Coming Soon
          </div>} />
          <Route path="/news" element={<div className="p-8 text-center">
            <SEO title="Parish News – St. Rita's Church, Maina" description="Parish news and updates from St. Rita's Church, Maina." canonical="https://saintritamaina.org/news" noindex />
            News - Coming Soon
          </div>} />
          <Route path="/vocations" element={<div className="p-8 text-center">
            <SEO title="Vocations – St. Rita's Church, Maina" description="Vocations and discernment resources at St. Rita Parish, Maina." canonical="https://saintritamaina.org/vocations" noindex />
            Vocations - Coming Soon
          </div>} />
          <Route path="/donate" element={<>
            <SEO title="Donate – St. Rita's Church, Maina" description="Support St. Rita's Church, Maina. Learn about donation options and parish initiatives." canonical="https://saintritamaina.org/donate" />
            <Donate />
          </>} />
          <Route path="/feedback" element={<div className="p-8 text-center">
            <SEO title="Feedback – St. Rita's Church, Maina" description="Share your feedback with St. Rita's Church, Maina." canonical="https://saintritamaina.org/feedback" noindex />
            Feedback - Coming Soon
          </div>} />
          {/* 404 Catch-all route */}
          <Route path="*" element={<>
            <SEO title="Page Not Found – St. Rita's Church, Maina" description="The page you requested was not found on St. Rita's Church website." noindex />
            <NotFound />
          </>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
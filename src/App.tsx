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
            <SEO title="About" description="Learn about our history, clergy, ministries, and mission in Maina, Curtorim, South Goa." canonical="https://saintritamaina.org/about" />
            <About />
          </>} />
          <Route path="/contact" element={<>
            <SEO title="Contact" description="Parish office: St Rita's Church Maina, Curtorim, Goa 403709. Phone: 08326638644. Email: st.rita.maina1960@gmail.com" canonical="https://saintritamaina.org/contact" />
            <Contact />
          </>} />
          <Route path="/blog" element={<>
            <SEO title="Blog" description="Reflections, parish news, and spiritual resources from our parish community." canonical="https://saintritamaina.org/blog" />
            <Blog />
          </>} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* TODO */}
          <Route path="/ministries" element={<div className="p-8 text-center">
            <SEO title="Ministries" description="Explore parish ministries and ways to serve." canonical="https://saintritamaina.org/ministries" />
            Ministries - Coming Soon
          </div>} />
          <Route path="/notice-board" element={<>
            <SEO title="Notice Board" description="Latest announcements, notices, and updates from our parish." canonical="https://saintritamaina.org/notice-board" />
            <NoticeBoard />
          </>} />
          <Route path="/mass-timings" element={<MassTimes />} />
          <Route path="/events" element={<div className="p-8 text-center">
            <SEO title="Events" description="Upcoming parish events and gatherings." canonical="https://saintritamaina.org/events" />
            Events - Coming Soon
          </div>} />
          <Route path="/events/:slug" element={<EventDetail />} />
          {/* <Route path="/registration-demo" element={<RegistrationDemo />} /> */}
          {/* <Route path="/admin/registrations" element={<AdminRegistrations />} /> */}
          {/* Placeholder routes - will be implemented later */}
          <Route path="/faith-formation" element={<div className="p-8 text-center">
            <SEO title="Faith Formation" description="Faith formation programs and catechesis offerings." canonical="https://saintritamaina.org/faith-formation" noindex />
            Faith Formation - Coming Soon
          </div>} />
          <Route path="/news" element={<div className="p-8 text-center">
            <SEO title="News" description="Parish news and updates." canonical="https://saintritamaina.org/news" noindex />
            News - Coming Soon
          </div>} />
            <Route path="/vocations" element={<div className="p-8 text-center">
            <SEO title="Vocations" description="Vocations and discernment resources." canonical="https://saintritamaina.org/vocations" noindex />
            Vocations - Coming Soon
          </div>} />
          <Route path="/donate" element={<>
            <SEO title="Donate" description="Support our parish. Learn about donation options and initiatives." canonical="https://saintritamaina.org/donate" />
            <Donate />
          </>} />
          <Route path="/feedback" element={<div className="p-8 text-center">
            <SEO title="Feedback" description="Share your feedback with our parish team." canonical="https://saintritamaina.org/feedback" noindex />
            Feedback - Coming Soon
          </div>} />
          {/* 404 Catch-all route */}
          <Route path="*" element={<>
            <SEO title="Page Not Found" description="The page you requested was not found." noindex />
            <NotFound />
          </>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
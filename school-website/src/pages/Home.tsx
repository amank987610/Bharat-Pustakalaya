import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notices, setNotices] = useState<any[]>([]);

  const slides = [
    {
      title: 'Welcome to +2 Hari Shankar Singh High School',
      subtitle: 'Excellence in Education Since 1985',
      image: 'linear-gradient(135deg, #1A73E8 0%, #0D47A1 100%)',
    },
    {
      title: 'Shaping Future Leaders',
      subtitle: 'Quality Education for All',
      image: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    },
    {
      title: 'Modern Facilities & Expert Faculty',
      subtitle: 'Your Success is Our Mission',
      image: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    fetch('http://localhost:5000/api/notices')
      .then((res) => res.json())
      .then((data) => setNotices(data.slice(0, 5)))
      .catch((err) => console.error('Error fetching notices:', err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <div className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ background: slide.image }}
          >
            <div className="container mx-auto px-4 h-full flex items-center justify-center">
              <div className="text-center text-white fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-2xl md:text-3xl mb-8">{slide.subtitle}</p>
                <div className="flex justify-center space-x-4">
                  <Link to="/admissions" className="btn-primary">
                    Apply Now
                  </Link>
                  <Link to="/about" className="btn-secondary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link to="/test-reports" className="card bg-primary text-white hover:bg-accent">
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Test Reports</h3>
              <p className="text-sm">View monthly test results</p>
            </div>
          </Link>

          <Link to="/attendance" className="card bg-secondary text-white hover:bg-yellow-600">
            <div className="text-center">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">Attendance</h3>
              <p className="text-sm">Check attendance records</p>
            </div>
          </Link>

          <Link to="/admissions" className="card bg-green-600 text-white hover:bg-green-700">
            <div className="text-center">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Admissions</h3>
              <p className="text-sm">Apply for admission</p>
            </div>
          </Link>

          <Link to="/downloads" className="card bg-purple-600 text-white hover:bg-purple-700">
            <div className="text-center">
              <div className="text-5xl mb-4">📥</div>
              <h3 className="text-xl font-bold mb-2">Downloads</h3>
              <p className="text-sm">Forms & documents</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Principal's Message */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <div className="w-full h-96 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-6xl">
                👨‍🎓
              </div>
            </div>
            <div className="slide-in">
              <h2 className="text-4xl font-bold mb-6 text-primary">Principal's Message</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Dear Students, Parents, and Well-wishers,
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                It gives me immense pleasure to welcome you to +2 Hari Shankar Singh High School, Sharmapur.
                Our institution has been a beacon of quality education for over three decades, nurturing young
                minds and shaping future leaders.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to providing a holistic education that combines academic excellence with
                character building, sports, and extracurricular activities. Our dedicated faculty and modern
                facilities ensure that every student receives the best possible learning experience.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Together, let us strive for excellence and create a brighter future.
              </p>
              <p className="font-bold text-primary">- Principal, HSS Sharmapur</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Board */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Latest Notices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div key={notice.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      notice.priority === 'high'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {notice.category}
                  </span>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{notice.title}</h3>
                <p className="text-gray-600 text-sm">{notice.content.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/notices" className="btn-primary">
              View All Notices
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="fade-in">
              <div className="text-5xl font-bold mb-2">38+</div>
              <p className="text-xl">Years of Excellence</p>
            </div>
            <div className="fade-in">
              <div className="text-5xl font-bold mb-2">2000+</div>
              <p className="text-xl">Students</p>
            </div>
            <div className="fade-in">
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-xl">Qualified Teachers</p>
            </div>
            <div className="fade-in">
              <div className="text-5xl font-bold mb-2">95%</div>
              <p className="text-xl">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a leading educational institution that empowers students with knowledge, skills, and
                values to become responsible global citizens and contribute positively to society.
              </p>
            </div>
            <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-secondary">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide quality education through innovative teaching methods, modern facilities, and a
                nurturing environment that fosters academic excellence, character development, and holistic growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

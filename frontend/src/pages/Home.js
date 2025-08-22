import React from "react"
import { Link } from "react-router-dom"
import AppointmentForm from "../components/AppointmentForm"

const services = [
  {
    id: 1,
    name: "Jaw Surgery",
    description: "The specialty of performing surgical interventions on jaw and facial problems.",
    image: "https://images.unsplash.com/photo-1587502537608-1024f9b9fd1f?q=80&w=800&auto=format&fit=crop",
    icon: "🦷"
  },
  {
    id: 2,
    name: "Filling Treatment",
    description: "Protects the health of damaged teeth by repairing them.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
    icon: "🔧"
  },
  {
    id: 3,
    name: "Teeth Whitening",
    description: "Allows you to have a healthier smile and teeth structure.",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=800&auto=format&fit=crop",
    icon: "✨"
  }
]

const teamMembers = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    role: "General Dentistry",
    image: "https://images.unsplash.com/photo-1606811841689-23dfdd06e0b0?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Dr. James Thompson",
    role: "Orthodontics",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    role: "Cosmetic Dentist",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=400&auto=format&fit=crop"
  }
]

const processSteps = [
  {
    id: 1,
    title: "Book Your Appointment",
    description: "Schedule your visit through our easy online booking system",
    icon: "📅"
  },
  {
    id: 2,
    title: "Consultation & Examination",
    description: "Meet with our experts for a comprehensive dental assessment",
    icon: "👥"
  },
  {
    id: 3,
    title: "Personalized Treatment Plan",
    description: "Receive a customized plan tailored to your specific needs",
    icon: "📋"
  },
  {
    id: 4,
    title: "Ongoing Care & Follow-Up",
    description: "Continuous support and maintenance for your dental health",
    icon: "❤️"
  }
]

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100">
       <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0f2fe' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                Dental Health Polyclinic
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Your Perfect Smile Starts{" "}
                <span className="text-blue-600">Here</span>
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-2xl">
                Get expert dental care in a comfortable setting. Healthy, bright smiles start with us—book your appointment today!
              </p>
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-blue-600 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=400&auto=format&fit=crop"
                    alt="Dr. Daniel Tesfaye"
                    className="w-72 h-72 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="bg-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-2xl lg:text-3xl font-bold">8+</div>
              <div className="text-blue-100 text-sm">Skilled Doctor</div>
            </div>
            <div className="text-white">
              <div className="text-2xl lg:text-3xl font-bold">15+</div>
              <div className="text-blue-100 text-sm">Year Experience</div>
            </div>
            <div className="text-white">
              <div className="text-2xl lg:text-3xl font-bold">25K+</div>
              <div className="text-blue-100 text-sm">Appointment Booked</div>
            </div>
            <div className="text-white">
              <div className="text-2xl lg:text-3xl font-bold">99%</div>
              <div className="text-blue-100 text-sm">Patient Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Booking Form */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Book Your Appointment</h2>
            <p className="mt-4 text-lg text-gray-600">Quick and easy appointment booking</p>
          </div>
          <AppointmentForm />
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Service Comprehensive Services for Your{" "}
              <span className="text-blue-600">Perfect Smile</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              From check-ups to advanced treatments, we provide a variety of dental services for your best smile. Personalized care by our expert team.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{service.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Why Choose Us? Hit the Road with Us for{" "}
                <span className="text-blue-600">Healthy Smiles!</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Looking for a clinic that values healthy smiles? We offer modern, expert care for your oral health.
              </p>
              
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Quality Service</h3>
                    <p className="text-gray-600">Premium dental services you can trust.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Modern Technology</h3>
                    <p className="text-gray-600">Advanced technology for healthier smiles.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Experienced Experts</h3>
                    <p className="text-gray-600">Our team brings years of expertise.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1587502537608-1024f9b9fd1f?q=80&w=800&auto=format&fit=crop"
                alt="Dentist at work"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Team Our{" "}
              <span className="text-blue-600">Professional Team</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Meet our dedicated team of dental professionals committed to providing you with the best care possible.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="mt-2 text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              How It Work Your Journey to the{" "}
              <span className="text-blue-600">Perfect Smile</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Achieve a healthier, brighter smile with expert care and personalized treatments. We're here to help every step of the way.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.id} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"
                alt="Dentist reviewing X-rays"
                className="rounded-2xl shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Contact Us Start Your Journey to a{" "}
                <span className="text-blue-600">Healthy Smile Today!</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Book your appointment now to take the first step towards a healthy smile! Our expert team is waiting for you. Take action now for a healthier mouth and teeth.
              </p>
              
              <div className="mt-8 flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">(000) 000-0000</div>
                  <div className="text-gray-600">Call us anytime</div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/appointments/book"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                  Book Appointment Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home


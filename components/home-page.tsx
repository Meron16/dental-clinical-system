"use client"

export default function HomePage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 py-24 px-4">
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Professional Dental Care</h1>
          <p className="mt-6 max-w-3xl text-xl text-blue-50">
            We provide comprehensive dental services for the whole family. Our experienced dentists and friendly staff
            are dedicated to making your visit as comfortable as possible.
          </p>
          <div className="mt-10 flex space-x-4">
            <button
              onClick={() => setCurrentPage("book-appointment")}
              className="inline-block bg-white py-3 px-6 border border-transparent rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
            >
              Book Appointment
            </button>
            <button
              onClick={() => setCurrentPage("login")}
              className="inline-block bg-blue-600 py-3 px-6 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Dental Care
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              We offer a wide range of dental services to meet all your oral health needs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Preventive Care",
                description: "Regular check-ups, cleanings, and preventive treatments to maintain your oral health.",
              },
              {
                title: "Restorative Dentistry",
                description: "Fillings, crowns, bridges, and implants to restore damaged or missing teeth.",
              },
              {
                title: "Cosmetic Dentistry",
                description: "Teeth whitening, veneers, and other cosmetic treatments to enhance your smile.",
              },
            ].map((service, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900">{service.title}</h3>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


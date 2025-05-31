export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <button className="text-base text-gray-500 hover:text-gray-900">Home</button>
          </div>
          <div className="px-5 py-2">
            <button className="text-base text-gray-500 hover:text-gray-900">Services</button>
          </div>
          <div className="px-5 py-2">
            <button className="text-base text-gray-500 hover:text-gray-900">Our Dentists</button>
          </div>
          <div className="px-5 py-2">
            <button className="text-base text-gray-500 hover:text-gray-900">Contact</button>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">&copy; 2025 DentalCare Clinic. All rights reserved.</p>
      </div>
    </footer>
  )
}


"use client"

import { useState } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const { name, email, phone, subject, message } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear field error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" })
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!name) errors.name = "Name is required"
    if (!email) errors.email = "Email is required"
    if (email && !/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid"
    if (!phone) errors.phone = "Phone number is required"
    if (!subject) errors.subject = "Subject is required"
    if (!message) errors.message = "Message is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      setSubmitError("")

      try {
        // In a real application, you would send this data to your backend
        // await api.post('/api/contact', formData);

        // For now, we'll just simulate a successful submission
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } catch (err) {
        setSubmitError("Failed to send message. Please try again later.")
        console.error(err)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover mix-blend-multiply filter brightness-75"
            src="/images/contact-hero.jpg"
            alt="Contact us"
          />
          <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Contact Us</h1>
          <p className="mt-6 max-w-3xl text-xl text-blue-100">
            Have questions or need to schedule an appointment? Get in touch with our friendly team.
          </p>
        </div>
      </div>

      {/* Contact Information and Form */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Get in Touch</h2>
              <p className="mt-3 text-lg text-gray-500">
                We're here to help with any questions you may have about our dental services or to schedule an
                appointment.
              </p>

              <div className="mt-9">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500">
                    <p>(123) 456-7890</p>
                    <p className="mt-1">Mon-Fri 8am to 6pm</p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500">
                    <p>info@dentalcare.com</p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500">
                    <p>123 Main Street</p>
                    <p className="mt-1">Suite 100</p>
                    <p className="mt-1">Anytown, USA 12345</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Office Hours</h3>
                <div className="mt-3 text-base text-gray-500">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-12 lg:mt-0">
              <div className="bg-white py-10 px-6 shadow rounded-lg sm:px-10">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Send us a message</h3>

                {submitSuccess ? (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Message sent successfully</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    {submitError && (
                      <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                              <p>{submitError}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name *
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={onChange}
                          className={`block w-full shadow-sm sm:text-sm rounded-md ${
                            formErrors.name
                              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        />
                        {formErrors.name && <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email *
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={onChange}
                            className={`block w-full shadow-sm sm:text-sm rounded-md ${
                              formErrors.email
                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                          />
                          {formErrors.email && <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone *
                        </label>
                        <div className="mt-1">
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={phone}
                            onChange={onChange}
                            className={`block w-full shadow-sm sm:text-sm rounded-md ${
                              formErrors.phone
                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                          />
                          {formErrors.phone && <p className="mt-2 text-sm text-red-600">{formErrors.phone}</p>}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject *
                      </label>
                      <div className="mt-1">
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={subject}
                          onChange={onChange}
                          className={`block w-full shadow-sm sm:text-sm rounded-md ${
                            formErrors.subject
                              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        />
                        {formErrors.subject && <p className="mt-2 text-sm text-red-600">{formErrors.subject}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message *
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={message}
                          onChange={onChange}
                          className={`block w-full shadow-sm sm:text-sm rounded-md ${
                            formErrors.message
                              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                        />
                        {formErrors.message && <p className="mt-2 text-sm text-red-600">{formErrors.message}</p>}
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Our Location</h2>
            <p className="mt-3 text-lg text-gray-500">Conveniently located in the heart of downtown.</p>
          </div>
          <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
            <div className="h-96 w-full">
              {/* Replace with an actual map component in a real application */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Map will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact


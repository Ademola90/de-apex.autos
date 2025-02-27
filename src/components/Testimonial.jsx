import React from "react";

const Testimonial = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Adebayo Johnson",
              location: "Lagos",
              testimonial:
                "I purchased my Toyota Camry from AutoElite last year and couldn't be happier. The sales process was smooth, and their after-sales service has been excellent.",
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Ngozi Okonkwo",
              location: "Abuja",
              testimonial:
                "Their car rental service saved my business trip. The vehicle was in perfect condition, and the staff was incredibly helpful with the paperwork.",
              image: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Ibrahim Musa",
              location: "Kano",
              testimonial:
                "The diagnostic team quickly identified an issue that other mechanics missed. They fixed it at a reasonable price, and my car runs better than ever.",
              image: "/placeholder.svg?height=100&width=100",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "{testimonial.testimonial}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

// src/components/TestimonialsSection.jsx
import React, { useRef } from 'react';
// Assuming you have a default image for testimonials like this:
import DefaultTestimonialImage from '../assets/images/hero-bg.jpeg'; // <--- IMPORTANT: Update this path to your actual Hitesh image

const TestimonialsSection = () => {
    const testimonials = [
        {
            image: DefaultTestimonialImage, // Use your actual image here
            quote: "Hitesh is patient and listens to everything carefully. Explains all the queries in easiest and best way possible with examples. I would highly recommend them for all its filings and gst assessments"
        },
        {
            image: DefaultTestimonialImage,
            quote: "This is another testimonial, showcasing the scroll effect better. Great service!"
        },
        {
            image: DefaultTestimonialImage,
            quote: "A further testimonial to fill the carousel for proper testing of scrolling."
        },
        {
            image: DefaultTestimonialImage,
            quote: "Taxellence is highly professional and proactive. They helped me immensely with my financial planning. Highly recommended!"
        },
        {
            image: DefaultTestimonialImage,
            quote: "Excellent communication and deep understanding of tax laws. My go-to for all tax-related queries. Thank you, Taxellence!"
        },
    ];

    const scrollContainerRef = useRef(null); // Ref to the scrollable grid

    // Function to scroll the testimonials grid
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            // Calculate scroll amount based on one card width + gap
            // Using clientWidth for robustness
            const cardWidth = scrollContainerRef.current.querySelector('.testimonial-card').offsetWidth;
            const gap = 32; // This should match your CSS gap (2rem = 32px by default)
            const scrollAmount = cardWidth + gap;

            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth' // Smooth scrolling effect
            });
        }
    };

    return (
        <section className="testimonials-section">
            {/* Tag at the top, like in your image */}
            <span className="testimonials-tag-top">Testimonials</span>

            {/* Main heading for the section */}
            <h2 className="testimonials-main-heading">What Our Clients Say</h2>

            <div className="carousel-wrapper"> {/* New wrapper for carousel functionality */}
                <button className="carousel-arrow carousel-arrow-left" onClick={() => scroll('left')}>
                    &lt; {/* Left arrow icon */}
                </button>

                <div className="testimonials-grid" ref={scrollContainerRef}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-image-wrapper"> {/* Wrapper for image and pseudo-elements */}
                                <img src={testimonial.image} alt={`Client Testimonial ${index + 1}`} className="testimonial-image" />
                                {/* We'll use CSS for the arc and star design on the image */}
                            </div>
                            {/* The screenshot only shows the quote, not name/title in this view */}
                            <p className="testimonial-quote">{testimonial.quote}</p>
                        </div>
                    ))}
                </div>

                <button className="carousel-arrow carousel-arrow-right" onClick={() => scroll('right')}>
                    &gt; {/* Right arrow icon */}
                </button>
            </div>
        </section>
    );
};

export default TestimonialsSection;
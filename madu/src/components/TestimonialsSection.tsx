import { TestimonialCard } from './TestimonialCard';
import honeyBg from "@/assets/honey-bg-6badc9.png";

export const TestimonialsSection = () => {
  const testimonials = [{
    id: 1,
    name: 'Leo',
    position: 'Lead Designer',
    rating: 4,
    text: 'It was a very good experience',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.'
  }, {
    id: 2,
    name: 'Leo',
    position: 'Lead Designer',
    rating: 4,
    text: 'It was a very good experience',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.'
  }, {
    id: 3,
    name: 'Leo',
    position: 'Lead Designer',
    rating: 4,
    text: 'It was a very good experience',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.'
  }];
  return <section className="relative w-full overflow-hidden bg-[#00b8a9] py-12 sm:py-16 md:py-24">
      {/* Background image */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
        <img src={honeyBg} alt="Background tetesan madu alami dari peternakan lebah Madu Margo Lestari - Visualisasi madu murni berkualitas" className="object-cover w-full h-full opacity-40" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section title */}
        <div className="flex flex-wrap justify-center items-baseline mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-[28px] sm:text-4xl md:text-5xl font-bold text-white mr-2 sm:mr-3">
            Apa Kata
          </h2>
          <div className="flex flex-col">
            <h2 className="text-[28px] sm:text-4xl md:text-5xl font-bold text-[#ffde7d]">
              Mereka ?
            </h2>
            <div className="h-1 bg-white w-full mt-2"></div>
          </div>
        </div>
        {/* Testimonial cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {testimonials.map(testimonial => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}
        </div>
      </div>
    </section>;
};
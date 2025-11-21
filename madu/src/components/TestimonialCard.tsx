import { StarRating } from './StarRating';
interface TestimonialProps {
  testimonial: {
    name: string;
    position: string;
    rating: number;
    text: string;
    description: string;
  };
}
export const TestimonialCard = ({
  testimonial
}: TestimonialProps) => {
  return <div className="bg-transparent text-white">
      <div className="flex items-center mb-4">
        <img src="/48b150950ee71be27865d8c487c85b23f237c957.png" alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h3 className="text-xl font-bold text-[#ffde7d]">
            {testimonial.name}
          </h3>
          <p className="text-sm">{testimonial.position}</p>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
      <h4 className="text-xl font-bold text-[#ffde7d] mb-2">
        {testimonial.text}
      </h4>
      <p className="text-sm">{testimonial.description}</p>
    </div>;
};
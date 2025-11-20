interface StarRatingProps {
  rating: number;
  max?: number;
}
export const StarRating = ({
  rating,
  max = 5
}: StarRatingProps) => {
  return <div className="flex">
      {Array.from({
      length: max
    }).map((_, i) => <img key={i} src={i < rating ? "/560d3a7d93af36a4414fd110389982edb8f764b6.svg" : "/85142b4abef895802aa224d25ec646870274fa7d.svg"} alt={i < rating ? 'Filled star' : 'Empty star'} className="w-5 h-5" />)}
    </div>;
};
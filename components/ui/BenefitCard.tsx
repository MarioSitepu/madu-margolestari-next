import type { FC, ReactNode } from 'react';

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const BenefitCard: FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">
        {icon}
      </div>
      
      <h3 className="heading-md text-brand-teal mb-2">
        {title}
      </h3>
      
      <p className="text-body text-brand-black max-w-[366px]">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;
import { formatDate } from '@/utils';

interface DateProps {
  date: string;
}

const CreatedDate = ({date}: DateProps) => {
  return (
    <p className="text-[13px] text-[#8D8585]">
      {formatDate(date)}
    </p>
  );
};

export default CreatedDate;

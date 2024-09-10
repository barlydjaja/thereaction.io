interface DateProps {
  date: string;
}

const CreatedDate = ({date}: DateProps) => {
  return (
    <p className="text-[13px] text-[#8D8585]">
      {new Date(date).toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  );
};

export default CreatedDate;

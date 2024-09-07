interface DateProps {
  date: string;
}

const CreatedDate = ({date}: DateProps) => {
  return (
    <p className="text-[13px] text-gray-700 dark:text-gray-300">
      {new Date(date).toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  );
};

export default CreatedDate;

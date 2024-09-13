interface DescriptionProps {
  text: string;
}

const Description = ({text}: DescriptionProps) => {
  return (
    <p className="mt-1 font-medium text-sm max-h-10 sm:max-h-none overflow-hidden text-ellipsis">{text}</p>
  );
};

export default Description;

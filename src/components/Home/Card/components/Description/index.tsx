interface DescriptionProps {
  text: string;
  maxLen?: number;
}

const Description = ({text, maxLen = 200}: DescriptionProps) => {
  const exceedMaxLen = text.length > maxLen;

  return (
    <p
      className="mt-1 font-medium text-sm max-h-10 sm:max-h-none overflow-hidden text-ellipsis">{exceedMaxLen ? `${text.slice(0, maxLen)}...` : text}</p>
  );
};

export default Description;

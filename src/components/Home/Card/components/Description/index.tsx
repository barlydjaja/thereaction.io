interface DescriptionProps {
  text: string;
}

const Description = ({text}: DescriptionProps) => {
  return (
    <p className="mt-1 font-medium">{text}</p>
  );
};

export default Description;

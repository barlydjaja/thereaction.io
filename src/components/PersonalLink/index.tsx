import Link from 'next/link';
import Image from 'next/image';

const PersonalLink = () => {
  return (
    <span className="relative top-[4px] italic">
      By&nbsp;
      <Link href="https://barlydjaja.com" target="_blank">
        <Image
          alt="Barly Djaja"
          src="https://github.com/barlydjaja.png"
          className="relative -top-1 mx-1 inline h-10 w-10 rounded-full"
          width={40}
          height={40}
        />
      </Link>
    </span>
  );
};

export default PersonalLink;

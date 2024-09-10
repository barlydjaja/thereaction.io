import Image from 'next/image';

interface ThumbnailProps {
  url: string;
}

const Thumbnail = ({url}: ThumbnailProps) => {
  return (
    <div className='w-40 h-24 relative'>
      <Image priority fill alt='thumbnail' src={url} sizes='10rem, 6rem' className='rounded object-cover'/>
    </div>
  );
};

export default Thumbnail;

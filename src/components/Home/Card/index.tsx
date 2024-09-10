import { Post } from '@/api';
import Title from '@/components/Home/Card/components/Title';
import CreatedDate from '@/components/Home/Card/components/CreatedDate';
import Description from '@/components/Home/Card/components/Description';
import Thumbnail from '@/components/Home/Card/components/Thumbnail';

interface CardProps {
  metaData: Post['metaData']
}

const Card = ({metaData}: CardProps) => {
  const {title, date, desc, thumbnail} = metaData;

  return (
    <div className='shadow p-4 flex-grow hover:shadow-lg rounded bg-white border-[1] border-[#dfdfdf] flex gap-8'>
      <section className='flex-1'>
        <CreatedDate date={date} />
        <Title text={title} />
        <Description text={desc} />
      </section>

      <section className='ml-10'>
        <Thumbnail url={thumbnail}/>
      </section>
    </div>
  );
};

export default Card;

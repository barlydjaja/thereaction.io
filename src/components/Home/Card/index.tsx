import { Post } from '@/api';
import Title from '@/components/Home/Card/components/Title';
import CreatedDate from '@/components/Home/Card/components/CreatedDate';
import Description from '@/components/Home/Card/components/Description';
import Thumbnail from '@/components/Home/Card/components/Thumbnail';

const Card = ({metaData, slug}: Post) => {
  const {title, date, desc, thumbnail} = metaData;

  return (
    <div className='shadow p-4 flex-grow hover:shadow-lg rounded bg-white border-[1] border-[#dfdfdf] flex'>
      <section className='flex-1'>
        <CreatedDate date={date} />
        <Title text={title} />
        <Description text={desc} />
      </section>

      <section className='ml-5 sm:ml-10 flex items-start sm:items-center'>
        <Thumbnail url={`/${slug}/${thumbnail}`}/>
      </section>
    </div>
  );
};

export default Card;

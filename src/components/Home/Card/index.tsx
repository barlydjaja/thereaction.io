import { Post } from '@/api';
import Title from '@/components/Home/Card/components/Title';
import CreatedDate from '@/components/Home/Card/components/CreatedDate';
import Description from '@/components/Home/Card/components/Description';
import Thumbnail from '@/components/Home/Card/components/Thumbnail';

const Card = ({metaData, slug}: Post) => {
  const {title, date, desc, thumbnail} = metaData;

  return (
    <div className='group relative p-6 flex-grow rounded-2xl bg-white/5 backdrop-blur-md border border-gray-200/50 hover:border-gray-300/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex overflow-hidden'>
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <section className='flex-1 relative z-10'>
        <CreatedDate date={date} />
        <Title text={title} />
        <Description text={desc} />
      </section>

      {thumbnail && (
        <section className='ml-5 sm:ml-10 flex items-start sm:items-center relative z-10'>
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <Thumbnail url={`/${slug}/${thumbnail}`}/>
          </div>
        </section>
      )}
    </div>
  );
};

export default Card;

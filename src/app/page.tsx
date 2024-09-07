import Link from 'next/link';
import Title from '@/components/Home/Title';
import CreatedDate from '@/components/Home/CreatedDate';
import Description from '@/components/Home/Description';

export default function Home() {
  return (
    <div className="relative -top-[10px] flex flex-col gap-8">
      <Link
        className="block py-4 hover:scale-[1.005]"
        href="/"
      >
        <article>
          <Title text="To Comment or Not To Comment"/>
          <CreatedDate date='1997-09-21'/>
          <Description text="Do we even need comments at all?"/>
        </article>
      </Link>
    </div>
  );
}

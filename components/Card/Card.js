import Link from 'next/link';

export default function Card({ to, title, image, children }) {
  return (
    <div className='relative mt-5 p-3 mx-3 bg-white basis-full rounded-xl md:min-w-[250px] md:max-w-[350px]'>
      <div className='sm:flex md:flex-col'>
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
          className='hidden sm:block sm:min-w-[200px] h-40 rounded-xl'
        ></div>
        <div className='sm:ml-3 md:ml-0'>
          <Link href={to}>
            <div className='p-2 cursor-pointer'>
              <h2 className={'text-gray-700 text-2xl font-bold'}>{title}</h2>
            </div>
          </Link>
          <div className='pl-2'>{children}</div>
        </div>
      </div>
    </div>
  );
}

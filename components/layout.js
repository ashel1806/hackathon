import Head from 'next/head';
import Link from 'next/link';
import NavBar from './NavBar/NavBar';
import {AiOutlineHome, AiFillHome} from 'react-icons/ai'

const name = 'Ashel Vasquez';
export const siteTitle = 'Página de la hackathon';

export default function Layout({
  children,
  home,
}) {
  return (
    <div>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <NavBar />
      <main className='bg-gray-200 h-auto'>
        <div className='max-w-[1440px] mx-auto'>
          {!home && (
            <div className='flex pt-10 pb-8'>
              <Link href="/">              
                <a className='flex p-3 bg-gray-900 opacity-60 hover:opacity-80 rounded-lg text-slate-50'>
                  <div className='inline-text'>
                    <AiOutlineHome className='bg-gray-900' size={30} />
                  </div>
                </a>
              </Link>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

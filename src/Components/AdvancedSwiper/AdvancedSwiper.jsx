// components/AdvancedSwiper.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Typewriter } from 'react-simple-typewriter';

const slides = [
  {
    bg: 'https://i.postimg.cc/WzqpnTmv/ethan-smith-c-JURd-DOJ1-Pk-unsplash.jpg',
    title: 'Discover Delicious Recipes',
    desc: 'Explore unique dishes from chefs worldwide, tailored to your taste.',
  },
  {
    bg: 'https://i.postimg.cc/wvGTL7m2/ethan-smith-m-F-P-Ze-SERc-unsplash.jpg',
    title: 'Add Your Culinary Creations',
    desc: 'Share your best recipes with the community and get appreciated!',
  },
  {
   bg: 'https://i.postimg.cc/766Z5gfb/mila-aq-BKyz-SQu-I-unsplash.jpg',
    title: 'Your Personal Recipe Book',
    desc: 'Save, update, and manage your favorite dishes all in one place.',
  },
];

export default function AdvancedSwiper() {
  return (
    <div className="relative">
      <Swiper
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[70vh]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-full bg-cover bg-center flex items-center justify-center text-center text-white dark:text-white"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              <div className="bg-black/50 dark:bg-black/60 w-full h-full flex flex-col justify-center items-center p-5">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  <Typewriter
                    words={[slide.title]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </h1>
                <p className="max-w-2xl text-lg md:text-xl">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

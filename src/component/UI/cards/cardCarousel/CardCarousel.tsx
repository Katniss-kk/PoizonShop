import style from './CardCarousel.module.css';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { CardItem } from '../..';

import type { CardCarouselProps } from '../../../types';

import 'swiper/swiper.css';
import 'swiper/swiper-bundle.css';

export default function CardCarousel({
  items,
  autoPlay = false,
  showPagination = true,
  loading,
}: CardCarouselProps) {
  const swiperRef = useRef<SwiperType>();
  const [currentPage, setCurrentPage] = useState(1);

  const getSwiperConfig = () => {
    const width = window.innerWidth;

    if (width < 768) {
      return { slidesPerView: 2, slidesPerGroup: 2, itemsPerPage: 2 };
    } else if (width < 1024) {
      return { slidesPerView: 2, slidesPerGroup: 2, itemsPerPage: 2 };
    } else if (width < 1280) {
      return { slidesPerView: 3, slidesPerGroup: 3, itemsPerPage: 3 };
    } else {
      return { slidesPerView: 4, slidesPerGroup: 4, itemsPerPage: 4 };
    }
  };

  const config = getSwiperConfig();
  const totalPages = Math.ceil(items.length / config.itemsPerPage);

  if (loading) {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Загрузка товаров...</h1>
      </div>
    );
  }

  return (
    <div className={style.customSwiperContainer}>
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onSlideChange={swiper => {
          const snapIndex = swiper.snapIndex;
          const newPage =
            Math.floor(
              snapIndex / (config.itemsPerPage / swiper.params.slidesPerGroup!)
            ) + 1;
          setCurrentPage(Math.min(newPage, totalPages));
        }}
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={config.slidesPerView}
        slidesPerGroup={config.slidesPerGroup}
        autoplay={
          autoPlay ? { delay: 3000, disableOnInteraction: false } : false
        }
        loop={false}
        breakpoints={{
          425: {
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
          },
        }}
      >
        {items.map(item => (
          <SwiperSlide
            key={`${item.title}-${item.brand}`}
            className={style.productCard}
          >
            <CardItem
              item={item}
              producCustomtImage={style.producCustomtImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={style.digitalPagination}>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`${style.paginationBtn} ${style.paginationBtnLeft}`}
          disabled={currentPage === 1}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={style.buttonSvg}
          >
            <path d="M8.31624 18C7.87514 17.9999 7.45213 17.8104 7.14027 17.4732L0.486998 10.2821C0.175173 9.94495 0 9.48776 0 9.01105C0 8.53434 0.175173 8.07714 0.486998 7.74001L7.14027 0.548845C7.29371 0.377137 7.47725 0.240177 7.68018 0.145957C7.88311 0.0517366 8.10137 0.0021422 8.32223 6.78793e-05C8.54308 -0.00200644 8.76211 0.0434804 8.96652 0.133875C9.17094 0.224269 9.35665 0.357761 9.51282 0.52656C9.669 0.69536 9.7925 0.896087 9.87614 1.11703C9.95977 1.33797 10.0019 1.5747 9.99994 1.81341C9.99802 2.05212 9.95213 2.28803 9.86496 2.50737C9.77779 2.7267 9.65107 2.92508 9.49221 3.09092L4.0149 9.01105L9.49221 14.9312C9.72476 15.1826 9.88311 15.5029 9.94726 15.8516C10.0114 16.2003 9.97848 16.5617 9.85261 16.8901C9.72675 17.2186 9.51361 17.4993 9.24014 17.6969C8.96668 17.8944 8.64516 17.9999 8.31624 18Z" />
          </svg>
        </button>

        <div className={style.currentPage}>
          {currentPage}/{totalPages}
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className={`${style.paginationBtn} ${style.paginationBtnRight}`}
          disabled={currentPage === totalPages}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={style.buttonSvg}
          >
            <path d="M1.68376 18C1.35484 17.9999 1.03332 17.8944 0.759855 17.6969C0.486389 17.4993 0.273251 17.2186 0.147387 16.8901C0.0215237 16.5617 -0.0114139 16.2003 0.0527363 15.8516C0.116886 15.5029 0.275245 15.1826 0.507793 14.9312L5.9851 9.01105L0.507793 3.09092C0.348929 2.92508 0.222213 2.7267 0.13504 2.50737C0.0478668 2.28803 0.00198196 2.05212 6.27998e-05 1.81341C-0.00185637 1.5747 0.0402297 1.33797 0.123863 1.11703C0.207496 0.896087 0.331003 0.69536 0.487176 0.52656C0.64335 0.357761 0.829062 0.224269 1.03348 0.133875C1.23789 0.0434804 1.45692 -0.00200644 1.67777 6.78793e-05C1.89863 0.0021422 2.11689 0.0517366 2.31982 0.145957C2.52275 0.240177 2.70629 0.377137 2.85973 0.548845L9.513 7.74001C9.82483 8.07714 10 8.53434 10 9.01105C10 9.48776 9.82483 9.94495 9.513 10.2821L2.85973 17.4732C2.54787 17.8104 2.12486 17.9999 1.68376 18Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

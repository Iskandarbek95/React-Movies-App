import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper/core';
import 'swiper/swiper.min.css';
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import './SwiperImg.css';
import { ApiContext } from '../../utils/ApiContext';

SwiperCore.use([Autoplay]);

const SwiperImg = () => {

   const {apiState} = useContext(ApiContext);

    return (
        <div className="swiper-img">
            <Swiper
                spaceBetween={100}
                centeredSlides={true}
                slidesPerView={4}
                autoplay={{
                    "delay": 3000,
                    "disableOnInteraction": false
                }}
            >
                {apiState && apiState.map((item) =>
                    <SwiperSlide key={item.id}>
                        <img src={'https://image.tmdb.org/t/p/w300/' + item.poster_path} alt="" />
                    </SwiperSlide>
                )}

            </Swiper>
        </div>
    );
}

export default SwiperImg;

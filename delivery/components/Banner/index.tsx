import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.css'
import 'swiper/css'
import { Autoplay } from 'swiper'

export const Banner = () => {

    return(
        <div className={styles.container}>
            <Swiper
                className={styles.swiper}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false
                }}
                modules={[Autoplay]}
            >
                <SwiperSlide className={styles.slide}>
                    <img src='/tmp/banner1.png' alt=''/>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <img src='/tmp/banner2.png' alt=''/>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

// import Swiper core and required modules
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import RadioInput from "@/Components/RadioInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";


// Import Swiper styles
import '/resources/css/swiper/swiper.scss';
import '/resources/css/swiper/navigation.scss';
import '/resources/css/swiper/pagination.scss';


export default ({ products, product: selected_product, setProduct, error }) => {
    return (
        <Swiper
            pagination={{
                dynamicBullets: true,
                bulletClass: 'bg-gray-300 dark:bg-slate-200 swiper-pagination-bullet',
            }}
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={5}
            initialSlide={(selected_product-3) || 0}
        >
            {Object.values(products).map((product, key) => (
                <SwiperSlide key={key}>
                    <RadioInput
                        id={`product-`+ product.id}
                        className="hidden peer"
                        name="product"
                        checked={selected_product === product.id}
                        onChange={() => setProduct(product.id)}
                        required
                    />

                    <InputLabel
                        htmlFor={`product-`+ product.id}
                        className={`w-full cursor-pointer border ${error ? 'border-red-200 dark:border-red-800' : 'border-gray-200 dark:border-slate-500'} border-2 rounded-lg peer-checked:border-green-400`}
                    >
                        <div className="p-2">
                            <img src="/storage/logo.png" loading="lazy" alt={product.id} className="h-24 object-cover"/>
                            <hr className="my-2 border-gray-200 dark:border-slate-500"/>
                            <p className="text-center">
                                محصول شماره {product.id}
                            </p>
                        </div>
                    </InputLabel>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

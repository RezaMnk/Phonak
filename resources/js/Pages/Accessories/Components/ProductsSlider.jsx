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
            breakpoints={{
                576: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 5
                },
            }}
            initialSlide={(selected_product-3) || 0}
        >
            {Object.values(products).map((product, key) => (
                <SwiperSlide key={key}>
                    <RadioInput
                        id={`product-`+ product.id}
                        className="hidden peer"
                        name="product"
                        checked={selected_product === product.id}
                        onChange={() => setProduct(product)}
                        required
                    />

                    <InputLabel
                        htmlFor={`product-`+ product.id}
                        className={`w-full bg-gray-100 dark:bg-slate-700 peer-checked:bg-sky-100 peer-checked:dark:bg-sky-900 cursor-pointer border ${error ? 'border-red-200 dark:border-red-800' : 'border-gray-200 dark:border-slate-500'} border-2 rounded-lg peer-checked:border-sky-400`}
                    >
                        <div className="p-2">
                            <img src={product.image_url} loading="lazy" alt={product.id} className="rounded-lg h-full w-full object-cover"/>
                            {product.expire_date && (
                                <>
                                    <hr className="my-2 border-gray-200 dark:border-slate-500"/>
                                    <p className="text-center text-gray-700/70 dark:text-slate-200/70">
                                         تاریخ انقضا:
                                        <bdi className="mr-2">
                                            {product.expire_date}
                                        </bdi>
                                    </p>
                                </>
                            )}
                            <hr className="my-2 border-gray-200 dark:border-slate-500"/>
                            <p className="text-center text-xs font-bold">
                                {product.price.toLocaleString()} تومان
                            </p>
                            <hr className="my-2 border-gray-200 dark:border-slate-500"/>
                            <p className="text-center">
                                {product.name}
                            </p>
                        </div>
                    </InputLabel>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

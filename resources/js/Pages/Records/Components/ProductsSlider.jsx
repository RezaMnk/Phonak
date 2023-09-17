// import Swiper core and required modules
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import RadioInput from "@/Components/RadioInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";


// Import Swiper styles
import '/resources/css/swiper/swiper.scss';
import '/resources/css/swiper/navigation.scss';
import '/resources/css/swiper/pagination.scss';
import CheckboxInput from "@/Components/CheckboxInput.jsx";


export default ({ products, product: selected_product, setProduct, setProductItems, productItems, productsItems, error }) => {
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
                <div key={'div-' + key}>
                    <SwiperSlide key={key}>
                        <RadioInput
                            id={`product-`+ product.id}
                            className="hidden peer"
                            name="product"
                            checked={selected_product === product.id}
                            onChange={() => setProduct(product.id)}
                        />

                        <InputLabel
                            htmlFor={`product-`+ product.id}
                            className={`w-full bg-gray-100 dark:bg-slate-700 peer-checked:bg-sky-100 peer-checked:dark:bg-sky-900 cursor-pointer border ${error ? 'border-red-200 dark:border-red-800' : 'border-gray-200 dark:border-slate-500'} border-2 rounded-lg peer-checked:border-sky-400`}
                        >
                            <div className="p-2">
                                <img src={product.image_url} loading="lazy" alt={product.id} className="rounded-lg h-full w-full object-cover"/>
                                <hr className="my-2 border-gray-200 dark:border-slate-500"/>
                                <p className="text-center text-xs font-bold">
                                    {product.price.toLocaleString()} ریال
                                </p>
                                <hr className="my-2 border-gray-200 dark:border-slate-500"/>
                                <p className="text-center">
                                    {product.name}
                                </p>
                                <hr className="my-2 border-gray-200 dark:border-slate-500"/>
                                <p className="text-center text-xs">
                                    <bdi className="ml-1">کد IRC:</bdi>
                                    {product.irc}
                                </p>
                            </div>
                        </InputLabel>
                    </SwiperSlide>
                    {(selected_product === product.id && product.has_package) && (
                        <SwiperSlide key={'package-' + key}>
                            <CheckboxInput
                                id={`product-package-`+ product.id}
                                className="hidden peer"
                                name="product_package"
                                checked={productItems.includes('package')}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setProductItems([...productItems, 'package']);
                                    } else {
                                        setProductItems(productItems.filter(item => item !== 'package'));
                                    }
                                }}
                            />

                            <InputLabel
                                htmlFor={`product-package-`+ product.id}
                                className={`w-full bg-yellow-50 dark:bg-yellow-800/20 peer-checked:bg-yellow-200 peer-checked:dark:bg-yellow-900 cursor-pointer border ${error ? 'border-red-200 dark:border-red-800' : 'border-yellow-200 dark:border-yellow-700'} border-2 rounded-lg peer-checked:border-yellow-400`}
                            >
                                <div className="p-2">
                                    <img src={product.image_url} loading="lazy" alt={product.id} className="rounded-lg h-full w-full object-cover"/>
                                    <hr className="my-2 border-yellow-200 dark:border-yellow-700"/>
                                    <p className="text-center text-xs font-bold">
                                        {product.package_price.toLocaleString()} ریال
                                    </p>
                                    <hr className="my-2 border-yellow-200 dark:border-yellow-700"/>
                                    <p className="text-center">
                                        پکیج سمعک {product.name}
                                    </p>
                                </div>
                            </InputLabel>
                        </SwiperSlide>
                    )}
                    {(selected_product === product.id && product.has_mold) && (
                        <SwiperSlide key={'mold-' + key}>
                            <CheckboxInput
                                id={`product-mold-`+ product.id}
                                className="hidden peer"
                                name="product_mold"
                                checked={productItems.includes('mold')}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setProductItems([...productItems, 'mold']);
                                    } else {
                                        setProductItems(productItems.filter(item => item !== 'mold'));
                                    }
                                }}
                            />

                            <InputLabel
                                htmlFor={`product-mold-`+ product.id}
                                className={`w-full bg-green-50 dark:bg-green-800/20 peer-checked:bg-green-200 peer-checked:dark:bg-green-900 cursor-pointer border ${error ? 'border-red-200 dark:border-red-800' : 'border-green-200 dark:border-green-700'} border-2 rounded-lg peer-checked:border-green-400`}
                            >
                                <div className="p-2">
                                    <img src={product.image_url} loading="lazy" alt={product.id} className="rounded-lg h-full w-full object-cover"/>
                                    <hr className="my-2 border-green-200 dark:border-green-700"/>
                                    <p className="text-center text-xs font-bold">
                                        {product.mold_price.toLocaleString()} ریال
                                    </p>
                                    <hr className="my-2 border-green-200 dark:border-green-700"/>
                                    <p className="text-center">
                                        قالب سمعک {product.name}
                                    </p>
                                </div>
                            </InputLabel>
                        </SwiperSlide>
                    )}

                </div>
            ))}
        </Swiper>
    );
}

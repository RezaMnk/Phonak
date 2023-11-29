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
import Icon from "@/Components/Icon.jsx";


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
                            className={`w-full relative bg-gray-100 dark:bg-slate-700 peer-checked:bg-sky-100 peer-checked:dark:bg-sky-900 cursor-pointer border ${error ? 'border-red-200 dark:border-red-800' : 'border-gray-200 dark:border-slate-500'} border-2 rounded-lg peer-checked:border-sky-400`}
                        >
                            {selected_product === product.id && (<div className="absolute top-0 right-0">
                                <Icon viewBox="0 0 24 24" type="fill" className="fill-sky-400 dark:fill-sky-400">
                                    <>
                                        <path
                                            d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"/>
                                        <path
                                            d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                            className="fill-white dark:fill-slate-900"/>
                                    </>
                                </Icon>
                            </div>)}
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
                                className={`w-full relative bg-yellow-50 dark:bg-yellow-800/20 peer-checked:bg-yellow-200 peer-checked:dark:bg-yellow-900 cursor-pointer border ${error ? 'border-red-200 dark:border-red-800' : 'border-yellow-200 dark:border-yellow-700'} border-2 rounded-lg peer-checked:border-yellow-400`}
                            >
                                {productItems.includes('package') && (<div className="absolute top-0 right-0">
                                    <Icon viewBox="0 0 24 24" type="fill" className="fill-yellow-400 dark:fill-yellow-400">
                                        <>
                                            <path
                                                d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"/>
                                            <path
                                                d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                className="fill-white dark:fill-slate-900"/>
                                        </>
                                    </Icon>
                                </div>)}
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
                                className={`w-full relative bg-green-50 dark:bg-green-800/20 peer-checked:bg-green-200 peer-checked:dark:bg-green-900 cursor-pointer border ${error ? 'border-red-200 dark:border-red-800' : 'border-green-200 dark:border-green-700'} border-2 rounded-lg peer-checked:border-green-400`}
                            >
                                {productItems.includes('mold') && (<div className="absolute top-0 right-0">
                                    <Icon viewBox="0 0 24 24" type="fill" className="fill-green-400 dark:fill-green-400">
                                        <>
                                            <path
                                                d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"/>
                                            <path
                                                d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                className="fill-white dark:fill-slate-900"/>
                                        </>
                                    </Icon>
                                </div>)}

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
                    {(selected_product === product.id && product.has_charger) && (
                        <SwiperSlide key={'charger-' + key}>
                            <CheckboxInput
                                id={`product-charger-`+ product.id}
                                className="hidden peer"
                                name="product_charger"
                                checked={productItems.includes('charger')}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setProductItems([...productItems, 'charger']);
                                    } else {
                                        setProductItems(productItems.filter(item => item !== 'charger'));
                                    }
                                }}
                            />

                            <InputLabel
                                htmlFor={`product-charger-`+ product.id}
                                className={`w-full bg-violet-50 dark:bg-violet-800/20 peer-checked:bg-violet-200 peer-checked:dark:bg-violet-900 cursor-pointer border ${error ? 'border-red-200 dark:border-red-800' : 'border-violet-200 dark:border-violet-700'} border-2 rounded-lg peer-checked:border-violet-400`}
                            >
                                {productItems.includes('charger') && (<div className="absolute top-0 right-0">
                                    <Icon viewBox="0 0 24 24" type="fill" className="fill-violet-400 dark:fill-violet-400">
                                        <>
                                            <path
                                                d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"/>
                                            <path
                                                d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                className="fill-white dark:fill-slate-900"/>
                                        </>
                                    </Icon>
                                </div>)}

                                <div className="p-2">
                                    <img src={product.image_url} loading="lazy" alt={product.id} className="rounded-lg h-full w-full object-cover"/>
                                    <hr className="my-2 border-violet-200 dark:border-violet-700"/>
                                    <p className="text-center text-xs font-bold">
                                        {product.charger_price.toLocaleString()} ریال
                                    </p>
                                    <hr className="my-2 border-violet-200 dark:border-violet-700"/>
                                    <p className="text-center">
                                        شارژر سمعک {product.name}
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

import { Head } from '@inertiajs/react';
import Icon from "@/Components/Icon.jsx";
import {useRef, useState} from "react";
import Header from "@/Layouts/Components/Header.jsx";
import Footer from "@/Layouts/Components/Footer.jsx";

export default function Welcome() {
    const vidRef = useRef(null);
    const [showPlayBtn, setShowPlayBtn] = useState(true);

    const playVideo = () => {
        setShowPlayBtn(false);
        vidRef.current.play();
    }

    const pauseVideo = () => {
        setShowPlayBtn(false);
        vidRef.current.pause();
    }

    const videoPaused = () => {
        setShowPlayBtn(true);
    }

    return (
        <>
            <Head title="خانه" />

            <div className="w-full min-h-screen bg-white">
                <div className="h-full relative">
                    <Header />
                    <div className="max-w-6xl mx-8 xl:mx-auto mt-12 text-justify bg-gray-100 p-8 rounded-lg border-b-4 leading-8" id="about-us">
                        <h4 className="text-lg text-gray-600 font-bold text-xl mb-6 after:content-[''] after:w-24 after:border-b after:border-2 after:border-sky-500 after:block">
                            درباره ما
                        </h4>
                        <p>
                            شرکت ندا سمعک آشنا (سهامی خاص) در سال 1382 به ثبت رسیده و تا به امروز در زمینه واردات و توزیع سمعک و لوازم کمک شنوایی فعالیت داشته است. این شرکت در
                            آذر ماه سال 1383 به طور رسمی به عنوان نماینده رسمی و انحصاري کمپانی
                            <span className="text-green-500 mx-1">‌فوناك سوئیس‌</span>
                            و به دلیل کسب موفقیت هاي بسیار، در آذر ماه 1401 مسئولیت برند
                            <span className="text-red-500 mx-1">‌هنزاتون آلمان‌</span>
                            (هر دو از برترین برندهاي جهان از مجموعه سونووا) نیز به این شرکت سپرده شد. این شرکت،
                            کلیه این محصولات را در سراسر ایران توزیع و همچنین گارانتی و خدمات آنها را تضمین می نماید. شرکت ندا سمعک آشنا در طول دوره فعالیت خود چندین بار در لیست بهترین
                            و فعال ترین نمایندگان سراسر دنیا قرار گرفته است. این شرکت همواره متعهد بوده است تا کلیه محصولات ارایه شده در کمپانی مادر را به سرعت و همزمان با ارایه آنها در دنیا، در
                            ایران نیز عرضه نماید تا امکان استفاده از تکنولوژي روز دنیا براي هم وطنان عزیز فراهم شود.
                        </p>
                        <p className="mt-2">
                            ندا سمعک آشنا با حضور پرسنل متخصص و مجرب و با بهره مندي از لابراتواري مجهز سعی دارد ارائه گر خدمات مطلوبی باشد.
                        </p>
                        <p className="mt-2">
                            خدمات این شرکت فقط مختص کارشناسان محترم شنوایی شناس می باشد و سیاست هاي شرکت مبتنی بر توزیع عمده محصولات است. لذا مصرف کنندگان محترم جهت تهیه
                            سمعک و لوازم جانبی آنها بایستی به دفاتر مجاز و معتبر ارزیابی شنوایی مراجعه کنند. همچنین دفتر ارزیابی شنوایی آشنا،	کلینیک مرکزي فروش محصولات وابسته به این شرکت
                            است.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-8 xl:mx-auto mt-12 relative">
                        <div className={`absolute z-10 flex items-center justify-center h-full w-full bg-gray-900/70 top-0 left-0 rounded-lg transition-all ${showPlayBtn ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                             onClick={playVideo}
                        >
                            <div className="bg-sky-500/80 hover:bg-sky-500 hover:scale-105 transition-all cursor-pointer p-3 rounded-full h-20 w-20 xl:h-28 xl:w-28 flex items-center justify-center">
                                <Icon viewBox="0 0 24 24" className="!w-12 !h-12 xl:!w-20 xl:!h-20 text-white -mr-2">
                                    <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"/>
                                </Icon>
                            </div>
                        </div>
                        <video ref={vidRef}
                               onPause={videoPaused}
                               onClick={pauseVideo}
                               className="w-full h-full rounded-lg cursor-pointer   "
                        >
                            <source src="/storage/media/neda-samak.mp4" type="video/mp4"/>
                            ساپورت نمیشه
                        </video>
                    </div>
                    <div className="max-w-7xl mx-8 xl:mx-auto mt-24 relative">
                        <div className="flex flex-col xl:flex-row gap-48">
                            <a href="https://phonak.ir" className="w-full xl:w-1/2 bg-gray-50 p-5 rounded-lg transition-all">
                                <img src="/storage/media/phonak.jpg" alt="phonak" className="rounded-lg transition-all" />
                                <div className="mt-5 flex items-center font-semibold text-lg">
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                    <h3 className="px-5 text-center bg-gray-100 border border-gray-300 rounded text-gray-500 transition-all hover:scale-110 hover:text-gray-700 hover:bg-green-100">
                                        وبسایت فوناک
                                    </h3>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                </div>
                            </a>
                            <a href="https://iranhansaton.ir" className="w-full xl:w-1/2 bg-gray-50 p-5 rounded-lg transition-all">
                                <img src="/storage/media/hansaton.jpg" alt="hansaton" className="rounded-lg transition-all" />
                                <div className="mt-5 flex items-center font-semibold text-lg">
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                    <h3 className="px-5 text-center bg-gray-100 border border-gray-300 rounded text-gray-500 transition-all hover:scale-110 hover:text-gray-700 hover:bg-red-100">
                                        وبسایت هنزاتون
                                    </h3>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <Footer />
                </div>

            </div>
        </>
    );
}

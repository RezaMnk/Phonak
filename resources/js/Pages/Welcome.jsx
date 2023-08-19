import { Head } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import Icon from "@/Components/Icon.jsx";
import {useRef, useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Link} from "@inertiajs/inertia-react";

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
                <div>
                    <div className="flex justify-center bg-gray-50 shadow-lg py-5 px-8 md:px-32">
                        <div className="w-1/3"></div>
                        <div className="w-1/3 flex justify-center">
                            <Link href={route('home')}>
                                <ApplicationLogo className="w-64" />
                            </Link>
                        </div>
                        <div className="w-1/3 flex justify-end items-center">
                            <PrimaryButton
                                className="h-fit !px-4 md:px-6"
                                link
                                href={route('login')}
                            >
                                <span className="hidden md:inline-block">
                                    فروشگاه آنلاین
                                </span>
                                <Icon
                                    className="text-white md:mr-3"
                                    type="fill"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.1633 4.09295L15.0612 2.17072C14.1429 1.86721 13.2245 1.96838 12.5102 2.47423C12.2041 2.67657 12 2.87891 11.7959 3.08125H7.91837C6.38776 3.08125 5.06122 4.39646 5.06122 5.91401V6.9257C5.06122 7.33038 5.36735 7.73506 5.87755 7.73506C6.38776 7.73506 6.69388 7.33038 6.69388 6.9257V5.91401C6.69388 5.20582 7.30612 4.69997 7.91837 4.69997H11.2857V19.3696H7.91837C7.20408 19.3696 6.69388 18.7626 6.69388 18.1555V17.1439C6.69388 16.7392 6.38776 16.3345 5.87755 16.3345C5.36735 16.3345 5.06122 16.638 5.06122 17.0427V18.0544C5.06122 19.5719 6.28572 20.8871 7.91837 20.8871H11.7959C12 21.0895 12.2041 21.393 12.4082 21.4942C12.9184 21.7977 13.4286 22 14.0408 22C14.3469 22 14.7551 21.8988 15.0612 21.7977L20.1633 19.8754C21.2857 19.4708 22 18.4591 22 17.245V6.62219C22 5.50933 21.1837 4.39646 20.1633 4.09295Z"/>
                                    <path d="M6.38776 13.5017C6.08163 13.8052 6.08163 14.3111 6.38776 14.6146C6.4898 14.7158 6.69388 14.8169 6.89796 14.8169C7.10204 14.8169 7.30612 14.7158 7.40816 14.6146L9.44898 12.5912C9.55102 12.49 9.55102 12.3889 9.65306 12.3889C9.65306 12.2877 9.7551 12.1865 9.7551 12.0854C9.7551 11.9842 9.7551 11.883 9.65306 11.7819C9.65306 11.6807 9.55102 11.5795 9.44898 11.5795L7.40816 9.55612C7.10204 9.25261 6.59184 9.25261 6.28571 9.55612C5.97959 9.85963 5.97959 10.3655 6.28571 10.669L7 11.3772H2.81633C2.40816 11.3772 2 11.6807 2 12.1865C2 12.6924 2.30612 12.9959 2.81633 12.9959H7.10204L6.38776 13.5017Z"/>
                                </Icon>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="max-w-6xl mx-8 md:mx-auto mt-12 text-justify bg-gray-100 p-8 rounded-lg border-b-4 leading-8">
                        <p>
                            شرکت ندا سمعک آشنا (سهامی خاص) در سال 1382 به ثبت رسیده و تا به امروز در زمینه واردات و توزیع سمعک و لوازم کمک شنوایی فعالیت داشته است. این شرکت در
                            فروردین ماه سال 1383 به طور رسمی به عنوان نماینده رسمی و انحصاري کمپانی
                            <span className="text-green-500 mx-1">‌فوناك سوئیس‌</span>
                            و به دلیل کسب موفقیت هاي بسیار، در آذر ماه 1401 مسئولیت برند
                            <span className="text-red-500 mx-1">‌هنزاتون آلمان‌</span>
                            و در خرداد ماه 1402 نیز نمایندگی محصولات
                            <span className="text-sky-500 mx-1">‌یونیترون کانادا‌</span>
                            (هر سه از برترین برندهاي جهان از مجموعه سونووا) نیز به این شرکت سپرده شد. این شرکت،
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
                    <div className="max-w-4xl mx-8 md:mx-auto mt-12 relative">
                        <div className={`absolute z-10 flex items-center justify-center h-full w-full bg-gray-900/70 top-0 left-0 rounded-lg transition-all ${showPlayBtn ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                             onClick={playVideo}
                        >
                            <div className="bg-sky-500/80 hover:bg-sky-500 hover:scale-105 transition-all cursor-pointer p-3 rounded-full h-20 w-20 md:h-28 md:w-28 flex items-center justify-center">
                                <Icon viewBox="0 0 24 24" className="!w-12 !h-12 md:!w-20 md:!h-20 text-white -mr-2">
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
                    <div className="max-w-7xl mx-8 md:mx-auto mt-24 relative">
                        <div className="flex flex-col md:flex-row gap-24">
                            <a href="https://phonak.ir" className="w-full md:w-1/3 bg-gray-50 p-5 rounded-lg transition-all">
                                <img src="/storage/media/phonak.jpg" alt="phonak" className="rounded-lg transition-all" />
                                <div className="mt-5 flex items-center font-semibold text-lg">
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                    <h3 className="px-5 text-center bg-gray-100 border border-gray-300 rounded text-gray-500 transition-all hover:scale-110 hover:text-gray-700 hover:bg-green-100">
                                        وبسایت فوناک
                                    </h3>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                </div>
                            </a>
                            <a href="https://iranhansaton.ir" className="w-full md:w-1/3 bg-gray-50 p-5 rounded-lg transition-all">
                                <img src="/storage/media/hansaton.jpg" alt="hansaton" className="rounded-lg transition-all" />
                                <div className="mt-5 flex items-center font-semibold text-lg">
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                    <h3 className="px-5 text-center bg-gray-100 border border-gray-300 rounded text-gray-500 transition-all hover:scale-110 hover:text-gray-700 hover:bg-green-100">
                                        وبسایت هنزاتون
                                    </h3>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                </div>
                            </a>
                            <div className="w-full md:w-1/3 bg-gray-50 p-5 rounded-lg transition-all">
                                <img src="/storage/media/unitron.jpg" alt="unitron" className="rounded-lg transition-all" />
                                <div className="mt-5 flex items-center font-semibold text-lg select-none">
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                    <h3 className="px-5 text-center bg-gray-100 border border-gray-300 rounded text-gray-500">
                                        بزودی
                                    </h3>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-12 border-2" />
                    <div className="py-8 bg-gray-100">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                            <h4 className="inline-block text-gray-600 font-bold text-xl">
                                تماس با ما:
                            </h4>
                            <a href="tel:02188530706" dir="ltr" className="bg-sky-500 transition-all hover:bg-sky-600 border-sky-600 text-white text-sm font-bold px-2 py-1 rounded md:mr-32 mt-8 md:mt-0">
                                <Icon viewBox="0 0 512 512" className="inline text-white mr-2" type="fill">
                                    <path d="M337.469,206.488v-79.735l-42.812,7.654v32.814H217.34v-32.814l-42.809-7.654v79.735h-50.883L65.566,333.609   v25.135v18.062v53.512v7.096v10.341c0,10.862,8.016,19.668,17.898,19.668h345.066c9.887,0,17.902-8.806,17.902-19.668v-10.341   v-7.096v-53.512v-18.062v-25.135l-58.82-127.121H337.469z M256,410.493c-39.942,0-72.32-32.38-72.32-72.322   c0-39.942,32.379-72.322,72.32-72.322s72.32,32.38,72.32,72.322C328.32,378.113,295.942,410.493,256,410.493z"/>
                                    <path d="M434.02,70.476c-38.508-16.331-123.258-25.9-178.02-25.9c-53.02,0-139.512,9.568-178.02,25.9   C39.016,87,0,123.985,0,167.556c0,23.89,11.906,38.075,14.754,41.373c0,0,16.304,0,20.652,0h24.308c13.367,0,29.328,0,37.938,0   c4.934,0,15.734-21.419,15.734-30.166c0-15.386-8.148-36.78-8.148-36.78c0.469-10.588,4.676-18.324,21.918-25.736   c31.262-13.438,100.019-14.041,128.844-14.041c28.824,0,97.582,0.604,128.844,14.041c17.242,7.412,21.449,15.148,21.918,25.736   c0,0-8.148,21.394-8.148,36.78c0,8.747,10.801,30.166,15.734,30.166c8.606,0,24.566,0,37.938,0h24.308c4.348,0,20.652,0,20.652,0   c2.848-3.298,14.754-17.484,14.754-41.373C512,123.985,472.984,87,434.02,70.476z"/>
                                </Icon>
                                88 53 07 06
                            </a>
                            <span className="text-sm mt-3 md:mt-0 md:mr-3">
                                (ویژه کارشناسان شنوایی شناس)
                            </span>
                            <a href="tel:02188522485" dir="ltr" className="bg-sky-500 transition-all hover:bg-sky-600 border-sky-600 text-white text-sm font-bold px-2 py-1 rounded md:mr-32 mt-8 md:mt-0">
                                <Icon viewBox="0 0 512 512" className="inline text-white mr-2" type="fill">
                                    <path d="M337.469,206.488v-79.735l-42.812,7.654v32.814H217.34v-32.814l-42.809-7.654v79.735h-50.883L65.566,333.609   v25.135v18.062v53.512v7.096v10.341c0,10.862,8.016,19.668,17.898,19.668h345.066c9.887,0,17.902-8.806,17.902-19.668v-10.341   v-7.096v-53.512v-18.062v-25.135l-58.82-127.121H337.469z M256,410.493c-39.942,0-72.32-32.38-72.32-72.322   c0-39.942,32.379-72.322,72.32-72.322s72.32,32.38,72.32,72.322C328.32,378.113,295.942,410.493,256,410.493z"/>
                                    <path d="M434.02,70.476c-38.508-16.331-123.258-25.9-178.02-25.9c-53.02,0-139.512,9.568-178.02,25.9   C39.016,87,0,123.985,0,167.556c0,23.89,11.906,38.075,14.754,41.373c0,0,16.304,0,20.652,0h24.308c13.367,0,29.328,0,37.938,0   c4.934,0,15.734-21.419,15.734-30.166c0-15.386-8.148-36.78-8.148-36.78c0.469-10.588,4.676-18.324,21.918-25.736   c31.262-13.438,100.019-14.041,128.844-14.041c28.824,0,97.582,0.604,128.844,14.041c17.242,7.412,21.449,15.148,21.918,25.736   c0,0-8.148,21.394-8.148,36.78c0,8.747,10.801,30.166,15.734,30.166c8.606,0,24.566,0,37.938,0h24.308c4.348,0,20.652,0,20.652,0   c2.848-3.298,14.754-17.484,14.754-41.373C512,123.985,472.984,87,434.02,70.476z"/>
                                </Icon>
                                885 22 485
                            </a>
                            <span className="text-sm mt-3 md:mt-0 md:mr-3">
                                (ویژه کارشناسان شنوایی شناس)
                            </span>
                            <a
                                className="md:mr-auto mt-12 md:mt-0"
                                referrerPolicy="origin"
                                target="_blank"
                                href="https://trustseal.enamad.ir/?id=355609&amp;Code=omm4AmHGcPE79InVBReq"
                            >
                                <img
                                referrerPolicy="origin"
                                src="https://Trustseal.eNamad.ir/logo.aspx?id=355609&amp;Code=omm4AmHGcPE79InVBReq"
                                alt="" className="h-24 cursor-pointer" id="omm4AmHGcPE79InVBReq"/>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

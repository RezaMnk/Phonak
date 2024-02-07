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
                <div className="h-full relative">
                    <div className="flex justify-center bg-gray-50 shadow-lg py-5 px-8 xl:px-32">
                        <div className="w-1/3"></div>
                        <div className="w-1/3 flex justify-center">
                            <Link href={route('home')}>
                                <ApplicationLogo className="w-64" />
                            </Link>
                        </div>
                        <div className="w-1/3 flex justify-end items-center">
                            <div className="flex flex-col items-center">
                                <PrimaryButton
                                    className="h-fit !px-4 xl:px-6"
                                    link
                                    href={route('login')}
                                >
                                <span className="hidden xl:inline-block">
                                    پورتال فروش
                                </span>
                                    <Icon
                                        className="text-white xl:mr-3"
                                        type="fill"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.1633 4.09295L15.0612 2.17072C14.1429 1.86721 13.2245 1.96838 12.5102 2.47423C12.2041 2.67657 12 2.87891 11.7959 3.08125H7.91837C6.38776 3.08125 5.06122 4.39646 5.06122 5.91401V6.9257C5.06122 7.33038 5.36735 7.73506 5.87755 7.73506C6.38776 7.73506 6.69388 7.33038 6.69388 6.9257V5.91401C6.69388 5.20582 7.30612 4.69997 7.91837 4.69997H11.2857V19.3696H7.91837C7.20408 19.3696 6.69388 18.7626 6.69388 18.1555V17.1439C6.69388 16.7392 6.38776 16.3345 5.87755 16.3345C5.36735 16.3345 5.06122 16.638 5.06122 17.0427V18.0544C5.06122 19.5719 6.28572 20.8871 7.91837 20.8871H11.7959C12 21.0895 12.2041 21.393 12.4082 21.4942C12.9184 21.7977 13.4286 22 14.0408 22C14.3469 22 14.7551 21.8988 15.0612 21.7977L20.1633 19.8754C21.2857 19.4708 22 18.4591 22 17.245V6.62219C22 5.50933 21.1837 4.39646 20.1633 4.09295Z"/>
                                        <path d="M6.38776 13.5017C6.08163 13.8052 6.08163 14.3111 6.38776 14.6146C6.4898 14.7158 6.69388 14.8169 6.89796 14.8169C7.10204 14.8169 7.30612 14.7158 7.40816 14.6146L9.44898 12.5912C9.55102 12.49 9.55102 12.3889 9.65306 12.3889C9.65306 12.2877 9.7551 12.1865 9.7551 12.0854C9.7551 11.9842 9.7551 11.883 9.65306 11.7819C9.65306 11.6807 9.55102 11.5795 9.44898 11.5795L7.40816 9.55612C7.10204 9.25261 6.59184 9.25261 6.28571 9.55612C5.97959 9.85963 5.97959 10.3655 6.28571 10.669L7 11.3772H2.81633C2.40816 11.3772 2 11.6807 2 12.1865C2 12.6924 2.30612 12.9959 2.81633 12.9959H7.10204L6.38776 13.5017Z"/>
                                    </Icon>
                                </PrimaryButton>
                                <span className="mt-2 text-sm hidden xl:inline-block text-gray-700">
                                    (ویژه متخصصین)
                                </span>
                            </div>
                        </div>
                    </div>
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
                    <footer className="bg-gray-100">
                        <hr className="mt-12 border-2"/>
                        <div
                            className="container mx-auto grid grid-cols-1 xl:grid-cols-3 gap-0 xl:gap-24 py-12 px-3 xl:px-0">
                            <div className="w-full flex flex-col items-center xl:items-start gap-6">
                                <h4 className="inline-block relative text-gray-600 font-bold text-xl mb-6 after:content-[''] after:absolute after:right-1/2 after:translate-x-1/2 xl:after:right-0 xl:after:translate-x-0 after:w-16 after:border-b after:border-2 after:border-sky-500 after:block">
                                    تماس با ما
                                </h4>
                                <div className="whitespace-nowrap">
                                    <a href="tel:02188530706"
                                       className="border-r border-b border-sky-500 bg-gray-200/50 hover:bg-sky-200 px-4 py-1 rounded">
                                        <Icon viewBox="0 0 24 24" type="fill"
                                              className="inline-block !text-gray-600 !w-4 !h-4 ml-4">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M12 11.75C12.4142 11.75 12.75 12.0858 12.75 12.5V13.25H13.5C13.9142 13.25 14.25 13.5858 14.25 14C14.25 14.4142 13.9142 14.75 13.5 14.75H12.75V15.5C12.75 15.9142 12.4142 16.25 12 16.25C11.5858 16.25 11.25 15.9142 11.25 15.5V14.75H10.5C10.0858 14.75 9.75 14.4142 9.75 14C9.75 13.5858 10.0858 13.25 10.5 13.25H11.25V12.5C11.25 12.0858 11.5858 11.75 12 11.75Z"/>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M11.948 1.25C11.0495 1.24997 10.3003 1.24995 9.70552 1.32991C9.07773 1.41432 8.51093 1.59999 8.05546 2.05546C7.59999 2.51093 7.41432 3.07773 7.32991 3.70552C7.24995 4.3003 7.24997 5.04952 7.25 5.948L7.25 6.02572C5.22882 6.09185 4.01511 6.32803 3.17157 7.17158C2 8.34315 2 10.2288 2 14C2 17.7712 2 19.6569 3.17157 20.8284C4.34314 22 6.22876 22 9.99998 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14C22 10.2288 22 8.34315 20.8284 7.17158C19.9849 6.32803 18.7712 6.09185 16.75 6.02572L16.75 5.94801C16.75 5.04954 16.7501 4.3003 16.6701 3.70552C16.5857 3.07773 16.4 2.51093 15.9445 2.05546C15.4891 1.59999 14.9223 1.41432 14.2945 1.32991C13.6997 1.24995 12.9505 1.24997 12.052 1.25H11.948ZM15.25 6.00189V6C15.25 5.03599 15.2484 4.38843 15.1835 3.9054C15.1214 3.44393 15.0142 3.24644 14.8839 3.11612C14.7536 2.9858 14.5561 2.87858 14.0946 2.81654C13.6116 2.7516 12.964 2.75 12 2.75C11.036 2.75 10.3884 2.7516 9.90539 2.81654C9.44393 2.87858 9.24643 2.9858 9.11612 3.11612C8.9858 3.24644 8.87858 3.44393 8.81654 3.9054C8.75159 4.38843 8.75 5.03599 8.75 6V6.00189C9.14203 6 9.55807 6 10 6H14C14.4419 6 14.858 6 15.25 6.00189ZM16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14C8 11.7909 9.79086 10 12 10C14.2091 10 16 11.7909 16 14Z"/>
                                        </Icon>
                                        <bdi>
                                            88 53 07 06
                                        </bdi>
                                        <span className="text-sm mr-3">
                                            ویژه کارشناسان شنوایی شناس
                                        </span>
                                    </a>
                                </div>
                                <div className="whitespace-nowrap">
                                    <a href="tel:02188522485"
                                       className="border-r border-b border-sky-500 bg-gray-200/50 hover:bg-sky-200 px-4 py-1 rounded">
                                        <Icon viewBox="0 0 24 24" type="fill"
                                              className="inline-block !text-gray-600 !w-4 !h-4 ml-4">
                                            <circle cx="12" cy="6" r="4"/>
                                            <path
                                                d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"/>
                                        </Icon>
                                        <bdi>
                                            88 52 24 85
                                        </bdi>
                                        <span className="text-sm mr-3">
                                            ویژه کاربران سمعک
                                        </span>
                                    </a>
                                </div>
                                <div className="whitespace-nowrap">
                                    <a href="tel:02188530706"
                                       className="border-r border-b border-sky-500 bg-gray-200/50 hover:bg-sky-200 px-4 py-1 rounded">
                                        <Icon viewBox="0 0 512 512" type="fill"
                                              className="inline-block !text-gray-600 !w-4 !h-4 ml-4">
                                            <path
                                                d="M379.734355,174.506667 C373.121022,106.666667 333.014355,-2.13162821e-14 209.067688,-2.13162821e-14 C85.1210217,-2.13162821e-14 45.014355,106.666667 38.4010217,174.506667 C15.2012632,183.311569 -0.101643453,205.585799 0.000508304259,230.4 L0.000508304259,260.266667 C0.000508304259,293.256475 26.7445463,320 59.734355,320 C92.7241638,320 119.467688,293.256475 119.467688,260.266667 L119.467688,230.4 C119.360431,206.121456 104.619564,184.304973 82.134355,175.146667 C86.4010217,135.893333 107.307688,42.6666667 209.067688,42.6666667 C310.827688,42.6666667 331.521022,135.893333 335.787688,175.146667 C313.347976,184.324806 298.68156,206.155851 298.667688,230.4 L298.667688,260.266667 C298.760356,283.199651 311.928618,304.070103 332.587688,314.026667 C323.627688,330.88 300.801022,353.706667 244.694355,360.533333 C233.478863,343.50282 211.780225,336.789048 192.906491,344.509658 C174.032757,352.230268 163.260418,372.226826 167.196286,392.235189 C171.132153,412.243552 188.675885,426.666667 209.067688,426.666667 C225.181549,426.577424 239.870491,417.417465 247.041022,402.986667 C338.561022,392.533333 367.787688,345.386667 376.961022,317.653333 C401.778455,309.61433 418.468885,286.351502 418.134355,260.266667 L418.134355,230.4 C418.23702,205.585799 402.934114,183.311569 379.734355,174.506667 Z M76.8010217,260.266667 C76.8010217,269.692326 69.1600148,277.333333 59.734355,277.333333 C50.3086953,277.333333 42.6676884,269.692326 42.6676884,260.266667 L42.6676884,230.4 C42.6676884,224.302667 45.9205765,218.668499 51.2010216,215.619833 C56.4814667,212.571166 62.9872434,212.571166 68.2676885,215.619833 C73.5481336,218.668499 76.8010217,224.302667 76.8010217,230.4 L76.8010217,260.266667 Z M341.334355,230.4 C341.334355,220.97434 348.975362,213.333333 358.401022,213.333333 C367.826681,213.333333 375.467688,220.97434 375.467688,230.4 L375.467688,260.266667 C375.467688,269.692326 367.826681,277.333333 358.401022,277.333333 C348.975362,277.333333 341.334355,269.692326 341.334355,260.266667 L341.334355,230.4 Z"/>
                                        </Icon>
                                        <bdi>
                                            88 54 33 91
                                        </bdi>
                                        <span className="text-sm mr-3">
                                            مدیریت
                                        </span>
                                    </a>
                                </div>
                                <div className="mx-6 xl:mx-0 text-center xl:text-right">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold ml-1">
                                            ساعت پاسخگویی:
                                        </span>
                                        شنبه تا چهارشنبه ۸:۳۰ الی ۱۸
                                        - پنج شنبه ۸:۳۰ الی ۱۳
                                    </p>
                                </div>
                                <div className="mx-6 xl:mx-0 text-center xl:text-right">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold ml-1">
                                            آدرس:
                                        </span>
                                        میدان آرژانتین، خ احمدقصیر، خ 12 غربی (شهید رمضان)، پ 9
                                    </p>
                                </div>
                            </div>
                            <div className="w-full xl:mr-12 flex flex-col items-center xl:items-start gap-6 border-t pt-4 xl:pt-0 mt-4 xl:mt-0 xl:border-0">
                                <h4 className="inline-block relative text-gray-600 font-bold text-xl mb-6 after:content-[''] after:absolute after:right-1/2 after:translate-x-1/2 xl:after:right-0 xl:after:translate-x-0 after:w-24 after:border-b after:border-2 after:border-sky-500 after:block">
                                    لینک های دسترسی
                                </h4>
                                <div>
                                    <Link href={route('home') + "#about-us"} className="text-gray-700 hover:text-sky-600 group">
                                        <Icon viewBox="0 0 24 24" type="fill"
                                              className="inline-block !w-4 !h-4 ml-2 transition-all group-hover:-translate-x-1">
                                            <path
                                                d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"/>
                                        </Icon>
                                        درباره ما
                                    </Link>
                                </div>
                                <div>
                                    <Link href={route('terms') + '#terms'}
                                          className="text-gray-700 hover:text-sky-600 group">
                                        <Icon viewBox="0 0 24 24" type="fill"
                                              className="inline-block !w-4 !h-4 ml-2 transition-all group-hover:-translate-x-1">
                                            <path
                                                d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"/>
                                        </Icon>
                                        قوانین و مقررات
                                    </Link>
                                </div>
                                <div>
                                    <Link href={route('terms') + '#complaints'}
                                          className="text-gray-700 hover:text-sky-600 group">
                                        <Icon viewBox="0 0 24 24" type="fill"
                                              className="inline-block !w-4 !h-4 ml-2 transition-all group-hover:-translate-x-1">
                                            <path
                                                d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"/>
                                        </Icon>
                                        نحوه ثبت شکایات
                                    </Link>
                                </div>
                                <div>
                                    <Link href={route('terms') + '#return-process'}
                                          className="text-gray-700 hover:text-sky-600 group">
                                        <Icon viewBox="0 0 24 24" type="fill"
                                              className="inline-block !w-4 !h-4 ml-2 transition-all group-hover:-translate-x-1">
                                            <path
                                                d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"/>
                                        </Icon>
                                        روند مرجوعی
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full flex gap-24 xl:gap-12 items-center justify-center border-t pt-4 xl:pt-0 mt-4 xl:mt-0 xl:border-0">
                                <img src="/storage/media/zarinpal.png" alt="zarinpal" className="h-24"/>
                                <a
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
                        <div className="w-full border-t border-gray-200 bg-gray-50">
                            <div
                                className="container mx-auto flex flex-col xl:flex-row space-y-5 xl:space-y-0 items-center px-4 sm:px-6 xl:px-0 py-4 text-gray-500 dark:text-slate-400">
                                <div className="w-full xl:w-1/2 text-center xl:text-right">
                                    طراحی و توسعه توسط <a href="https://rahamteam.com"
                                                          className="text-sm text-blue-500 font-semibold">رهام</a>
                                </div>
                                <div
                                    className="w-full xl:w-1/2 flex items-center justify-center xl:justify-start text-xs font-semibold eng-num"
                                    dir="ltr">
                                    <Icon viewBox="0 0 24 24" type="stroke" width="2" className="!w-4 !h-4 inline mr-1">
                                        <path
                                            d="M14 15.6672C13.475 15.8812 12.8952 16 12.2857 16C9.91878 16 8 14.2091 8 12C8 9.79086 9.91878 8 12.2857 8C12.8952 8 13.475 8.11876 14 8.33283"/>
                                        <path
                                            d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"/>
                                    </Icon>
                                    <span className="mt-1">
                                        {new Date().getFullYear()} Neda Samak Ashena. All Rights Reserved.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>

            </div>
        </>
    );
}

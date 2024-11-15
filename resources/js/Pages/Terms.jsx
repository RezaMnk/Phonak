import {Head} from '@inertiajs/react';
import Icon from "@/Components/Icon.jsx";
import {Link} from "@inertiajs/inertia-react";
import Header from "@/Layouts/Components/Header.jsx";
import Footer from "@/Layouts/Components/Footer.jsx";

export default function Terms() {

    return (
        <>
            <Head title="قوانین و مقررات"/>

            <div className="w-full min-h-screen bg-white">
                <div className="h-full">
                    <Header />
                    <div
                        className="max-w-6xl mx-8 xl:mx-auto mt-12 bg-gray-100 p-8 rounded-lg border-b-4 leading-8"
                        id="about-us">
                        <h3 className="text-gray-600 font-bold text-2xl mb-6 after:content-[''] after:w-28 after:border-b after:border-2 after:border-sky-500 after:block">
                            قوانین و مقررات
                        </h3>
                        <p>
                            توجه داشته باشید کلیه اصول و رویه‏‌های ندا سمعک آشنا منطبق با قوانین جمهوری اسلامی ایران، قانون
                            تجارت الکترونیک و قانون حمایت از حقوق مصرف کننده است و متعاقبا کاربر نیز موظف به رعایت
                            قوانین مرتبط با کاربر است. در صورتی که در قوانین مندرج، رویه‏‌ها و سرویس‏‌های ندا سمعک آشنا تغییراتی
                            در آینده ایجاد شود، در همین صفحه منتشر و به روز رسانی می شود و شما توافق می‏‌کنید که استفاده
                            مستمر شما از سایت به معنی پذیرش هرگونه تغییر است.
                        </p>
                        <h4 className="mt-8 text-gray-600 font-bold text-lg mb-6 after:content-[''] after:w-20 after:border-b after:border-2 after:border-sky-500 after:block">
                            ثبت سفارش و خرید
                        </h4>
                        <ol className="list-decimal pr-4">
                           <li>
                               تنها افرادی که تاییدیه مدیریت را دریافت کرده‌اند، مجاز به ثبت سفارش و خرید سمعک برای بیماران هستند.
                           </li>
                           <li>
                               قیمت‌ها، مشخصات فنی و سایر جزئیات مرتبط با سمعک‌ها در وبسایت قرار داده شده‌اند. شما باید قبل از خرید، اطلاعات مربوطه را دقیقاً مورد بررسی قرار دهید.
                           </li>
                        </ol>
                        <h4 className="mt-8 text-gray-600 font-bold text-lg mb-6 after:content-[''] after:w-20 after:border-b after:border-2 after:border-sky-500 after:block">
                            حقوق مالکیت معنوی و استفاده از اطلاعات
                        </h4>
                        <ol className="list-decimal pr-4">
                           <li>
                               کلیه حقوق مالکیت معنوی و محتوای وبسایت متعلق به "ندا سمعک آشنا" می‌باشد.
                           </li>
                           <li>
                               استفاده غیرمجاز از محتوا، اطلاعات یا تصاویر وبسایت ممنوع است و می‌تواند منجر به پیگردهای قانونی شود.
                           </li>
                        </ol>
                        <h4 className="mt-8 text-gray-600 font-bold text-lg mb-6 after:content-[''] after:w-20 after:border-b after:border-2 after:border-sky-500 after:block" id="complaints">
                            نحوه ثبت شکایات
                        </h4>
                        <p>
                            شرکت "ندا سمعک آشنا" با بررسی های متعدد و با استفاده از تجربه کاربران توانسته امکانات کاملی ارائه دهد تا کاربران در محیطی کاملا توسعه یافته از خدمات ما بهره مند شوند. در صورتی که هر گونه مشکلی وجود داشته باشد، می‌توانید با استفاده از شماره تماس <a
                            href="https://wa.me/+989127006168" className="text-sky-600 font-semibold">09127006168</a> از طریق <span className="font-semibold">واتساپ</span> برای ما پیغام گذاشته تا در سریع ترین زمان ممکن به شکایات شما رسیدگی گردد.
                        </p>
                        <h4 className="mt-8 text-gray-600 font-bold text-lg mb-6 after:content-[''] after:w-20 after:border-b after:border-2 after:border-sky-500 after:block">
                            روند استرداد وجه
                        </h4>
                        <p>
                            لطفا دقت فرمایید که سفارشات را قبل از ثبت نهایی،‌ بصورت کامل بررسی نموده تا مغایرتی با کالای درخواستی نداشته باشد. درصورتی که به هر دلیل درخواست مرجوعی و استرداد وجه را داشتید، می‌توانید با استفاده از شماره تماس های درج شده، درخواست خود را در واحد حسابداری ثبت کرده تا فراید استرداد وجه انجام شود.
                        </p>
                        <h4 className="mt-8 text-gray-600 font-bold text-lg mb-6 after:content-[''] after:w-20 after:border-b after:border-2 after:border-sky-500 after:block">
                            مدت زمان تحویل سفارشات
                        </h4>
                        <p>
                            سفارشات بعد از پرداخت و تایید تا حداکثر 10 روز کاری ارسال خواهند شد.
                        </p>
                        <h4 className="mt-8 text-gray-600 font-bold text-lg mb-6 after:content-[''] after:w-20 after:border-b after:border-2 after:border-sky-500 after:block">
                            نحوه پرداخت
                        </h4>
                        <p>
                            پرداخت سفارشات بصورت آنلاین و با استفاده درگاه های واسط صورت می‌گیرد.
                        </p>
                        <h4 className="mt-8 text-gray-600 font-bold text-lg mb-6 after:content-[''] after:w-20 after:border-b after:border-2 after:border-sky-500 after:block">
                            شیوه حمل
                        </h4>
                        <p>
                            شیوه حمل سفارشات با استفاده از شرکت پست و یا پیک به انتخاب همکار شنوایی شناس صورت می‌گیرد که همکار می‌تواند شیوه را به دلخواه خود انتخاب نماید.
                        </p>
                        <h4 className="mt-8 text-gray-600 font-bold text-lg mb-6 after:content-[''] after:w-20 after:border-b after:border-2 after:border-sky-500 after:block">
                            نحوه پشتیبانی و خدمات
                        </h4>
                        <p>
                            تمامی محصولات شرکت "ندا سمعک آشنا" دارای 1 سال گارانتی بین المللی و 5 سال خدمات پس از فروش می‌باشد.
                        </p>
                        <h4 className="mt-8 text-gray-600 font-bold text-lg mb-6 after:content-[''] after:w-20 after:border-b after:border-2 after:border-sky-500 after:block" id="return-process">
                            نحوه فسخ خدمات (روند مرجوعی)
                        </h4>
                        <p>
                            درصورت تایید کارشناسان فروش شرکت، تنها به مدت یک هفته بعد از ثبت سفارشات، می‌توانید خدمات درخواستی را فسخ نمایید.
                        </p>
                    </div>

                    <Footer />
                </div>

            </div>
        </>
    );
}

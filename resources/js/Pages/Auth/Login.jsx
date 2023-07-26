import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import {Head, Link, useForm} from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        med_number: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="ورود" />

            {status && <div className="mb-4 font-medium text-sm text-sky-600">{status}</div>}

            <form onSubmit={submit}>
                <div className="block mt-5">
                    <TextInput
                        id="med_number"
                        type="number"
                        name="med_number"
                        label="شماره نظام پزشکی"
                        value={data.med_number}
                        svgIcon={<path xmlns="http://www.w3.org/2000/svg" d="M12 8V16M8 12H16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"/>}
                        onChange={(e) => setData('med_number', e.target.value)}
                        error={errors.med_number}
                        required
                    />

                    <InputError message={errors.med_number} className="mt-2"/>
                </div>
                <div className="block mt-5">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        label="کلمه عبور"
                        value={data.password}
                        svgIcon={<path
                            d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                            strokeLinecap="round" strokeLinejoin="round"/>}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                        required
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="block mt-3">
                    <div className="inline-block ml-8 mt-2">
                        <CheckboxInput
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />

                        <InputLabel
                            htmlFor="remember"
                            value="به خاطر سپاردن"
                            className="mr-2"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        ورود به حساب کاربری
                    </PrimaryButton>
                    <div className="mt-6 text-center">
                        <Link
                            href={route('register')}
                            className="text-sm text-blue-950 dark:text-blue-300 hover:underline"
                        >
                            ثبت نام و ایجاد حساب کاربری
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}

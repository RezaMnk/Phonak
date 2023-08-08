import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';

export default function ResetPassword({ token }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        national_code: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div className="block mt-5">
                    <TextInput
                        id="national_code"
                        type="number"
                        name="national_code"
                        label="کد ملی"
                        value={data.national_code}
                        svgIcon={<path
                            d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                            strokeLinecap="round" strokeLinejoin="round"/>}
                        autoComplete="national_code"
                        onChange={(e) => setData('national_code', e.target.value)}
                        error={errors.national_code}
                    />

                    <InputError message={errors.national_code} className="mt-2"/>
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
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>
                <div className="block mt-5">
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        label="تکرار کلمه عبور"
                        svgIcon={(
                            <>
                                <path d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13"/>
                                <path d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13"/>
                                <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"/>
                                <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"/>
                            </>
                        )}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        error={errors.password_confirmation}
                        autoComplete="new-password-confirm"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        تایید کلمه عبور جدید
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

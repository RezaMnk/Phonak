import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";

export default function Index({ auth, patients }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={(
                <div className="flex justify-between">
                    <h1 className="font-semibold text-xl text-gray-800 align-middle py-2">بیماران</h1>
                    <TextInput
                        className="py-2 text-sm"
                        label="جستوجو"
                        svgIcon={<path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"></path>}
                        size="1"
                    />
                </div>
            )}
            breadcrumbs={
                {
                    'بیماران': route('patients')
                }
            }
        >
            <Head title="بیماران" />


            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-right text-gray-500">
                    <thead className="text-xs text-gray-700 bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                نام و نام خانوادگی
                            </th>
                            <th scope="col" className="px-6 py-3">
                                کد ملی
                            </th>
                            <th scope="col" className="px-6 py-3">
                                سن
                            </th>
                            <th scope="col" className="px-6 py-3">
                                شماره تماس
                            </th>
                            <th scope="col" className="px-6 py-3">
                                محل سکونت
                            </th>
                            <th scope="col" className="px-6 py-3">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.values(patients).map((patient) => {
                        return (
                            <tr key={patient.id} className="bg-white border-b">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {patient.name}
                                </th>
                                <td className="px-6 py-4">
                                    {patient.national_code}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                                        {patient.age}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {patient.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {patient.state} - {patient.city}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={route('patients.edit', [patient.id])}
                                        className="inline-flex px-2 py-1 text-sm text-center text-yellow-900 transition-colors duration-300 bg-yellow-100 border border-yellow-200 rounded-lg hover:bg-yellow-200 focus:outline-none focus:ring-0 focus:border-yellow-500"
                                    >
                                        ویرایش
                                    </Link>
                                    <Link href={route('patients.edit', [patient.id])}
                                        className="inline-flex mr-3 px-2 py-1 text-sm text-center text-red-900 transition-colors duration-300 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-0 focus:border-red-500"
                                    >
                                        حذف
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>


        </AuthenticatedLayout>
    );
}

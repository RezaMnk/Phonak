import {Link} from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Icon from "@/Components/Icon.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

export default function Header() {
    return (
        <div className="flex justify-center bg-gray-50 shadow-lg py-5 px-8 xl:px-32">
            <div className="w-1/3"></div>
            <div className="w-1/3 flex justify-center">
                <Link href={route('home')}>
                    <ApplicationLogo className="w-64"/>
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
                            <path
                                d="M20.1633 4.09295L15.0612 2.17072C14.1429 1.86721 13.2245 1.96838 12.5102 2.47423C12.2041 2.67657 12 2.87891 11.7959 3.08125H7.91837C6.38776 3.08125 5.06122 4.39646 5.06122 5.91401V6.9257C5.06122 7.33038 5.36735 7.73506 5.87755 7.73506C6.38776 7.73506 6.69388 7.33038 6.69388 6.9257V5.91401C6.69388 5.20582 7.30612 4.69997 7.91837 4.69997H11.2857V19.3696H7.91837C7.20408 19.3696 6.69388 18.7626 6.69388 18.1555V17.1439C6.69388 16.7392 6.38776 16.3345 5.87755 16.3345C5.36735 16.3345 5.06122 16.638 5.06122 17.0427V18.0544C5.06122 19.5719 6.28572 20.8871 7.91837 20.8871H11.7959C12 21.0895 12.2041 21.393 12.4082 21.4942C12.9184 21.7977 13.4286 22 14.0408 22C14.3469 22 14.7551 21.8988 15.0612 21.7977L20.1633 19.8754C21.2857 19.4708 22 18.4591 22 17.245V6.62219C22 5.50933 21.1837 4.39646 20.1633 4.09295Z"/>
                            <path
                                d="M6.38776 13.5017C6.08163 13.8052 6.08163 14.3111 6.38776 14.6146C6.4898 14.7158 6.69388 14.8169 6.89796 14.8169C7.10204 14.8169 7.30612 14.7158 7.40816 14.6146L9.44898 12.5912C9.55102 12.49 9.55102 12.3889 9.65306 12.3889C9.65306 12.2877 9.7551 12.1865 9.7551 12.0854C9.7551 11.9842 9.7551 11.883 9.65306 11.7819C9.65306 11.6807 9.55102 11.5795 9.44898 11.5795L7.40816 9.55612C7.10204 9.25261 6.59184 9.25261 6.28571 9.55612C5.97959 9.85963 5.97959 10.3655 6.28571 10.669L7 11.3772H2.81633C2.40816 11.3772 2 11.6807 2 12.1865C2 12.6924 2.30612 12.9959 2.81633 12.9959H7.10204L6.38776 13.5017Z"/>
                        </Icon>
                    </PrimaryButton>
                    <SecondaryButton
                        className="h-fit !px-4 xl:px-6 mt-2"
                        link
                        href={route('webinar')}
                    >
                        <span className="hidden xl:inline-block">
                            ثبت نام وبینار
                        </span>
                        <Icon
                            className="text-white xl:mr-3"
                            type="stroke"
                            viewBox="0 0 24 24"
                        >
                            <path xmlns="http://www.w3.org/2000/svg" id="Vector"
                                  d="M10.0002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2839 19.7822 18.9076C20 18.4802 20 17.921 20 16.8031V14M16 5L10 11V14H13L19 8M16 5L19 2L22 5L19 8M16 5L19 8"
                                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Icon>
                    </SecondaryButton>
                    {/*<span className="mt-2 text-sm hidden xl:inline-block text-gray-700">*/}
                    {/*    (ویژه متخصصین)*/}
                    {/*</span>*/}
                </div>
            </div>
        </div>
    )
}
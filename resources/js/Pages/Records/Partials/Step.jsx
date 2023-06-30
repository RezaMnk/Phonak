import {Link, usePage} from "@inertiajs/react";
import {Children, cloneElement, isValidElement} from "react";

export default ({ step, currentStep, passedSteps, last = false, icon = <></> }) => {
    let passed = currentStep > step;
    let active = currentStep === step;

    const { props } = usePage();

    let href = passedSteps >= step ? props.ziggy.location + '?step=' + step : false;

    const modifiedIcon = Children.map(icon, (child) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                className: `w-5 h-5 lg:w-6 lg:h-6 ${passed ? 'text-green-600 dark:text-green-300' : active ? 'text-green-700 dark:text-green-100' : 'text-gray-500 dark:text-slate-100'}`,
            });
        }
        return child;
    });
    // noinspection com.haulmont.rcb.ArrayToJSXMapInspection
    return (
        <li className={`flex items-center ${passed ? 'text-green-600 dark:text-green-500 after:border-green-200/70 dark:after:border-green-800/50' : 'text-gray-600 dark:text-slate-500 after:border-gray-200/70 dark:after:border-slate-700'} ${last ? 'w-fit' : "w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block"}`}>
            <Link
                href={href}
                className={`flex items-center justify-center w-10 h-10 ${passed ? 'bg-green-200/70 dark:bg-green-800/50' : active ? 'bg-green-300 dark:bg-green-700' : 'bg-gray-200 dark:bg-slate-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                {modifiedIcon}
            </Link>
        </li>
    );
}

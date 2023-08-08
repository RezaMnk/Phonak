import {forwardRef, useEffect, useRef, useState} from 'react';
import Icon from "@/Components/Icon.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default forwardRef(function FileInput({name = 'file', fileName = null, viewLink = '', accept = '*', className = '', label = '', setData = false, size = '3', isFocused = false, error, ...props}, ref) {
    const input = ref ? ref : useRef();

    const [selectedFileName, setSelectedFileName] = useState(fileName);

    const handleFileChange = (event) => {
        const [file] = event.target.files;
        setSelectedFileName(file.name);

        if (setData)
            setData(event)

    };

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="relative h-full">
            {viewLink && (
                <PrimaryButton
                    link
                    href={viewLink}
                    className="absolute top-0 right-0 !px-4 !py-1 text-sm rounded-none rounded-tr-lg rounded-bl-lg"
                    target="_blank"
                >
                    مشاهده
                </PrimaryButton>
                // <a className="absolute top-0 right-0 px-4 py-1 text-sm text-white bg-sky-500 dark:bg-sky-700 rounded-tr-lg rounded-bl-lg hover:bg-sky-600"
                // href={viewLink}
                // target="_blank"
                // >
                // مشاهده
                // </a>
            )}
            <label
                className={`flex flex-col h-full justify-center items-center w-full p-8 text-center bg-white border-2 ${error ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-slate-700'} border-dashed cursor-pointer dark:bg-slate-900 rounded-xl ` + className}>
                <Icon viewBox="0 0 24 24" type="stroke" className="w-8 h-8">
                    <path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </Icon>

                <h2 className="mt-4 font-medium tracking-wide text-gray-700 dark:text-slate-200">
                    {label}
                </h2>

                {selectedFileName && (
                    <p className="mt-2 text-xs tracking-wide text-gray-700 dark:text-slate-200">
                        {selectedFileName}
                    </p>
                )}

                <p className="mt-5 text-xs border-b border-gray-300 dark:border-slate-500 text-gray-700 dark:text-slate-200">
                    حداکثر سایز جهت آپلود: 512 کیلوبایت
                </p>

                {/*            <div className="flex justify-end w-full mt-2 text-xs bg-gray-100 dark:bg-slate-800 rounded-full">
                <span className="w-[50%] bg-green-300 dark:bg-green-700 animate-pulse rounded-full">
                    50%
                </span>
            </div>*/}

                <input {...props} name={name} accept={accept} id={name} type="file" className="hidden" onChange={handleFileChange} ref={input} />
            </label>
        </div>
    );
});

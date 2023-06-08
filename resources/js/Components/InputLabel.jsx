export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`inline-block font-medium text-sm text-gray-700 dark:text-slate-200 ` + className}>
            {value ? value : children}
        </label>
    );
}

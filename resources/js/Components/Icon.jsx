export default function Icon({children, viewBox = "0 0 20 20", className = '', type = 'stroke', width = '1.5', ...props}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             {...props}
             className={`w-5 h-5 text-gray-500 dark:text-slate-100 ` + className}
             fill={type === 'fill' ? 'currentColor' : 'none'}
             viewBox={viewBox}
             stroke={type === 'stroke' ? 'currentColor' : 'none'}
             strokeWidth={type === 'stroke' ? width : 'none'}
        >
            {children}
        </svg>
    );
}

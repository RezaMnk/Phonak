export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'mt-3 text-xs text-red-400 ' + className}>
            {message}
        </p>
    ) : null;
}

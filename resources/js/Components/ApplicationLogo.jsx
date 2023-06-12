export default function ApplicationLogo({dark, ...props}) {
    return (
        <img {...props} src={dark ? '/storage/logo-white.png' : '/storage/logo.png'} alt="Neda Samak Ashena Logo"/>
    );
}

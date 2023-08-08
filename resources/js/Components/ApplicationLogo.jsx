export default function ApplicationLogo({dark, small = false, ...props}) {
    return small ? (
        <img {...props} src={dark ? '/storage/logo-s-white.png' : '/storage/logo-s.png'} alt="Neda Samak Ashena Logo"/>
    ) : (
        <img {...props} src={dark ? '/storage/logo-white.png' : '/storage/logo.png'} alt="Neda Samak Ashena Logo"/>
    );
}

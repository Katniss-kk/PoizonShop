export default function Logo({ className = '' }) {
    return (
        <svg 
            width="49" 
            height="35" 
            viewBox="0 0 49 35"  
            xmlns="http://www.w3.org/2000/svg" 
            className={`${className}`}
        >
            <path d="M15.9177 0H23.346V35H15.9177V0Z" fillOpacity="0.3"/>
            <path d="M15.9177 0H23.346L7.42826 35H0L15.9177V0Z"/>
            <path d="M31.8355 0H39.2638V35H31.8355V0Z" fillOpacity="0.3"/>
            <path d="M31.8481 0H39.2763L23.3586 35H15.9304L31.8481V0Z"/>
            <path d="M41.5717 13.5919H49L39.2638 35H31.8355L41.5717 13.5919Z"/>
        </svg>
    )
}
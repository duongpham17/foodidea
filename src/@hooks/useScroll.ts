import React, { useEffect, useState } from 'react';

const useScroll = () => {

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
          // Update the scroll position in the state variable
          setScrollY(window.scrollY);
        };
    
        // Attach the event listener when the component mounts
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    
        // Remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        scrollY
    }
}

export default useScroll;
import { useState, useEffect, useRef } from 'react';

const useClickOutsideCancel = (initialState) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setState(initialState);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return [state, setState, ref];
};

export default useClickOutsideCancel;
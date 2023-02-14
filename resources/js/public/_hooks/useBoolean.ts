import { useEffect, useState } from 'react';

export const useBoolean = () => {
    const [state, setState] = useState<boolean>();
  
    const handleTrue = () => setState(true);
    const handleFalse = () => setState(false);
    const handleToggle = () => setState(!state);
  
    return [
      state,
      {
        setTrue: handleTrue,
        setFalse: handleFalse,
        setToggle: handleToggle,
      },
    ];
  };
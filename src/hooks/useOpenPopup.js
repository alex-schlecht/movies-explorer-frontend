import { useCallback, useState } from "react";

export const useOpenPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = useCallback(() => {
    setIsOpen(true);
    console.log(123);
  }, []);

  const closePopup = useCallback(() => { 
    setIsOpen(false);
    console.log(1234);
  }, []);

  return {
    isOpen, 
    openPopup,
    closePopup
  };
};

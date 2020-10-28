import React, { useCallback, useState } from 'react';
import Button from '../../../../components/button';

export const CascadeMenuButton = ({ name, children }) => {
  const [clicked, setClicked] = useState(false);

  const handleOnClick = useCallback(() => {
    setClicked(((prevState) => !prevState));
  }, []);

  return (
    <>
      <Button onClick={handleOnClick}>{name}</Button>
      {clicked && children}
    </>
  );
};

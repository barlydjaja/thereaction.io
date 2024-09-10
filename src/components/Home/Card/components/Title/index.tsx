import React from 'react';
import { sans } from '@/app/fonts';
import cx from 'classnames';

interface TitleProps {
  text: string;
}

const Title = ({text}: TitleProps) => {
  return (
    <h2
      className={cx(
        sans.className,
        "text-md sm:text-2xl font-bold",
      )}
    >
      {text}
    </h2>
  );
};

export default Title;

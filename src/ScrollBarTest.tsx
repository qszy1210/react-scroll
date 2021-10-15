import * as React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

const renderThumb = (props: any) => {
  const {style, ...rest} = props;
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: "rgba(35, 49, 86, 0.8)"
  };
  return <div style={{ ...style, ...thumbStyle }} {...rest} />;
};

const CustomScrollbars = (props: any) => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

export default CustomScrollbars;
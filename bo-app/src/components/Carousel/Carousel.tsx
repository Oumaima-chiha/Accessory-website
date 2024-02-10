import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import './style.css';

interface ICarousel {
  children: JSX.Element[];
  isMultiple?: boolean;
}

const Carousel = ({ children, isMultiple = false }: ICarousel): JSX.Element => {
  const [currentIndex, setSlide] = useState(0);
  return (
    <ReactCarousel
      emulateTouch
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      autoPlay
      selectedItem={currentIndex}
      centerMode={isMultiple}
      centerSlidePercentage={100 / 3}
      onChange={(): void => {
        isMultiple &&
          setSlide((currentIndex + children?.length) % children?.length);
      }}>
      {React.Children.map(children, child => (
        <>{child}</>
      ))}
    </ReactCarousel>
  );
};

export default Carousel;

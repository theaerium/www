"use client";

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from "react";
import CarouselCard from "./CarouselCard";

interface CarouselProps {
  cards: Array<{
    id: string;
    backgroundColor: string;
    imageSrc?: string;
    imageAlt?: string;
    imagePosition?: "center" | "top" | "bottom" | "left" | "right";
    imageSize?: "small" | "medium" | "large" | "full";
    text?: string;
    textColor?: string;
    bottomText?: string;
    bottomTextColor?: string;
    onClick?: () => void;
    customContent?: ReactNode;
  }>;
  className?: string;
}

const Carousel = forwardRef<
  { goToNext: () => void; goToPrevious: () => void },
  CarouselProps
>(({ cards, className = "" }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const [dynamicCardWidth, setDynamicCardWidth] = useState(272);
  const firstCardWrapperRef = useRef<HTMLDivElement>(null);

  const duplicatedCards = [...cards, ...cards, ...cards, ...cards, ...cards];
  const totalCards = cards.length;

  useEffect(() => {
    const calculateCardWidth = () => {
      if (firstCardWrapperRef.current) {
        const width = firstCardWrapperRef.current.getBoundingClientRect().width;
        setDynamicCardWidth(width);
      }
    };

    calculateCardWidth();
    window.addEventListener("resize", calculateCardWidth);

    return () => {
      window.removeEventListener("resize", calculateCardWidth);
    };
  }, [cards]);

  useImperativeHandle(ref, () => ({
    goToNext,
    goToPrevious,
  }));

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      //   if (newIndex >= totalCards) {
      //     // Reset to beginning after transition
      //     setTimeout(() => {
      //       setCurrentIndex(0);
      //       setIsTransitioning(false);
      //     }, 300);
      //     return newIndex;
      //   }
      setTimeout(() => setIsTransitioning(false), 300);
      return newIndex;
    });
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex < 0) {
        // Reset to end after transition
        setTimeout(() => {
          setCurrentIndex(totalCards - 1);
          setIsTransitioning(false);
        }, 300);
        return newIndex;
      }
      setTimeout(() => setIsTransitioning(false), 300);
      return newIndex;
    });
  };

  // Touch/swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startX.current - currentX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Mouse drag handling for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startX.current - currentX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="overflow-hidden flex items-end"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${(currentIndex + totalCards) * dynamicCardWidth}px)`,
            width: `${duplicatedCards.length * dynamicCardWidth}px`,
          }}
        >
          {duplicatedCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="flex-shrink-0 mr-4"
              ref={index === 0 ? firstCardWrapperRef : null}
            >
              <CarouselCard
                backgroundColor={card.backgroundColor}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                imagePosition={card.imagePosition}
                imageSize={card.imageSize}
                text={card.text}
                textColor={card.textColor}
                bottomText={card.bottomText}
                bottomTextColor={card.bottomTextColor}
                onClick={card.onClick}
                customContent={card.customContent}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Carousel.displayName = "Carousel";

export default Carousel;

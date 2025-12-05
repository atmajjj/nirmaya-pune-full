import { ChevronLeft, ChevronRight } from "lucide-react";

interface BackgroundImage {
  url: string;
  title: string;
  description: string;
}

interface LoginSlideshowProps {
  images: BackgroundImage[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export const LoginSlideshow = ({ 
  images, 
  currentIndex, 
  onPrev, 
  onNext, 
  onDotClick 
}: LoginSlideshowProps) => {
  return (
    <>
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand/70 via-brand/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-transparent to-brand/40" />

      {/* Navigation Arrows */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="text-center text-white bg-black/40 backdrop-blur-md rounded-lg px-4 py-2">
          <p className="text-sm font-semibold drop-shadow-md">{images[currentIndex].title}</p>
          <p className="text-xs text-white/80">{images[currentIndex].description}</p>
        </div>
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className={`h-2.5 rounded-full transition-all duration-300 shadow-md ${
                index === currentIndex 
                  ? 'bg-brand-accent w-8' 
                  : 'bg-white/50 w-2.5 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

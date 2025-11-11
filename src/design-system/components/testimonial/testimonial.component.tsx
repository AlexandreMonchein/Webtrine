import React, { useState, useEffect, useCallback, useRef } from "react";
import type {
  TestimonialComponentProps,
  TestimonialCardProps,
} from "./testimonial.types";
import * as S from "./testimonial.styled";

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, position, company, rating, content, avatar, date } =
    testimonial;

  const displayPosition =
    position && company ? `${position} chez ${company}` : position || company;

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <S.Star key={index} $filled={index < rating} aria-hidden="true">
        ★
      </S.Star>
    ));
  };

  return (
    <S.TestimonialCard>
      <S.TestimonialHeader>
        <S.AvatarContainer>
          {avatar ? (
            <img
              src={avatar}
              alt={`Photo de profil de ${name}`}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                if (target.parentNode) {
                  const fallback = document.createElement("div");
                  fallback.className = "avatar-fallback";
                  fallback.textContent = initials;
                  fallback.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--color-primary, #007bff);
                    color: var(--color-on-primary, #ffffff);
                    font-weight: 600;
                    font-size: 1.25rem;
                  `;
                  target.parentNode.appendChild(fallback);
                }
              }}
            />
          ) : (
            <S.AvatarFallback aria-label={`Initiales de ${name}`}>
              {initials}
            </S.AvatarFallback>
          )}
        </S.AvatarContainer>

        <S.TestimonialInfo>
          <S.TestimonialName>{name}</S.TestimonialName>
          {displayPosition && (
            <S.TestimonialPosition>{displayPosition}</S.TestimonialPosition>
          )}
          <S.StarRating role="img" aria-label={`${rating} étoiles sur 5`}>
            {renderStars()}
          </S.StarRating>
        </S.TestimonialInfo>
      </S.TestimonialHeader>

      <S.TestimonialContent cite={name}>{content}</S.TestimonialContent>

      {date && (
        <S.TestimonialFooter>
          <time
            dateTime={date}
            aria-label={`Témoignage publié le ${new Date(date).toLocaleDateString("fr-FR")}`}
          >
            {new Date(date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </S.TestimonialFooter>
      )}
    </S.TestimonialCard>
  );
};

const TestimonialComponent: React.FC<TestimonialComponentProps> = ({
  testimonials,
  autoplay = false,
  autoplayDelay = 5000,
  showPagination = true,
  variant = "default",
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = testimonials.length;
  const canNavigate = totalItems > 1;

  // Navigation functions
  const goToNext = useCallback(() => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [canNavigate, totalItems]);

  const goToPrevious = useCallback(() => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [canNavigate, totalItems]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!canNavigate || index < 0 || index >= totalItems) return;
      setCurrentIndex(index);
    },
    [canNavigate, totalItems]
  );

  // Autoplay logic
  useEffect(() => {
    if (autoplay && canNavigate && !isPaused) {
      autoplayRef.current = setInterval(goToNext, autoplayDelay);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, canNavigate, isPaused, autoplayDelay, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!canNavigate) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case "Home":
          event.preventDefault();
          goToSlide(0);
          break;
        case "End":
          event.preventDefault();
          goToSlide(totalItems - 1);
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [canNavigate, goToPrevious, goToNext, goToSlide, totalItems]);

  // Pause autoplay on hover/focus
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  if (!testimonials.length) {
    return (
      <S.TestimonialContainer className={className}>
        <p>Aucun témoignage disponible.</p>
      </S.TestimonialContainer>
    );
  }

  return (
    <S.TestimonialContainer
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="region"
      aria-label="Carrousel de témoignages"
      tabIndex={0}
    >
      {/* Screen reader announcements */}
      <S.AccessibleContent role="status" aria-live="polite" aria-atomic="true">
        Témoignage {currentIndex + 1} sur {totalItems}
      </S.AccessibleContent>

      <S.TestimonialWrapper
        $currentIndex={currentIndex}
        $totalItems={totalItems}
        role="group"
        aria-label="Témoignages clients"
      >
        {testimonials.map((testimonial, index) => (
          <S.TestimonialSlide
            key={testimonial.id}
            aria-hidden={index !== currentIndex}
            role="tabpanel"
            aria-labelledby={`testimonial-tab-${index}`}
          >
            <TestimonialCard testimonial={testimonial} />
          </S.TestimonialSlide>
        ))}
      </S.TestimonialWrapper>

      {/* Pagination Dots */}
      {showPagination && (
        <S.PaginationContainer
          role="tablist"
          aria-label="Sélection de témoignage"
        >
          {testimonials.map((_, index) => (
            <S.PaginationDot
              key={index}
              $active={index === currentIndex}
              onClick={() => goToSlide(index)}
              aria-label={`Aller au témoignage ${index + 1}`}
              role="tab"
              id={`testimonial-tab-${index}`}
              aria-selected={index === currentIndex}
              type="button"
            />
          ))}
        </S.PaginationContainer>
      )}

      {/* Autoplay indicator */}
      {autoplay && canNavigate && (
        <S.AccessibleContent>
          Carrousel en lecture automatique.
          {isPaused
            ? "En pause."
            : `Changement automatique toutes les ${autoplayDelay / 1000} secondes.`}
          Utilisez les flèches du clavier ou survolez pour contrôler.
        </S.AccessibleContent>
      )}
    </S.TestimonialContainer>
  );
};

export default TestimonialComponent;
export { TestimonialCard };

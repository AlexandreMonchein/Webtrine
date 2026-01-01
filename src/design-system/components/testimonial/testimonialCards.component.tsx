import React, { useCallback, useEffect, useRef, useState } from "react";

import { Title } from "../cards/cardsList.styled";
import {
  AvatarContainer,
  AvatarFallback,
  NavigationContainer,
  PaginationContainer,
  PaginationDot,
  Section,
  Star,
  TestimonialCard,
  TestimonialContent,
} from "./testimonial.styled";
import { Testimonial } from "./testimonial.types";
import {
  CardHeader,
  PublicationDate,
  StarsContainer,
  TestimonialCardsContainer,
  TestimonialCardsSlide,
  TestimonialCardsWrapper,
  UserInfo,
  UserName,
} from "./testimonialCards.styled";
import type {
  TestimonialCardsItemProps,
  TestimonialCardsProps,
} from "./testimonialCards.types";

// Mock response compatible avec fetch API
const mockData = {
  reviews: [
    {
      review_id: "mock-1",
      user: {
        name: "Sophie Martin",
        reviews: 15,
        thumbnail: "https://i.pravatar.cc/150?img=1",
      },
      rating: 5,
      snippet:
        "Service exceptionnel ! Mon chat a été très bien traité pendant mon absence. Je recommande vivement pour la qualité de l'attention portée aux animaux.",
      iso_date: "2025-12-28T10:00:00Z",
    },
    {
      review_id: "mock-2",
      user: {
        name: "Thomas Dubois",
        reviews: 8,
        thumbnail: "https://i.pravatar.cc/150?img=12",
      },
      rating: 5,
      snippet:
        "Parfait pour mon chien ! Communication excellente et beaucoup de photos envoyées pendant le séjour. Mon animal était heureux et détendu.",
      iso_date: "2025-12-25T14:30:00Z",
    },
    {
      review_id: "mock-3",
      user: {
        name: "Marie Leroy",
        reviews: 22,
        thumbnail: "https://i.pravatar.cc/150?img=5",
      },
      rating: 5,
      snippet:
        "Très professionnelle et attentionnée. Mes deux chats ont été choyés. Je n'hésiterai pas à refaire appel à ce service.",
      iso_date: "2025-12-20T09:15:00Z",
    },
    {
      review_id: "mock-4",
      user: {
        name: "Lucas Bernard",
        reviews: 12,
        thumbnail: "https://i.pravatar.cc/150?img=13",
      },
      rating: 4,
      snippet:
        "Bon service dans l'ensemble. Mon chien était bien gardé et semblait content. Quelques retards dans les réponses mais rien de grave.",
      iso_date: "2025-12-18T16:45:00Z",
    },
    {
      review_id: "mock-5",
      user: {
        name: "Emma Petit",
        reviews: 19,
        thumbnail: "https://i.pravatar.cc/150?img=9",
      },
      rating: 5,
      snippet:
        "Je suis ravie ! Mon chat est revenu tout propre et détendu. L'environnement était adapté et sécurisé. Merci pour cette belle expérience !",
      iso_date: "2025-12-15T11:20:00Z",
    },
  ],
};

const mockResponse = {
  ok: true,
  json: async () => mockData,
};

// Hook pour détecter la taille d'écran et déterminer le nombre de cartes par slide
const useResponsiveCardsPerSlide = () => {
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      // Utiliser les mêmes breakpoints que votre système
      if (width >= 1024) {
        // large
        setCardsPerSlide(3);
      } else if (width >= 768) {
        // medium
        setCardsPerSlide(2);
      } else {
        // small
        setCardsPerSlide(1);
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => {
      window.removeEventListener("resize", updateCardsPerSlide);
    };
  }, []);

  return cardsPerSlide;
};

const TestimonialCardsItem: React.FC<TestimonialCardsItemProps> = ({
  testimonial,
}) => {
  const { name, rating, content, avatar, date } = testimonial;

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} $filled={index < rating} aria-hidden="true">
        ★
      </Star>
    ));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <TestimonialCard>
      <CardHeader>
        <AvatarContainer>
          {avatar ? (
            <>
              <img
                src={avatar}
                alt={`profil de ${name}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.parentNode?.querySelector(
                    "[data-fallback]",
                  ) as HTMLElement;
                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
              <AvatarFallback data-fallback style={{ display: "none" }}>
                {initials}
              </AvatarFallback>
            </>
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </AvatarContainer>

        <UserInfo>
          <UserName>{name}</UserName>
          {date && <PublicationDate>{formatDate(date)}</PublicationDate>}
        </UserInfo>
      </CardHeader>

      <StarsContainer>{renderStars()}</StarsContainer>

      <TestimonialContent>{content}</TestimonialContent>
    </TestimonialCard>
  );
};

const TestimonialCards: React.FC<TestimonialCardsProps> = (props) => {
  const { title, dataId, features } = props;
  const { autoplay = false, autoplayDelay = 5000 } = features || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const responsiveCardsPerSlide = useResponsiveCardsPerSlide();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Créer les slides avec le nombre responsive de cartes par slide
  const createSlides = () => {
    const slides = [];
    for (let i = 0; i < testimonials.length; i += responsiveCardsPerSlide) {
      slides.push(testimonials.slice(i, i + responsiveCardsPerSlide));
    }
    return slides;
  };

  const slides = createSlides();
  const totalSlides = slides.length;

  // Reset currentIndex si nécessaire quand cardsPerSlide change
  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(0);
    }
  }, [responsiveCardsPerSlide, currentIndex, totalSlides]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides],
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Gestion du swipe pour mobile/tablette ET souris pour test
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, [nextSlide, prevSlide]);

  // Handlers souris pour tester sur ordinateur
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, [nextSlide, prevSlide]);

  const handleMouseLeaveContainer = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Gestion de l'autoplay
  useEffect(() => {
    if (autoplay && totalSlides > 1) {
      intervalRef.current = setInterval(nextSlide, autoplayDelay);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }

    return () => clearInterval(intervalRef.current!);
  }, [autoplay, autoplayDelay, nextSlide, totalSlides]);

  // Cleanup de l'interval
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Pause autoplay au hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && totalSlides > 1) {
      intervalRef.current = setInterval(nextSlide, autoplayDelay);
    }
  };

  // Fonction pour charger les reviews depuis l'API
  const fetchGoogleReviews = useCallback(
    async (dataId: string) => {
      try {
        const apiUrl =
          process.env.NODE_ENV === "production"
            ? "/api/reviews"
            : "http://localhost:3001/api/reviews";

        const response =
          process.env.NODE_ENV === "production"
            ? await fetch(`${apiUrl}?dataId=${dataId}`)
            : mockResponse;

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des reviews");
        }

        const data = await response.json();

        // Transformer les reviews SerpAPI en format Testimonial
        if (data.reviews && Array.isArray(data.reviews)) {
          const transformedTestimonials: Testimonial[] = data.reviews.map(
            (review: any, index: number) => ({
              id: review.review_id || `review-${index}`,
              name: review.user?.name || "Utilisateur anonyme",
              position: review.user?.reviews
                ? `${review.user.reviews} avis`
                : undefined,
              onTouchStart: handleTouchStart,
              onTouchMove: handleTouchMove,
              onTouchEnd: handleTouchEnd,
              rating: review.rating || 5,
              content: review.snippet || "",
              avatar: review.user?.thumbnail || undefined,
              date: review.iso_date || review.date || undefined,
            }),
          );

          setTestimonials(transformedTestimonials);
        }

        return data;
      } catch (error) {
        console.error("Erreur au chargement des reviews:", error);
        return [];
      }
    },
    [handleTouchEnd, handleTouchMove, handleTouchStart],
  );

  useEffect(() => {
    if (dataId) {
      fetchGoogleReviews(dataId);
    }
  }, [fetchGoogleReviews, dataId]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {title ? <Title>{title}</Title> : null}
      <TestimonialCardsContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeaveContainer}
      >
        <TestimonialCardsWrapper $currentIndex={currentIndex}>
          {slides.map((slide) => (
            <TestimonialCardsSlide key={slide.map((t) => t.id).join("-")}>
              {slide.map((testimonial) => (
                <TestimonialCardsItem
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </TestimonialCardsSlide>
          ))}
        </TestimonialCardsWrapper>

        {totalSlides > 1 && (
          <NavigationContainer>
            <PaginationContainer>
              {slides.map((slide, index) => (
                <PaginationDot
                  key={slide.map((t) => t.id).join("-")}
                  $active={index === currentIndex}
                  onClick={() => goToSlide(index)}
                  aria-label={`Aller au slide ${index + 1}`}
                />
              ))}
            </PaginationContainer>
          </NavigationContainer>
        )}
      </TestimonialCardsContainer>
    </Section>
  );
};

export default TestimonialCards;

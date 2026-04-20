import { useLazyLoad } from "../../../hooks/useLazyLoad";

interface LazyComponentProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
}

export const LazyComponent = ({
  children,
  placeholder = null,
}: LazyComponentProps) => {
  const { elementRef, isVisible } = useLazyLoad({
    threshold: 0,
    rootMargin: "0px",
    triggerOnce: true,
  });

  return (
    <div ref={elementRef} style={{ minHeight: isVisible ? "auto" : "400px" }}>
      {isVisible ? children : placeholder}
    </div>
  );
};

export default LazyComponent;

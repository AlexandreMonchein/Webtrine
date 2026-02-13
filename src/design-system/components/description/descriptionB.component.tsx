import { useRef } from "react";

import styles from "./descriptionB.module.css";
import type { DescriptionBProps } from "./descriptionB.types";

const DescriptionB = ({ datas }: DescriptionBProps) => {
  const { media, title, description, "data-testid": dataTestid } = datas;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section className={styles.descriptionBRoot} data-testid={dataTestid}>
      {/* Left side - Media */}
      <div className={styles.mediaContainer}>
        {media.type === "image" ? (
          <img
            src={media.src}
            alt={media.alt || title}
            className={styles.media}
          />
        ) : (
          <video
            ref={videoRef}
            src={media.src}
            className={styles.media}
            autoPlay
            loop
            muted
            playsInline
            onClick={handleVideoClick}
            aria-label={media.alt || title}
            style={{ cursor: "pointer" }}
          >
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        )}
      </div>

      {/* Right side - Text content */}
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>{title}</h2>
        <hr className={styles.separator} />
        <div className={styles.descriptionContainer}>
          {description.map((item) => (
            <p key={item.text} className={styles.paragraph}>
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DescriptionB;

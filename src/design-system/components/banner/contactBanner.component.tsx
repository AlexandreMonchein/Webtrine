import classNames from "classnames";

import styles from "./contactBanner.module.css";
import type { ContactBannerProps } from "./contactBanner.types";

const ContactBanner = ({ datas }: ContactBannerProps) => {
  const { title, media, infoTitle, content, "data-testid": dataTestid } = datas;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className={styles.contactBannerRoot}
      data-testid={dataTestid || "contact-banner"}
    >
      {/* Title Section */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      {/* Media Section with Info Overlay */}
      <div className={styles.mediaContainer}>
        {media.type === "image" ? (
          <img
            src={media.src}
            alt={media.alt || "Contact banner image"}
            className={styles.media}
          />
        ) : (
          <video
            src={media.src}
            autoPlay
            loop
            muted
            playsInline
            className={styles.media}
          >
            <track kind="captions" />
          </video>
        )}

        {/* Information Box Overlay */}
        <div className={styles.infoBox}>
          <h3 className={styles.infoTitle}>{infoTitle}</h3>
          <div className={styles.separator} />
          <div className={styles.infoContent}>
            {content.map((item, index) => (
              <p
                key={`contactBanner-text-${index}`}
                className={classNames(styles.infoText, {
                  [styles.infoTextWithSpacer]: item.withSpacer,
                })}
              >
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className={styles.buttonContainer}>
        <button
          onClick={scrollToTop}
          type="button"
          className={styles.backToTopButton}
          aria-label="Back to top"
        >
          ↑ Retour en haut
        </button>
      </div>
    </section>
  );
};

export default ContactBanner;

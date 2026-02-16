import emailjs from "@emailjs/browser";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { showPopUp } from "../../../store/state.action";
import PopUp from "../popup/popUp.component";
import styles from "./tattooContact.module.css";
import type {
  Artist,
  FormData,
  TattooContactProps,
} from "./tattooContact.types";

export const TattooContact = ({ datas }: TattooContactProps) => {
  const {
    artists,
    serviceId,
    templateId,
    replyTo,
    "data-testid": dataTestid,
  } = datas;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [artistInput, setArtistInput] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoErrors, setPhotoErrors] = useState<string[]>([]);

  useEffect(() => emailjs.init("OYqEmnhZaB6k1hEGB"), []);

  // Pre-select artist from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get("artist");

    if (artistName && !selectedArtist) {
      const matchedArtist = artists.find(
        (artist) => artist.artistName === artistName,
      );

      if (matchedArtist) {
        setArtistInput(artistName);
        setSelectedArtist(matchedArtist);
      }
    }
  }, [artists, selectedArtist]);

  const validatePhotos = useCallback(
    (files: FileList | null): File[] => {
      if (!files) return [];

      const validFiles: File[] = [];
      const errors: string[] = [];
      const maxSize = 2 * 1024 * 1024; // 2MB
      const maxFiles = 5;

      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          errors.push(`${file.name}: ${t("contact.tattoo.errorNotImage")}`);
          return;
        }

        if (file.size > maxSize) {
          errors.push(`${file.name}: ${t("contact.tattoo.errorTooLarge")}`);
          return;
        }

        if (validFiles.length < maxFiles) {
          validFiles.push(file);
        } else {
          errors.push(t("contact.tattoo.errorMaxFiles"));
        }
      });

      setPhotoErrors(errors);
      return validFiles;
    },
    [t],
  );

  const handlePhotoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const validatedPhotos = validatePhotos(e.target.files);
      setPhotos((prev) => {
        const combined = [...prev, ...validatedPhotos];
        return combined.slice(0, 5); // Limit to 5 photos
      });
    },
    [validatePhotos],
  );

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleArtistSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setArtistInput(value);

      // Check if the value matches an artist name
      const matchedArtist = artists.find(
        (artist) => artist.artistName === value,
      );

      if (matchedArtist) {
        setSelectedArtist(matchedArtist);
      } else {
        setSelectedArtist(null);
      }
    },
    [artists],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isSubmitting || !selectedArtist) return;

      setIsSubmitting(true);

      const formElement = e.target as HTMLFormElement;
      const formData: FormData = {
        artistName: selectedArtist.artistName,
        artistMail: selectedArtist.mail || "",
        email: (formElement.elements.namedItem("email") as HTMLInputElement)
          .value,
        name: (formElement.elements.namedItem("name") as HTMLInputElement)
          .value,
        phone: (formElement.elements.namedItem("phone") as HTMLInputElement)
          .value,
        object: (formElement.elements.namedItem("object") as HTMLInputElement)
          .value,
        description: (
          formElement.elements.namedItem("description") as HTMLTextAreaElement
        ).value,
        tattooSize: (
          formElement.elements.namedItem("tattooSize") as HTMLInputElement
        ).value,
        tattooZone: (
          formElement.elements.namedItem("tattooZone") as HTMLInputElement
        ).value,
        availability: (
          formElement.elements.namedItem("availability") as HTMLInputElement
        ).value,
        budget:
          (formElement.elements.namedItem("budget") as HTMLInputElement)
            ?.value || "",
        photos,
      };

      try {
        // Convert photos to base64 for email attachment
        const photoPromises = photos.map((photo) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(photo);
          });
        });

        const photoBase64 = await Promise.all(photoPromises);

        await emailjs.send(serviceId, templateId, {
          ...formData,
          photos: photoBase64.join(","),
          photoNames: photos.map((p) => p.name).join(", "),
          replyTo,
        });

        dispatch(
          showPopUp({
            type: "success",
            message: t("contact.emailSentSuccess"),
          }),
        );

        formElement.reset();
        setPhotos([]);
        setPhotoErrors([]);
        setSelectedArtist(null);
        setArtistInput("");
      } catch (error) {
        dispatch(
          showPopUp({
            type: "error",
            message: t("contact.emailSentError"),
          }),
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      isSubmitting,
      selectedArtist,
      photos,
      serviceId,
      templateId,
      replyTo,
      dispatch,
      t,
    ],
  );

  return (
    <section className={styles.tattooContactRoot} data-testid={dataTestid}>
      <PopUp />
      <div className={styles.container}>
        <h1 className={styles.title}>{t("contact.tattoo.title")}</h1>
        <p className={styles.description}>{t("contact.tattoo.description")}</p>

        {selectedArtist ? (
          <>
            <div className={styles.selectedArtistBanner}>
              <span className={styles.selectedArtistLabel}>
                {t("contact.tattoo.selectedArtist")}:
              </span>
              <strong className={styles.selectedArtistName}>
                {selectedArtist.artistName}
              </strong>
              <button
                type="button"
                className={styles.changeArtistButton}
                onClick={() => {
                  setSelectedArtist(null);
                  setArtistInput("");
                  // Clear artist param from URL
                  const url = new URL(window.location.href);
                  url.searchParams.delete("artist");
                  window.history.replaceState({}, "", url.toString());
                }}
                aria-label={t("contact.tattoo.changeArtist")}
              >
                {t("contact.tattoo.change")}
              </button>
            </div>

            {selectedArtist.mail ? (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formGrid}>
                  {/* Email */}
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>
                      {t("contact.email")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-email">
                      {t("contact.emailHint")}
                    </p>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={styles.input}
                      placeholder={t("contact.emailPlaceholder")}
                      required
                      aria-describedby="hint-email"
                      aria-required="true"
                    />
                  </div>

                  {/* Name */}
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>
                      {t("contact.name")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-name">
                      {t("contact.nameHint")}
                    </p>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={styles.input}
                      placeholder={t("contact.namePlaceholder")}
                      required
                      aria-describedby="hint-name"
                      aria-required="true"
                    />
                  </div>

                  {/* Phone */}
                  <div className={styles.field}>
                    <label htmlFor="phone" className={styles.label}>
                      {t("contact.phone")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-phone">
                      {t("contact.phoneHint")}
                    </p>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={styles.input}
                      placeholder={t("contact.phonePlaceholder")}
                      required
                      aria-describedby="hint-phone"
                      aria-required="true"
                    />
                  </div>

                  {/* Object */}
                  <div className={classNames(styles.field, styles.fieldFull)}>
                    <label htmlFor="object" className={styles.label}>
                      {t("contact.tattoo.object")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-object">
                      {t("contact.tattoo.objectHint")}
                    </p>
                    <input
                      type="text"
                      id="object"
                      name="object"
                      className={styles.input}
                      placeholder={t("contact.tattoo.objectPlaceholder")}
                      required
                      aria-describedby="hint-object"
                      aria-required="true"
                    />
                  </div>

                  {/* Description */}
                  <div className={classNames(styles.field, styles.fieldFull)}>
                    <label htmlFor="description" className={styles.label}>
                      {t("contact.content")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-description">
                      {t("contact.tattoo.descriptionHint")}
                    </p>
                    <textarea
                      id="description"
                      name="description"
                      className={styles.textarea}
                      placeholder={t("contact.tattoo.descriptionPlaceholder")}
                      rows={6}
                      required
                      aria-describedby="hint-description"
                      aria-required="true"
                    />
                  </div>

                  {/* Tattoo Size */}
                  <div className={styles.field}>
                    <label htmlFor="tattooSize" className={styles.label}>
                      {t("contact.tattoo.size")} (cm){" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-tattooSize">
                      {t("contact.tattoo.sizeHint")}
                    </p>
                    <input
                      type="text"
                      id="tattooSize"
                      name="tattooSize"
                      className={styles.input}
                      placeholder={t("contact.tattoo.sizePlaceholder")}
                      required
                      aria-describedby="hint-tattooSize"
                      aria-required="true"
                    />
                  </div>

                  {/* Tattoo Zone */}
                  <div className={styles.field}>
                    <label htmlFor="tattooZone" className={styles.label}>
                      {t("contact.tattoo.zone")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-tattooZone">
                      {t("contact.tattoo.zoneHint")}
                    </p>
                    <input
                      type="text"
                      id="tattooZone"
                      name="tattooZone"
                      className={styles.input}
                      placeholder={t("contact.tattoo.zonePlaceholder")}
                      required
                      aria-describedby="hint-tattooZone"
                      aria-required="true"
                    />
                  </div>

                  {/* Photos (optional) */}
                  <div className={classNames(styles.field, styles.fieldFull)}>
                    <label htmlFor="photos" className={styles.label}>
                      {t("contact.tattoo.photos")}
                    </label>
                    <p className={styles.hint} id="hint-photos">
                      {t("contact.tattoo.photosHint")}
                    </p>
                    <input
                      type="file"
                      id="photos"
                      name="photos"
                      className={styles.inputFile}
                      accept="image/*"
                      multiple
                      onChange={handlePhotoChange}
                      aria-describedby="hint-photos"
                      disabled={photos.length >= 5}
                    />

                    {photoErrors.length > 0 && (
                      <ul
                        className={styles.errorList}
                        role="alert"
                        aria-live="polite"
                      >
                        {photoErrors.map((error) => (
                          <li key={error} className={styles.errorItem}>
                            {error}
                          </li>
                        ))}
                      </ul>
                    )}

                    {photos.length > 0 && (
                      <div className={styles.photoPreviewContainer}>
                        {photos.map((photo, idx) => (
                          <div key={photo.name} className={styles.photoPreview}>
                            <span className={styles.photoName}>
                              {photo.name}
                            </span>
                            <button
                              type="button"
                              className={styles.removePhotoButton}
                              onClick={() => removePhoto(idx)}
                              aria-label={`${t("contact.tattoo.removePhoto")} ${photo.name}`}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Availability */}
                  <div className={styles.field}>
                    <label htmlFor="availability" className={styles.label}>
                      {t("contact.tattoo.availability")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-availability">
                      {t("contact.tattoo.availabilityHint")}
                    </p>
                    <input
                      type="text"
                      id="availability"
                      name="availability"
                      className={styles.input}
                      placeholder={t("contact.tattoo.availabilityPlaceholder")}
                      required
                      aria-describedby="hint-availability"
                      aria-required="true"
                    />
                  </div>

                  {/* Budget (optional) */}
                  <div className={styles.field}>
                    <label htmlFor="budget" className={styles.label}>
                      {t("contact.tattoo.budget")}
                    </label>
                    <p className={styles.hint} id="hint-budget">
                      {t("contact.tattoo.budgetHint")}
                    </p>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      className={styles.input}
                      placeholder={t("contact.tattoo.budgetPlaceholder")}
                      aria-describedby="hint-budget"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? t("contact.sending") : t("contact.send")}
                </button>
              </form>
            ) : (
              <div className={styles.noMailContainer}>
                <p className={styles.noMailMessage}>
                  {t("contact.tattoo.noMailMessage")}
                </p>
                <a
                  href={`mailto:${replyTo}?subject=${encodeURIComponent(
                    `${t("contact.tattoo.mailSubject")} ${selectedArtist.artistName}`,
                  )}`}
                  className={styles.mailtoButton}
                  aria-label={t("contact.tattoo.openMailApp")}
                >
                  {t("contact.tattoo.openMail")}
                </a>
              </div>
            )}
          </>
        ) : (
          <div className={styles.artistSelection}>
            <h2 className={styles.sectionTitle}>
              {t("contact.tattoo.selectArtist")}
            </h2>
            <div className={styles.field}>
              <label htmlFor="artist-select" className={styles.label}>
                {t("contact.tattoo.artistLabel")}
                <span className={styles.required} aria-label="requis">
                  *
                </span>
              </label>
              <p id="artist-hint" className={styles.hint}>
                {t("contact.tattoo.artistHint")}
              </p>
              <select
                id="artist-select"
                value={artistInput}
                onChange={handleArtistSelectChange}
                className={styles.select}
                required
                aria-describedby="artist-hint"
              >
                <option value="" disabled>
                  {t("contact.tattoo.artistPlaceholder")}
                </option>
                {artists.map((artist) => (
                  <option key={artist.artistName} value={artist.artistName}>
                    {artist.artistName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TattooContact;

import emailjs from "@emailjs/browser";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useImageUpload } from "../../../hooks/useImageUpload.hooks";
import { showPopUp } from "../../../store/state.action";
import { getClient } from "../../../store/state.selector";
import { AlertView } from "../alertview/alertview.component";
import PopUp from "../popup/popUp.component";
import styles from "./tattooContact.module.css";
import type { Artist, TattooContactProps } from "./tattooContact.types";

export const TattooContact = ({ datas }: TattooContactProps) => {
  const { artists, logo, features, "data-testid": dataTestid } = datas;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [artistInput, setArtistInput] = useState("");
  const [alert, setAlert] = useState<{
    visible: boolean;
    title: string;
    description: string;
    ctaText: string;
    ctaIcon: string;
    logo: string;
  } | null>(null);
  const client = useSelector(getClient).contact;
  const { mailTemplate: templateId } = client;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadImages,
    uploadStoredImagesToCloud,
    images,
    errors: photoErrors,
    totalSize,
    maxSize,
    maxPhotos,
    removeImage,
    clearImages,
  } = useImageUpload({
    feature: features?.imagesDisplay || {
      type: "attachment",
    },
    t,
  });

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

  const handlePhotoChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      await uploadImages(e.target.files);
      // Reset input to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [uploadImages],
  );

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

      const formElement = e.target as HTMLFormElement;

      // Additional JavaScript validation before submission
      const formData = new FormData(formElement);
      const email = formData.get("fromEmail") as string;
      const phone = formData.get("phone") as string;
      const name = formData.get("name") as string;

      // Email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        dispatch(
          showPopUp({
            type: "error",
            message: "Veuillez entrer une adresse email valide",
          }),
        );
        return;
      }

      // Phone validation (10 characters, only numbers, +, -, spaces, parentheses)
      const phoneRegex = /^[0-9+\s()-]{10,10}$/;
      if (!phoneRegex.test(phone)) {
        dispatch(
          showPopUp({
            type: "error",
            message:
              "Veuillez entrer un numéro de téléphone valide (10 chiffres)",
          }),
        );
        return;
      }

      // Name validation (2-100 characters, letters only)
      const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,100}$/;
      if (!nameRegex.test(name)) {
        dispatch(
          showPopUp({
            type: "error",
            message:
              "Veuillez entrer un nom valide (2-100 caractères, lettres uniquement)",
          }),
        );
        return;
      }

      // Image validation (at least 1 image required)
      if (images.length === 0) {
        dispatch(
          showPopUp({
            type: "error",
            message: "Veuillez uploader au moins 1 image",
          }),
        );
        return;
      }

      setIsSubmitting(true);

      try {
        let imagesToSend: Array<File | string> = images;

        // If cloud mode and images are File objects, upload to Cloudinary first
        if (
          features?.imagesDisplay?.type === "cloud" &&
          images.length > 0 &&
          images[0] instanceof File
        ) {
          const { urls, errors: uploadErrors } =
            await uploadStoredImagesToCloud();

          if (uploadErrors.length > 0) {
            throw new Error(`Image upload failed: ${uploadErrors.join(", ")}`);
          }

          imagesToSend = urls;
        }

        // Create FormData manually with all form fields + compressed photos
        const manualFormData = new FormData();

        // Add all text fields from the form
        const formData = new FormData(formElement);
        for (const [key, value] of formData.entries()) {
          if (key !== "photos") {
            manualFormData.append(key, value);
          }
        }

        // Handle images based on mode (attachment vs cloud)
        if (imagesToSend.length > 0) {
          if (imagesToSend[0] instanceof File) {
            // Attachment mode: Add File objects as attachments
            imagesToSend.forEach((image) => {
              if (image instanceof File) {
                manualFormData.append("photos", image, image.name);
              }
            });
          } else {
            // Cloud mode: Add URLs for display in email template
            imagesToSend.forEach((imageUrl, index) => {
              if (typeof imageUrl === "string") {
                manualFormData.append(`photoUrl_${index}`, imageUrl);
              }
            });
            // Add comma-separated list of URLs for easy iteration in template
            const urlsList = imagesToSend
              .filter((img): img is string => typeof img === "string")
              .join(",");
            manualFormData.set("photoUrls", urlsList);
          }
        }

        // Add photo count and upload mode flags for template conditions
        manualFormData.set("photoCount", imagesToSend.length.toString());
        const isCloudMode = features?.imagesDisplay?.type === "cloud";
        manualFormData.set("isCloudMode", isCloudMode ? "true" : "");
        manualFormData.set("isAttachmentMode", isCloudMode ? "" : "true");

        // Add EmailJS required fields
        manualFormData.append("lib_version", "4.3.3");
        manualFormData.append(
          "service_id",
          import.meta.env.VITE_MAIL_SERVICE_ID,
        );
        manualFormData.append("template_id", templateId);
        manualFormData.append("user_id", "OYqEmnhZaB6k1hEGB");

        // Send directly to EmailJS API
        const apiResponse = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send-form",
          {
            method: "POST",
            body: manualFormData,
          },
        );

        if (!apiResponse.ok) {
          throw new Error(`EmailJS API error: ${apiResponse.status}`);
        }

        setAlert({
          visible: true,
          logo: logo,
          title: t("alertView.contact.title"),
          description: t("alertView.contact.description"),
          ctaText: t("alertView.contact.close"),
          ctaIcon: "arrowRight",
        });

        formElement.reset();
        clearImages();
      } catch (error) {
        console.error("Email sending error:", error);
        console.error("Error details:", {
          message: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        });
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
      dispatch,
      images,
      features?.imagesDisplay?.type,
      templateId,
      logo,
      t,
      clearImages,
      uploadStoredImagesToCloud,
    ],
  );

  const hasValidEmailForForm =
    selectedArtist?.mail && !selectedArtist.mail.startsWith("mailto:");

  const handleCloseAlert = useCallback(() => {
    setAlert(null);
    navigate("/");
  }, [navigate]);

  return (
    <section className={styles.tattooContactRoot} data-testid={dataTestid}>
      <PopUp />
      {alert?.visible && (
        <AlertView
          title={alert.title}
          description={alert.description}
          ctaText={alert.ctaText}
          ctaIcon={alert.ctaIcon}
          ctaPosition="right"
          logo={alert.logo}
          onClose={handleCloseAlert}
        />
      )}
      <div className={styles.container}>
        <h1 className={styles.title}>{t("contact.tattoo.title")}</h1>
        <p className={styles.description}>{t("contact.tattoo.description")}</p>
        <div>
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

        {selectedArtist && (
          <>
            {hasValidEmailForForm ? (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                {/* Hidden fields for EmailJS template variables */}
                <input
                  type="hidden"
                  name="artistName"
                  value={selectedArtist.artistName}
                />
                <input
                  type="hidden"
                  name="artistMail"
                  value={selectedArtist.mail || "webtrine.pro@gmail.com"}
                />
                <input
                  type="hidden"
                  name="replyTo"
                  value={selectedArtist.mail || "webtrine.pro@gmail.com"}
                />
                <input
                  type="hidden"
                  name="photoCount"
                  value={images.length.toString()}
                />

                <div className={styles.formGrid}>
                  {/* Email */}
                  <div className={styles.field}>
                    <label htmlFor="fromEmail" className={styles.label}>
                      {t("contact.email")}{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <p className={styles.hint} id="hint-email">
                      {t("contact.emailHint")}
                    </p>
                    <input
                      type="email"
                      id="fromEmail"
                      name="fromEmail"
                      className={styles.input}
                      placeholder={t("contact.emailPlaceholder")}
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Veuillez entrer une adresse email valide (exemple@domaine.com)"
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
                      minLength={2}
                      maxLength={100}
                      pattern="[a-zA-ZÀ-ÿ\s'-]{2,100}"
                      title="Veuillez entrer un nom valide (2-100 caractères, lettres uniquement)"
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
                      pattern="[0-9+\s()-]{8,20}"
                      title="Veuillez entrer un numéro de téléphone valide (8-20 chiffres, +, espaces, - et parenthèses acceptés)"
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
                      pattern="[0-9x\s,.-]{1,20}"
                      title="Veuillez entrer une taille valide (ex: 10x15, 5-10, etc.)"
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

                  {/* Photos (required) */}
                  <div className={classNames(styles.field, styles.fieldFull)}>
                    <label htmlFor="photos" className={styles.label}>
                      {t("contact.tattoo.photos")}
                      <span className={styles.required} aria-label="requis">
                        *
                      </span>
                    </label>
                    <p className={styles.hint} id="hint-photos">
                      {t("contact.tattoo.photosHint")}
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="photos"
                      name="photos"
                      className={styles.inputFile}
                      accept="image/*"
                      multiple
                      onChange={handlePhotoChange}
                      aria-describedby="hint-photos"
                      disabled={images.length >= maxPhotos}
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

                    {images.length > 0 && (
                      <div className={styles.photoPreviewContainer}>
                        {images.map((image, idx) => {
                          const imageName =
                            image instanceof File ? image.name : image;
                          return (
                            <div
                              key={imageName}
                              className={styles.photoPreview}
                            >
                              <span className={styles.photoName}>
                                {imageName}
                              </span>
                              <button
                                type="button"
                                className={styles.removePhotoButton}
                                onClick={() => removeImage(idx)}
                                aria-label={`${t("contact.tattoo.removePhoto")} ${imageName}`}
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}

                        {/* Size indicator - only for attachment mode */}
                        {features?.imagesDisplay?.type === "attachment" &&
                          (() => {
                            const percentage = Math.min(
                              (totalSize / maxSize) * 100,
                              100,
                            );
                            const totalSizeKB = (totalSize / 1024).toFixed(0);
                            const maxSizeKB = (maxSize / 1024).toFixed(0);

                            return (
                              <div className={styles.sizeIndicator}>
                                <div className={styles.sizeText}>
                                  <span className={styles.sizeLabel}>
                                    {t("contact.tattoo.totalSize")}:
                                  </span>
                                  <span
                                    className={classNames(styles.sizeValue, {
                                      [styles.sizeWarning]: percentage > 80,
                                      [styles.sizeDanger]: percentage > 95,
                                    })}
                                  >
                                    {totalSizeKB} KB / {maxSizeKB} KB
                                  </span>
                                </div>
                                <div className={styles.sizeBarContainer}>
                                  <div
                                    className={classNames(styles.sizeBar, {
                                      [styles.sizeBarWarning]: percentage > 80,
                                      [styles.sizeBarDanger]: percentage > 95,
                                    })}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })()}
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
                  href={
                    selectedArtist.mail?.includes("mailto")
                      ? selectedArtist.mail
                      : `mailto:${selectedArtist.mail}?subject=${encodeURIComponent(
                          `${t("contact.tattoo.mailSubject")} ${selectedArtist.artistName}`,
                        )}`
                  }
                  className={styles.mailtoButton}
                  aria-label={t("contact.tattoo.openMailApp")}
                >
                  {t("contact.tattoo.openMail")}
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TattooContact;

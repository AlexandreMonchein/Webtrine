import { getCustomer } from "../../../customer.utils";
import styles from "./team.module.css";
import type { TeamProps } from "./team.types";

export const Team = ({ preTitle, title, description, members }: TeamProps) => {
  const customer = getCustomer();

  return (
    <section className={styles.teamRoot} data-testid="teamRoot">
      <div className={styles.container}>
        {(preTitle || title || description) && (
          <div className={styles.header}>
            {preTitle && <p className={styles.preTitle}>{preTitle}</p>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}

        {members && members.length > 0 && (
          <div className={styles.membersGrid}>
            {members.map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className={styles.memberCard}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={`${import.meta.env.BASE_URL}assets/${customer}/${member.image}.webp`}
                    alt={member.imageAlt}
                    className={styles.memberImage}
                  />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                {member.position && (
                  <p className={styles.memberPosition}>{member.position}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;

import styles from "@/styles/announcements.module.css";

const Announcements = ({ announcements }) => {
  return (
    <div className={styles.container}>
      <div className={styles.newsContainer}>
        {announcements.map((announcement, index) => (
          <div key={index} className={styles.newsItem}>
            <span>{announcement}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;

// Components/navbar.tsx
import React, { useEffect, useState } from 'react';
import styles from '../home/home.module.css';
import eventBus from './eventBus';

interface HomeContentProps {
  toggleSidebar: () => void;
  toggleMenu: () => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ toggleSidebar, toggleMenu }) => {
  const [imageUrl, setImageUrl] = useState('/avatar.png');

  useEffect(() => {
    const handleImageChange = (newImageUrl: string) => {
      setImageUrl(newImageUrl);
    };

    eventBus.subscribe('imageChange', handleImageChange);
    return () => {
      eventBus.unsubscribe('imageChange', handleImageChange);
    };
  }, []);

  return (
    <section className={styles.home}>
      <div className={styles.home_content}>
        <i className={`${styles.menu} bx bx-menu`} onClick={toggleSidebar} />
        <div className={styles.home_icon_container}>
          <img
            src={imageUrl}
            className={styles.user_pic}
            onClick={toggleMenu}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeContent;

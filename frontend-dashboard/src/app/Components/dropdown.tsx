// Components/dropdown.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../home/home.module.css';
import { useRouter } from 'next/navigation';
import eventBus from './eventBus';

interface DropdownProps {
  isMenuOpen: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ isMenuOpen }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('/avatar.png');
  const [userName, setUserName] = useState('Houcine');

  useEffect(() => {
    const handleImageChange = (newImageUrl: string) => {
      setImageUrl(newImageUrl);
    };

    eventBus.subscribe('imageChange', handleImageChange);
    return () => {
      eventBus.unsubscribe('imageChange', handleImageChange);
    };
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div
      className={`${styles.sub_menu_wrap} ${isMenuOpen ? styles.open_menu : ''}`}
      id="subMenu"
    >
      <div className={styles.sub_menuu}>
        <div className={styles.user_info}>
          <img src={imageUrl} />
          <h5>{userName}</h5>
        </div>
        <hr />
        <Link href="/home/EditProfile" className={styles.sub_menu_link}>
          <img src="/profile.png" />
          <p>Modifier Profile</p>
          <i className="bx bx-chevron-right"></i>
        </Link>
        <Link href="/" className={styles.sub_menu_link} onClick={handleLogout}>
          <img src="/logout.png" />
          <p>Se déconnecter</p>
          <i className="bx bx-chevron-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;

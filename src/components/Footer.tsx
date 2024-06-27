import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      {new Date().getFullYear()} Anne-Hyeyeon. All rights reserved.
    </div>
  );
};

export default Footer;

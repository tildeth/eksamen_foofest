import React from 'react';
import LandingPageTop from '@/components/LandingPageTop';
import styles from '@/styles/Index.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <LandingPageTop />
        <h1 className={styles.landingh1}>Velkommen til FooFest!</h1>
        <p className={styles.landingp}>
          Vi glæder os til at byde dig velkommen til festivalen. Tjek vores
          bands, billetter, og campingmuligheder for at få den bedste oplevelse.
        </p>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  return {
      props: {
          title: "Forside", 
          description: "Velkommen til FooFest 2025!"
      }
  };
}
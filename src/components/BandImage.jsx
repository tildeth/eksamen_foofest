import React from "react";
import styles from "@/styles/BandImage.module.css"

const BandImage = ({ logo, logoCredits, bandName }) => {
  const logoUrl = logo
    ? logo.startsWith("https://")
      ? logo
      : `http://localhost:8080/logos/${logo}` // Korrekt port og sti
    : null;

  return (
    <div className={styles.bandImage}>
      {logoUrl ? (
        <img src={logoUrl} alt={`${bandName} logo`} />
      ) : (
        <p>No logo available</p> // Alternativ tekst
      )}
      {logoCredits && <p>Logo kreditering: {logoCredits}</p>}
    </div>
  );
};

export default BandImage;
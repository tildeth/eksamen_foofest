import React from "react";
import styles from "@/styles/BandImage.module.css"

const BandImage = ({ logo, logoCredits, bandName }) => {
  const logoUrl = logo
    ? logo.startsWith("https://")
      ? logo
      : `https://certain-illustrious-marmot.glitch.me/logos/${logo}` // Korrekt port og sti
    : null;

  return (
    <div className={styles.bandImage}>
      {logoUrl ? (
        <img className={styles.bandyImage} src={logoUrl} alt={`${bandName} logo`} />
      ) : (
        <p>No logo available</p> // Alternativ tekst
      )}
      {logoCredits && <p>Logo kreditering: {logoCredits}</p>}
    </div>
  );
};

export default BandImage;
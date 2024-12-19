import React from "react";
import { useRouter } from "next/router";
import BandImage from "./BandImage";
import styles from "@/styles/BandItem.module.css";

const BandItem = ({ band }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/band/${band.slug}`); // Navigere til bandets detaljeside baseret på slug
  };

  return (
    <div
      className={styles.bandItem}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      aria-label={`Gå til detaljer for bandet ${band.name}`}
    >
      <BandImage
        className={styles.bandimage}
        logo={band.logo}
        bandName={band.name}
      />
    </div>
  );
};

export default BandItem;

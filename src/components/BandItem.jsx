import React from "react";
import { useRouter } from "next/router";

const BandItem = ({ band }) => {
  const router = useRouter();

  const logoUrl = band.logo.startsWith("https://")
    ? band.logo
    : `https://YOUR-APP.glitch.me/logos/${band.logo}`;

  const handleClick = () => {
    router.push(`/band/${band.slug}`); // Navigere til bandets detaljeside baseret på slug
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{band.name}</h3>
      <img src={logoUrl} alt={`${band.name} logo`} />
      {band.logoCredits && <p>Logo kreditering: {band.logoCredits}</p>}
    </div>
  );
};

export default BandItem;

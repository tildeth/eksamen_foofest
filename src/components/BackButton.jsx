// components/BackButton.js
import React from "react";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import styles from "@/styles/BackButton.module.css"

const BackButton = () => {
  const router = useRouter();

  // Funktion til at navigere tilbage
  const handleGoBack = () => {
    router.back();
  };

  return (
    <button onClick={handleGoBack} className={styles.backButton} aria-label="Tilbage til forrige side">
      <FaArrowLeft className={styles.backButtonIcon} />
      Tilbage
    </button>
  );
};

export default BackButton;
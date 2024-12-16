import Link from "next/link";
import styles from "@/styles/LandingPageTop.module.css";

      const LandingPageTop = () => {
        return (
          <section className={styles.sectionlandingcomp}>      
            <Link href="/billet" passHref>
              <button
                className={styles.btn} 
                aria-label="Gå til billetteringssiden for at købe billetter"
              >
                Køb Billetter
              </button>
            </Link>
          </section>
        );
      };
      
      export default LandingPageTop;
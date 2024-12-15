import Link from "next/link";

const LandingPageTop = () => {
    return ( 
        <section>
            <h1>Velkommen til Campingoplevelsen!</h1>
      
      {/* Link til billetteringssiden */}
      <Link href="/billet" passHref>
        <button
          className="btn"
          aria-label="Gå til billetteringssiden for at købe billetter"
        >
          Køb Billetter
        </button>
      </Link>
        </section>
     );
}
 
export default LandingPageTop;
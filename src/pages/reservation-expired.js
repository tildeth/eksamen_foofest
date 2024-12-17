import { useEffect } from "react";
import { useRouter } from "next/router";

const ReservationExpired = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/billet'); 
    }, 5000); 

    return () => clearTimeout(timer); // Clean up the timeout
  }, [router]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Din reservation er annulleret</h1>
      <p>Reservationen er udløbet. Prøv venligst at lave en ny reservation.</p>
      <p>Du bliver omdirigeret om 5 sekunder...</p>
    </div>
  );
};

export default ReservationExpired;

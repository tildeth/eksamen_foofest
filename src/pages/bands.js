import React, {useEffect, useState} from "react";
import BandItem from "@/components/BandItem";
import { fetchBands } from "@/lib/api";

const BandsPage = () => {
    const [bands, setBands] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBands = async () => {
          const data = await fetchBands();
          setBands(data);
          setLoading(false);
        };
        loadBands();
      }, []);
    
      if (loading) return <div>Loading bands...</div>;

    return (
        <section>
      <h2>All Bands</h2>
      {bands.map((band) => (
        <BandItem key={band.slug} band={band} />
      ))}
    </section>
      );
}
 
export default BandsPage;
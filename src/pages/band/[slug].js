import React from "react";
import BandDetail from "@/components/BandDetail";
import BackButton from "@/components/BackButton";

const Bandpage = () => {
    return ( 
        <>
        <BackButton />
        <BandDetail />
        </>
     );
}
 
export default Bandpage;

//Sammenarbejde med ChatGPT
export async function getServerSideProps(context) {
    const { slug } = context.params; // Hent slug fra URL-parametre

    return {
        props: {
            slug, // Sender slug som prop til Bandpage
            title: slug, // Sæt titel til slug (som bandnavn)
            description: `Beskrivelse for bandet ${slug}`, 
        },
    };
}
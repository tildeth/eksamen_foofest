import { BookingProvider } from "@/context/BookingContext";
import Layout from "@/app/layout";

export default function App({Component, pageProps}){
    return(
        <BookingProvider>
             <Layout>
                <Component {...pageProps} />
            </Layout>
        </BookingProvider>
    );
}
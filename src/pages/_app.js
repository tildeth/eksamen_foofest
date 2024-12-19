import { BookingProvider } from "@/context/BookingContext";
import Layout from "@/app/layout";

export default function App({Component, pageProps}){

    const { title = "Default Title", description = "Default description" } = pageProps;

    return(
        <BookingProvider>
             <Layout title={title} description={description}>
                <Component {...pageProps} />
            </Layout>
        </BookingProvider>
    );
}
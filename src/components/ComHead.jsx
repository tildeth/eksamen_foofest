import Head from "next/head";

const ComHead = ({ title, description }) => {
    return (
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
      );
    };
 
export default ComHead;
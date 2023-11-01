import Head from 'next/head';


const websiteName = "FoodIdea"
const defaultDescription = "food idea is about helping each other cook good food and sharing our recipes with each other.";
const defaultKeywords = "food, idea, random food, food idea, foods";
const defaultOgTitle = "Food is life";
const defaultOgImage = "https://bafkreidaorlctsryd6n3yvafhk3j5y32n6smt2c5dfsbfrsmrlwanwuzwu.ipfs.nftstorage.link/"

interface Props {
  title?: any,
  ogTitle?: string,
  description?: string,
  keywords?: string,
  image?: string,
};

export const Metadata = (
  { 
    title, 
    image, 
    ogTitle = defaultOgTitle, 
    description = defaultDescription, 
    keywords = defaultKeywords
  }: Props) => 
(        
  <Head>
    <title>{title ? `${websiteName} | ${title}` : websiteName}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content={description} />
    <meta name="og:title" content={ogTitle} key="og:title" />
    <meta property="og:url" content="https://www.exmple.co.uk" key="og:url"/>
    <meta property="og:type" content="website" key="og:type"/>
    <meta property="og:image" content={image || defaultOgImage} key="ogimage"/>
    <meta property="og:description" content={description} />
    <meta name="keywords" content={keywords} />
  </Head>
)

export default Metadata;
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { Helmet, HelmetData } from 'react-helmet-async';


const ComicsPage = () => {
  const helmetData = new HelmetData({});
  return (
    <>
      <Helmet helmetData={helmetData}>
        <meta
        name="description"
        content="Page with our comic's list"
        />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  )
}

export default ComicsPage;

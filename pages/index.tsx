import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";
interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}
interface IndexPageProps {
  initialCatUrl: string;
}

const fetchCat = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const reslte = await res.json();
  return reslte[0];
};

const Home: NextPage<IndexPageProps> = ({ initialCatUrl }) => {
  const [CatImageURL, setCatImageURL] = useState(initialCatUrl);
  const [Loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const catImege = await fetchCat();
    setCatImageURL(catImege.url);
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>猫画像</h1>

      {Loading ? (
        <div
          style={{
            margin: 40,
          }}
        >
          <Loader active size="huge">
            Loading
          </Loader>
        </div>
      ) : (
        <img src={CatImageURL} width={500} height="auto" />
      )}
      <button
        onClick={handleClick}
        style={{
          marginTop: 30,
        }}
      >
        今日の猫ちゃん
      </button>
    </div>
  );
};

//SSR
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCat();
  return {
    props: {
      initialCatUrl: catImage.url,
    },
  };
};

export default Home;

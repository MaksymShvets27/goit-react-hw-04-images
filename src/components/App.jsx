import Seachbar from './Seachbar/Seachbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Audio } from 'react-loader-spinner';

import css from './App.module.css';
import fetchImages from 'servise/fetchImages';
import { useEffect, useState } from 'react';

const App = () => {
  const [seachName, setSeachName] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const onSubmit = name => {
    setSeachName(name);
    setArticles([]);
    setPage(1);
    setLoading(true);
  };

  const onLoadMoreBtn = () => {
    setPage(page + 1);
    setLoading(true);
  };

  useEffect(() => {
    if (!seachName) {
      return;
    }
    (async () => {
      try {
        const imagesResponce = await fetchImages(seachName, page);
        let imagesFiltred = imagesResponce.map(image => {
          let imageObj = {};
          imageObj.id = image.id;
          imageObj.webformatURL = image.webformatURL;
          imageObj.largeImageURL = image.largeImageURL;
          return imageObj;
        });
        setArticles(prevArticles => [...prevArticles, ...imagesFiltred]);
        setLoading(false);
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    })();
  }, [seachName, page]);

  return (
    <div className={css.App}>
      <Seachbar onSubmit={onSubmit} />
      {articles.length > 0 ? (
        <>
          <ImageGallery articles={articles} />
          {loading !== true && <Button onLoadMore={onLoadMoreBtn} />}
        </>
      ) : null}
      {loading === true && (
        <Audio
          height="100"
          width="100"
          radius="9"
          color="blue"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass={css.audio}
        />
      )}
    </div>
  );
};

export { App };

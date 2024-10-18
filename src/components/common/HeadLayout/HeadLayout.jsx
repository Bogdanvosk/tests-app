import Head from 'next/head';
import PropTypes from 'prop-types';

const HeadLayout = ({ favicon, title }) => {
  return (
    <Head>
      <meta charset='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' type='image/png' href={favicon} />
      <title>{title}</title>
      <meta property='og:title' content='Your tour' />
      <meta
        name='description'
        content='Идейные соображения высшего порядка,а также рамки и место обучения кадров'
      />
      <meta
        property='og:description'
        content='Идейные соображения высшего порядка,а также рамки и место обучения кадров'
      />
      <meta
        name='keywords'
        content='путешествие, собери свой тур, автостопом'
      />
    </Head>
  );
};

export default HeadLayout;

HeadLayout.propTypes = {
  favicon: PropTypes.string,
  title: PropTypes.string,
};

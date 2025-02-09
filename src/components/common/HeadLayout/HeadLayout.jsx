import Head from 'next/head';
import PropTypes from 'prop-types';

const HeadLayout = ({ favicon, title, description = '' }) => {
  return (
    <Head>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' type='image/png' href={favicon} />
      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta name='description' content={description} />
      <meta property='og:description' content={description} />
    </Head>
  );
};

export default HeadLayout;

HeadLayout.propTypes = {
  favicon: PropTypes.string,
  title: PropTypes.string
};

import '@/styles/reset.scss';
import '@/styles/globals.scss';
import ReduxProvider from '@/store/ReduxProvider';

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

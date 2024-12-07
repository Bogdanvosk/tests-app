import ReduxProvider from '@/store/ReduxProvider';

import HeadLayout from '@/components/common/HeadLayout/HeadLayout';

import '@/styles/reset.scss';
import '@/styles/globals.scss';
import ModalPovider from '@/components/common/ModalProvider/ModalProvider';

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <ModalPovider>
        <HeadLayout favicon='/favicon.png' title='Tests app' />
        <Component {...pageProps} />
      </ModalPovider>
    </ReduxProvider>
  );
}

import ReduxProvider from 'store/ReduxProvider';

import HeadLayout from '@/components/common/HeadLayout/HeadLayout';
import ModalPovider from '@/components/common/ModalProvider/ModalProvider';
import PopupProvider from '@/components/common/PopupProvider/PopupProvider';

import 'styles/reset.scss';
import 'styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <ModalPovider>
        <PopupProvider>
          <HeadLayout favicon='/favicon.png' title='Tests app' />
          <Component {...pageProps} />
        </PopupProvider>
      </ModalPovider>
    </ReduxProvider>
  );
}

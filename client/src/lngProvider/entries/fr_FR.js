import antdSA from 'antd/es/locale/fr_FR';
import appLocaleData from 'react-intl/locale-data/fr';
import saMessages from '../locales/fr_FR.json';

const saLang = {
  messages: {
    ...saMessages,
  },
  antd: antdSA,
  locale: 'fr-FR',
  data: appLocaleData,
};
export default saLang;

import antdSA from 'antd/es/locale/it_IT';
import appLocaleData from 'react-intl/locale-data/it';
import saMessages from '../locales/it_IT.json';

const saLang = {
  messages: {
    ...saMessages,
  },
  antd: antdSA,
  locale: 'it-IT',
  data: appLocaleData,
};
export default saLang;

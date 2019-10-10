import antdSA from 'antd/es/locale/en_US';
import appLocaleData from 'react-intl/locale-data/ar';
import saMessages from '../locales/ar_SA.json';

const saLang = {
  messages: {
    ...saMessages,
  },
  antd: antdSA,
  locale: 'ar',
  data: appLocaleData,
};
export default saLang;

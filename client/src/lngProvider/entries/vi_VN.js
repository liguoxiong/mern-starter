import antdVi from 'antd/es/locale/vi_VN';
import appLocaleData from 'react-intl/locale-data/vi';
import viMessages from '../locales/vi_VN.json';

const ViLang = {
  messages: {
    ...viMessages,
  },
  antd: antdVi,
  locale: 'vi',
  data: appLocaleData,
};
export default ViLang;

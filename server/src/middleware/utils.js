import slugify from 'slugify';
export const slugger = name => {
  const today = new Date().getTime();
  const result = slugify(name) + '-' + today.toString();
  return result;
};

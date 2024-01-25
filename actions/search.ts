'use server';
const searchAction = (formData: FormData) => {
  const keyword = formData.get('keyword');
  console.log(keyword);
};

export { searchAction };

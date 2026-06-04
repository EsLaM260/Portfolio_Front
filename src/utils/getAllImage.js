// السطر ده بيسحب كل صور الـ png والـ jpg اللي جوة فولدر assets مرة واحدة
const imagesMap = import.meta.glob('../assets/image/*.{png,jpg,jpeg}', { eager: true });

// دالة مساعدة عشان تجيب المسار الحقيقي للصورة بناءً على اسمها
const getLocalImg = (imgName) => {
  const path = `../assets/image/${imgName}`;
  console.log(path);
  
  return imagesMap[path]?.default ;
  // return imagesMap[path]?.default || '';
};

export default getLocalImg;
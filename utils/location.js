const GOOGLE_API_KEY = 'AIzaSyAywhsEf8lIdsxLGRu42_YprVS9HD7AHx8';
export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

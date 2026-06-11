import axios from "axios";

export const imagesBB = async (photo) => {
  const formData = new FormData();
  formData.append("image", photo);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=a6c948ab64f7987bbf9e5477cde3a1cb`,
    formData
  );
  return data?.data?.display_url;
};

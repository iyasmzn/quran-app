import axios from "axios";

const BASE_URL = "https://api.quran.com/v4";

export const getSurahList = async () => {
  const res = await axios.get(`${BASE_URL}/chapters`);
  return res.data.data;
};

export const getSurahDetail = async (id, translationId = 131) => {
  const res = await axios.get(`${BASE_URL}/quran/verses/uthmani?chapter_number=${id}`);
  const transliteration = await axios.get(`${BASE_URL}/quran/transliterations/1?chapter_number=${id}`);
  const translation = await axios.get(`${BASE_URL}/quran/translations/${translationId}?chapter_number=${id}`);
  return {
    arabic: res.data.verses,
    transliteration: transliteration.data.verses,
    translation: translation.data.verses
  };
};

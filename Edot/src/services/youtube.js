import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const API_KEY = "YOUR_YOUTUBE_KEY";

export const fetchSongsWithCache = async (query) => {
  const cacheRef = doc(db, "searchCache", query.toLowerCase());
  const cacheSnap = await getDoc(cacheRef);

  // 1. Check if we searched this recently (Cost: 0 YouTube Units)
  if (cacheSnap.exists()) return cacheSnap.data().results;

  // 2. Otherwise, ask YouTube (Cost: 100 Units)
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}+orthodox+harp&type=video&key=${API_KEY}&maxResults=10`,
  );
  const data = await res.json();

  const results = data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumb: item.snippet.thumbnails.high.url,
  }));

  // 3. Save to Firestore so it's free next time!
  await setDoc(cacheRef, { results, timestamp: Date.now() });
  return results;
};

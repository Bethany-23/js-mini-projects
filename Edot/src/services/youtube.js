import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// This pulls your key from the .env file instead of hardcoding it
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchSongsWithCache = async (query) => {
  if (!query) return [];

  const cacheId = query.toLowerCase().trim();
  const cacheRef = doc(db, "searchCache", cacheId);

  try {
   
    const cacheSnap = await getDoc(cacheRef);
    if (cacheSnap.exists()) {
      console.log(`📡 Cache Hit for: ${cacheId}`);
      return cacheSnap.data().results;
    }

   
    console.log(`☁️ Fetching from YouTube API for: ${cacheId}`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}+orthodox+begena&type=video&key=${API_KEY}&maxResults=10`;

    const res = await fetch(url);
    const data = await res.json();

    // SAFETY CHECK: If the API key is wrong or quota is full, Google returns an error object
    if (data.error) {
      console.error("YouTube API Error:", data.error.message);
      return []; // Return empty array so the .map() in your UI doesn't crash
    }

    // Transform the raw YouTube data into a clean format for your app
    const results = (data.items || []).map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumb:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.default?.url,
      channel: item.snippet.channelTitle,
    }));

    // 3. Save to Firestore so it's free next time!
    if (results.length > 0) {
      await setDoc(cacheRef, {
        results,
        timestamp: Date.now(),
        query: cacheId,
      });
    }

    return results;
  } catch (error) {
    console.error("Service Error:", error);
    return [];
  }
};

import { useState, useEffect } from "react";
import { storage, firestore, timestamp } from "../firebase/config";
const useStorage = (file, caption) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storageRef = storage.ref(file.name);
    const firestoreRef = firestore.collection("posts");
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        firestoreRef.add({ url, createdAt, caption });
        setUrl(url);
      }
    );
  }, [file]);
  return { progress, error, url };
};
export default useStorage;

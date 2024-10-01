// readData.js
import { ref ,  get } from "firebase/database";
import { database } from "./Config";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref as refStore, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./Config";

// Function to read data from a specific path
export const readData = (path) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database, path);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setItems(Object.values(snapshot.val()));
        } else {
          setItems(null); // or handle no data case
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { items, loading, error };
};

// Fnction to write data to a specific path
export const writeData = async (path, data) => {
  try {
    // Reference to the path in your database
    const dbRef = ref(database, path);

    // Set the data at the reference
    await set(dbRef, data);

    console.log("Data written successfully");
  } catch (error) {
    console.error("Error writing data:", error);
  }
};



export const readImage = (path = "items") => {
  const [itemsImage, setItemsImage] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true);
  const [errorImage, setErrorImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingImage(true);
      setErrorImage(null); // Reset error state on each fetch

      try {
        // Create a reference to the path in Firebase Storage
        const storageRef = refStore(storage, path);

        // List all items (files) under this path
        const itemsList = await listAll(storageRef);

        // Retrieve the download URLs for each item
        const imagePromises = itemsList.items.map(async (itemRef) => {
          const imageUrl = await getDownloadURL(itemRef);
          return { name: itemRef.name, url: imageUrl };
        });

        // Wait for all download URLs to resolve
        const images = await Promise.all(imagePromises);

        setItemsImage(images); // Set state with image data
      } catch (err) {
        setErrorImage(err.message || "Failed to fetch images from Storage");
      } finally {
        setLoadingImage(false);
      }
    };

    // Fetch data only if path is valid
    if (path) {
      fetchData();
    }
  }, [path]);

  return { itemsImage, loadingImage, errorImage };
};
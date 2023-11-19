import { useState, useEffect, useCallback } from 'react';
import './App.css';
import './index.css';
import axios from 'axios';

function App() {
  const [albumId, setAlbumId] = useState(1);
  const [newAlbumId, setNewAlbumId] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPhotos = useCallback(async () => {
    if (albumId === null) {
      setPhotos([]);
      setIsLoading(false);
      return;
    }

    if (albumId < 1) {
      setAlbumId(1);
    } else if (albumId > 100) {
      setAlbumId(100);
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      );

      const data = response.data;
      const photoInfo = data.map((photo) => {
        return {
          id: photo.id,
          title: photo.title,
        };
      });

      setPhotos(photoInfo);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Error loading photos. Please try again later.');
      console.error(error);
    }
  }, [albumId, setAlbumId, setIsLoading, setPhotos]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const goToPreviousAlbum = () => {
    const previousAlbumId = albumId > 1 ? albumId - 1 : 100;
    setAlbumId(previousAlbumId);
    setNewAlbumId('');
  };

  const goToNextAlbum = () => {
    const nextAlbumId = albumId < 100 ? albumId + 1 : 1;
    setAlbumId(nextAlbumId);
    setNewAlbumId('');
  };

  const handleManualInput = () => {
    if (newAlbumId !== '') {
      if (newAlbumId >= 1 && newAlbumId <= 100) {
        setAlbumId(Number(newAlbumId));
        setError('');
      } else {
        setError('Please enter a value between 1-100');
      }
      setNewAlbumId('');
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleManualInput();
    }
  };

  return (
    <div className="App">
      <h1>Photo Album Showcase</h1>
      <div className="centered-horizontally">
        <label htmlFor="albumIdInput">Album ID:</label>
        <input
          type="number"
          id="albumIdInput"
          value={newAlbumId}
          inputMode="numeric"
          onClick={() => setNewAlbumId('')}
          onChange={(e) => setNewAlbumId(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        <button onClick={handleManualInput}>Enter</button>
      </div>
      <div>
        <button onClick={goToPreviousAlbum}>Previous Album</button>
        <button onClick={goToNextAlbum}>Next Album</button>
      </div>
      {error && <p className="error">{error}</p>}
      <p>Current Album ID: {albumId}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="centered-album-info">
          {photos.map((photo) => (
            <li key={photo.id}>
              <div className="centered-album-info">
                <strong>[{photo.id}]</strong> {photo.title}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
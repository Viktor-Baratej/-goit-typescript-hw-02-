import { useEffect, useState } from 'react';
import { fetchImages, Image } from '../../services/api';
import ReactModal from 'react-modal';
import SearchBar from '../../components/SearchBar/SearchBar';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../../components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

ReactModal.setAppElement('#root');

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImageID, setSelectedImageID] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (!query) return;

    const fetchGallery = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        if (data.results.length === 0) {
          toast.error('No images found for your search.');
          setHasMore(false);
          return;
        }

        setImages(prevImages => [...prevImages, ...data.results]);
        setHasMore(data.results.length > 0);
      } catch (err) {
        setError('Failed to fetch images. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [query, page]);

  const handleSearch = (searchQuery: string) => {
    if (query === searchQuery) return;

    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (id: string) => {
    setSelectedImageID(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImageID(null);
    setShowModal(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {hasMore && !isLoading && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && selectedImageID && (
        <ImageModal
          isOpen={showModal}
          onRequestClose={closeModal}
          images={images}
          imageModalID={selectedImageID}
        />
      )}
    </div>
  );
};

export default App;

import styles from './ImageCard.module.css';
import { Image } from '../../services/api';

interface ImageCardProps {
  image: Image;
  openModal: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image.id);
  };

  return (
    <div className={styles.image_card}>
      <img
        className={styles.image_card_img}
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;

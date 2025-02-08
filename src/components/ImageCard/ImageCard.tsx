import styles from './ImageCard.module.css';

const ImageCard = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image.id); // ✅ Викликаємо openModal з image.id
  };

  return (
    <div className={styles.image_card}>
      <img
        className={styles.image_card_img}
        src={image.urls.small}
        alt={image.description || 'Image'}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;

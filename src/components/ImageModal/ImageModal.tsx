import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';
import { Image } from '../../services/api';

interface ImageModalProps {
  imageModalID: string | null;
  images: Image[];
  isOpen: boolean;
  onRequestClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageModalID,
  images,
  isOpen,
  onRequestClose,
}) => {
  const showImage = images.find(image => image.id === imageModalID);

  if (!showImage) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '800px',
          margin: 'auto',
          padding: '30px',
          borderRadius: '10px',
        },
      }}
    >
      <div className={styles.image_modal}>
        <img
          className={styles.image_modal_img}
          src={showImage.urls.regular}
          alt={showImage.alt_description || 'Image'}
        />
        <ul className={styles.image_modal_list}>
          <li className={styles.image_modal_item}>
            <strong>Author:</strong>&nbsp;&nbsp;
            <span className={styles.image_modal_info}>
              {showImage.user.name}
            </span>
          </li>
          <li className={styles.image_modal_item}>
            <strong>Likes:</strong>&nbsp;&nbsp;
            <span className={styles.image_modal_info}>
              {showImage.likes ?? 'N/A'}
            </span>
          </li>
          <li className={styles.image_modal_item}>
            <strong>Description:</strong>&nbsp;&nbsp;
            <span className={styles.image_modal_info}>
              {showImage.alt_description || 'No description'}
            </span>
          </li>
        </ul>
      </div>
    </ReactModal>
  );
};

export default ImageModal;

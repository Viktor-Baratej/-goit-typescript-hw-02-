import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ imageModalID, images, onRequestClose }) => {
  const showImage = images.find(image => image.id === imageModalID);

  if (!showImage) return null; // 🔥 Запобігає відкриттю пустого модального вікна

  return (
    <ReactModal
      isOpen={!!showImage}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        content: { maxWidth: '600px', margin: 'auto', borderRadius: '10px' },
      }}
    >
      <div className={styles.image_modal}>
        <img
          className={styles.image_modal_img}
          src={showImage.urls.regular}
          alt={showImage.description || 'Image'}
        />
        <ul className={styles.image_modal_list}>
          <li>
            Author:
            <span className={styles.image_modal_info}>
              {showImage.user.first_name} {showImage.user.last_name}
            </span>
          </li>
          <li>
            Likes:
            <span className={styles.image_modal_info}>{showImage.likes}</span>
          </li>
          <li>
            Description:
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

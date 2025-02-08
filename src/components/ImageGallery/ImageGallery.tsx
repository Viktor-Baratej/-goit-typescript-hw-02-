import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';
import { forwardRef } from 'react';

const ImageGallery = forwardRef(function ImageGallery(
  { images, openModal },
  ref
) {
  return (
    <ul ref={ref} className={styles.image_gallery}>
      {images.map(image => (
        <li className={styles.image_gallery_item} key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
});

export default ImageGallery;

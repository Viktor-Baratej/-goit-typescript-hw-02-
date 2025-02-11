import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';
import { forwardRef } from 'react';
import { Image } from '../../services/api';

interface ImageGalleryProps {
  images: Image[];
  openModal: (id: string) => void;
}

const ImageGallery = forwardRef<HTMLUListElement, ImageGalleryProps>(
  ({ images, openModal }, ref) => {
    return (
      <ul ref={ref} className={styles.image_gallery}>
        {images.map(image => (
          <li className={styles.image_gallery_item} key={image.id}>
            <ImageCard image={image} openModal={openModal} />
          </li>
        ))}
      </ul>
    );
  }
);

export default ImageGallery;

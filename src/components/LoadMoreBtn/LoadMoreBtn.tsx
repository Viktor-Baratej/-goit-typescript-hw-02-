import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick();
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight / 2,
        behavior: 'smooth',
      });
    }, 200);
  };

  return (
    <div className={styles.button_container}>
      <button className={styles.button} onClick={handleClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;

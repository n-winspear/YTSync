// Next Imports
import Image from 'next/image';
import { useRouter } from 'next/router';

// Custom Component Imports

// Style Imports
import styles from './SearchResult.module.scss';

const SearchResult = ({ video }) => {
    const router = useRouter();

    const { url, width, height } = video.snippet.thumbnails.medium;
    const { title, description } = video.snippet;
    const { videoId } = video.id;

    const watchVideo = () => {
        router.push({
            pathname: 'watch',
            query: { v: videoId },
        });
    };

    return (
        <div
            className={styles.result}
            onClick={(e) => {
                e.preventDefault();
                watchVideo();
            }}>
            <div className={styles.thumbnail}>
                <Image src={url} width={width} height={height} />
            </div>
            <div className={styles.text}>
                <h2>{title}</h2>
                <h3>{description}</h3>
                <div className={styles.channel}>
                    <Image
                        src={
                            'https://yt3.ggpht.com/ytc/AKedOLT0bksPj0ebo-NGS9qaGZpJUPNzk5umqUoo32cQ=s176-c-k-c0x00ffffff-no-rj-mo'
                        }
                        width={20}
                        height={20}
                        className={styles.profileImage}
                    />
                    <h4>Jolly</h4>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;

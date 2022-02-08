// Custom Imports
import YoutubeEmbed from '../YoutubeEmbed';

// Style Imports
import styles from './ActiveVideo.module.scss';

const ActiveVideo = ({ video }) => {
    const { title, description } = video.snippet;
    const { viewCount, likeCount } = video.statistics;
    const { id } = video;

    return (
        <div className={styles.activeVideo}>
            <YoutubeEmbed videoId={id} />
            <h1>{title}</h1>
            <div className={styles.stats}>
                <h3>{viewCount} views</h3>
                <h3>{likeCount} likes</h3>
            </div>
            <h2>{description}</h2>
        </div>
    );
};

export default ActiveVideo;

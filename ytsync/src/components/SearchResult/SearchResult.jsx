// Next Imports
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Custom Component Imports

// Style Imports
import styles from './SearchResult.module.scss';

const SearchResult = ({ video }) => {
    const router = useRouter();
    const { roomId } = router.query;
    const [timeSincePublished, setTimeSincePublished] = useState();
    const { url, width, height } = video.snippet.thumbnails.medium;
    const { title, description, publishedAt } = video.snippet;
    const { videoId } = video.id;

    const calculateTimeSincePublished = async () => {
        const publishDate = new Date(publishedAt);
        const today = new Date();
        const dayCountDifference =
            (today.getTime() - publishDate.getTime()) / (1000 * 3600 * 24);

        if (dayCountDifference < 1) {
            let difference = Math.floor(dayCountDifference * 24);
            setTimeSincePublished(
                `${difference} ${difference === 1 ? 'hour' : 'hours'} ago`
            );
        } else if (dayCountDifference < 7) {
            let difference = Math.floor(dayCountDifference);
            setTimeSincePublished(
                `${difference} ${difference === 1 ? 'day' : 'days'} ago`
            );
        } else if (dayCountDifference < 30) {
            let difference = Math.floor(dayCountDifference / 7);
            setTimeSincePublished(
                `${difference} ${difference === 1 ? 'week' : 'weeks'} ago`
            );
        } else if (dayCountDifference < 365) {
            let difference = Math.floor(dayCountDifference / 7 / 4);
            setTimeSincePublished(
                `${difference} ${difference === 1 ? 'month' : 'months'} ago`
            );
        } else {
            let difference = Math.floor(dayCountDifference / 7 / 4 / 12);
            setTimeSincePublished(
                `${difference} ${difference === 1 ? 'year' : 'years'} ago`
            );
        }
    };

    const watchVideo = () => {
        router.push({
            pathname: `/room/${roomId}/watch`,
            query: { v: videoId },
        });
    };

    useEffect(async () => {
        await calculateTimeSincePublished();
    }, []);

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
                <div className={styles.releasedTime}>{timeSincePublished}</div>
            </div>
        </div>
    );
};

export default SearchResult;

// Next Imports
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Custom Component Imports
import { IconContext } from 'react-icons/lib';
import { BiAddToQueue } from 'react-icons/bi';
import { MdDone } from 'react-icons/md';
import { TailSpin } from 'react-loading-icons';

// Style Imports
import styles from './SearchResult.module.scss';

const SearchResult = ({ video }) => {
    const router = useRouter();
    const { roomCode } = router.query;
    const [timeSincePublished, setTimeSincePublished] = useState();
    const [resultIcon, setResultIcon] = useState(<BiAddToQueue />);

    const {
        url: videoThumbnailURL,
        width,
        height,
    } = video.snippet.thumbnails.medium;
    const { title, description, publishedAt } = video.snippet;
    const {
        title: channelTitle,
        thumbnails: {
            default: { url: channelThumbnailURL },
        },
    } = video.channel.snippet;
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

    const addVideoToPlaylist = async () => {
        setResultIcon(<TailSpin height={'1.8rem'} width={'32px'} />);

        const res = await fetch(`/api/room/${roomCode}/addVideo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                videoId: videoId,
                channelThumbnailURL: channelThumbnailURL,
            }),
        });

        setResultIcon(<MdDone />);
    };

    useEffect(async () => {
        await calculateTimeSincePublished();
    }, []);

    return (
        <div
            className={styles.result}
            onClick={(e) => {
                e.preventDefault();
                addVideoToPlaylist();
            }}>
            <div className={styles.thumbnail}>
                <Image src={videoThumbnailURL} width={width} height={height} />
            </div>
            <div className={styles.text}>
                <h2>{title}</h2>
                <h3>{description}</h3>
                <div className={styles.channel}>
                    <Image
                        src={channelThumbnailURL}
                        width={20}
                        height={20}
                        className={styles.profileImage}
                    />
                    <h4>{channelTitle}</h4>
                </div>
                <div className={styles.releasedTime}>{timeSincePublished}</div>
            </div>
            <button className={styles.button}>
                <IconContext.Provider
                    value={{
                        size: '60%',
                        color: '#f1f1f1',
                        style: {
                            verticalAlign: 'middle',
                        },
                    }}>
                    {resultIcon}
                </IconContext.Provider>
            </button>
        </div>
    );
};

export default SearchResult;

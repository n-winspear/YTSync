// Custom Imports
import YouTube from 'react-youtube';

// Custom Component Imports
import { IconContext } from 'react-icons/lib';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { RiFullscreenFill } from 'react-icons/ri';

// Style Imports
import styles from './ActiveVideo.module.scss';
import { useEffect } from 'react/cjs/react.development';
import { useState } from 'react';

const ActiveVideo = ({
    video,
    playVideo,
    pauseVideo,
    fullScreenVideo,
    endOfVideo,
    ytPlayer,
    setYtPlayer,
}) => {
    const { title, description } = video.snippet;
    const { viewCount, likeCount } = video.statistics;
    const { id } = video;
    const origin = `${process.env.NEXT_PUBLIC_CURRENT_URL}`;

    useEffect(() => {
        if (ytPlayer) {
            ytPlayer.cueVideoById(video.id, 0);
        }
    }, [video]);

    return (
        <div className={styles.activeVideo}>
            <YouTube
                title={title}
                opts={{
                    cc_lang_pref: 'en',
                    cc_load_poicy: '1',
                    enablejsapi: '1',
                    iv_load_policy: '3',
                    modestbranding: '1',
                    origin: origin,
                    rel: '0',
                    width: '856',
                    height: '482',
                    frameBorder: '0',
                    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                    allowFullScreen: true,
                    playerVars: {
                        controls: '0',
                        disablekb: '1',
                    },
                }}
                onReady={(e) => {
                    setYtPlayer(e.target);
                }}
                onEnd={(e) => {
                    endOfVideo();
                }}
            />
            <div className={styles.controls}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        playVideo();
                    }}
                    className={styles.play}>
                    PLAY
                    <IconContext.Provider
                        value={{
                            size: '52%',
                            color: '#f1f1f1',
                            style: {
                                verticalAlign: 'middle',
                                marginLeft: '12px',
                            },
                        }}>
                        <FaPlay />
                    </IconContext.Provider>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        pauseVideo();
                    }}
                    className={styles.pause}>
                    PAUSE
                    <IconContext.Provider
                        value={{
                            size: '52%',
                            color: '#f1f1f1',
                            style: {
                                verticalAlign: 'middle',
                                marginLeft: '12px',
                            },
                        }}>
                        <FaPause />
                    </IconContext.Provider>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        fullScreenVideo();
                    }}
                    className={styles.fullScreen}>
                    <IconContext.Provider
                        value={{
                            size: '88%',
                            color: '#f1f1f1',
                            style: {
                                verticalAlign: 'middle',
                            },
                        }}>
                        <RiFullscreenFill />
                    </IconContext.Provider>
                </button>
            </div>
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

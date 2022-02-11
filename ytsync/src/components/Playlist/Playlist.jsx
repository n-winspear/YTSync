// Next Imports
import Image from 'next/image';
import { useState } from 'react';

// Custom Component Imports
import { IconContext } from 'react-icons/lib';
import { MdDelete } from 'react-icons/md';

// Style Imports
import styles from './Playlist.module.scss';

const Playlist = ({ currentPlaylist, setActiveVideo, updatePlaylist }) => {
    return (
        <div className={styles.playlist}>
            <h1>Playlist</h1>
            <ul>
                {currentPlaylist.map((video) => {
                    return (
                        <li key={video.id}>
                            <div
                                className={styles.video}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveVideo(video);
                                }}>
                                <h2>{video.snippet.title}</h2>
                                <div className={styles.channel}>
                                    <Image
                                        src={video.channelThumbnailURL}
                                        width={20}
                                        height={20}
                                        className={styles.profileImage}
                                    />
                                    <h4>{video.snippet.channelTitle}</h4>
                                </div>
                            </div>
                            <div className={styles.iconContainer}>
                                <div className={styles.deleteIcon}>
                                    <IconContext.Provider
                                        value={{
                                            size: '70%',
                                            color: '#030303',
                                            style: {
                                                verticalAlign: 'middle',
                                            },
                                            className: 'binBtn',
                                        }}>
                                        <MdDelete
                                            onClick={(e) => {
                                                updatePlaylist(video.id);
                                            }}
                                        />
                                    </IconContext.Provider>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Playlist;

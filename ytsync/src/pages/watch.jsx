// Next Imports
import Head from 'next/head';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';
import YoutubeEmbed from '../components/YoutubeEmbed';

// Style Imports
import styles from '../styles/watch.module.scss';

export async function getServerSideProps({ query }) {
    const { v: videoId } = query;

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YT_API_KEY}`
    );

    const data = await response.json();

    const videoData = data.items[0];

    return {
        props: {
            videoData,
        },
    };
}

// TODO: Add in video fetching functionality

const Watch = ({ videoData }) => {
    const { title, description } = videoData.snippet;
    const { viewCount, likeCount } = videoData.statistics;
    const { id } = videoData;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name='description'
                    content='Youtube Sync search results'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <HeaderBar />
                <div className={styles.video}>
                    <YoutubeEmbed videoId={id} />
                    <h1>{title}</h1>
                    <h2>{description}</h2>
                    <h2>{viewCount}</h2>
                    <h2>{likeCount}</h2>
                </div>
            </main>
        </>
    );
};

export default Watch;

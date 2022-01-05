// Next Imports
import Head from 'next/head';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';
import YoutubeEmbed from '../components/YoutubeEmbed';

// Style Imports
import styles from '../styles/watch.module.scss';

export async function getServerSideProps({ query }) {
    return {
        props: {
            video: {
                kind: 'youtube#searchResult',
                etag: 'geprEHgnFh9z8nGRvn89y_tOJds',
                id: {
                    kind: 'youtube#video',
                    videoId: 'PzLvD24pbic',
                },
                snippet: {
                    publishedAt: '2021-12-24T12:28:58Z',
                    channelId: 'UCOgGAfSUy5LvEyVS_LF5kdw',
                    title: 'I gave my best friend a Mullet for Christmas.',
                    description:
                        'Go to https://NordVPN.com/JOLLY or use code jolly to get a 2-year plan plus a bonus gift with a huge discount. For a limited time ...',
                    thumbnails: {
                        default: {
                            url: 'https://i.ytimg.com/vi/PzLvD24pbic/default.jpg',
                            width: 120,
                            height: 90,
                        },
                        medium: {
                            url: 'https://i.ytimg.com/vi/PzLvD24pbic/mqdefault.jpg',
                            width: 320,
                            height: 180,
                        },
                        high: {
                            url: 'https://i.ytimg.com/vi/PzLvD24pbic/hqdefault.jpg',
                            width: 480,
                            height: 360,
                        },
                    },
                    channelTitle: 'JOLLY',
                    liveBroadcastContent: 'none',
                    publishTime: '2021-12-24T12:28:58Z',
                },
            },
        },
    };
}

// TODO: Add in video fetching functionality

const Watch = ({ video }) => {
    const { title, description } = video.snippet;
    const { videoId } = video.id;

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
                    <YoutubeEmbed videoId={videoId} />
                    <h1>{title}</h1>
                    <h2>{description}</h2>
                </div>
            </main>
        </>
    );
};

export default Watch;

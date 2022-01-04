// Next Imports
import Head from 'next/head';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';
import YoutubeEmbed from '../components/YoutubeEmbed/YoutubeEmbed';

// Style Imports

export default function Home() {
    return (
        <div>
            <Head>
                <title>YT Sync</title>
                <meta name='description' content='Youtube Sync App' />
                <link rel='icon' href='/favicon.ico' />
                <script src='https://www.youtube.com/iframe_api' />
            </Head>

            <main>
                <HeaderBar />
                <YoutubeEmbed embedId={'PzLvD24pbic'} />
            </main>
        </div>
    );
}

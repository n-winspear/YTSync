const YoutubeEmbed = ({ videoId }) => (
    <div className='video-responsive'>
        <iframe
            width='820'
            height='417'
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Embedded Video'
        />
    </div>
);

export default YoutubeEmbed;

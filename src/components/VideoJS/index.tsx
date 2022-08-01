import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"

export const VideoJSModal = (props: any) => {

    const videoRef = React.useRef(null);
    const playerRef = React.useRef<any>(null);
    const { options, onReady } = props;

    React.useEffect(() => {

        // make sure Video.js player is only initialized once
        if (!playerRef.current) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            const player = playerRef.current = videojs(videoElement, options, () => {
                console.log("player is ready");
                onReady && onReady(player);
            });
        } else {
            // you can update player here [update player through props]
            const player = playerRef.current;
            console.log('playerplayerplayer===', player);
            player.src(options.sources[0].src);
            player.autoplay(true);

        }
    }, [options, videoRef]);

    return (
        <div data-vjs-player>
            <video object-fit="contain" style={{
                width: 800,
                height: 500,
                margin: '20px auto'
            }
            } ref={videoRef} className="video-js vjs-big-play-centered"
            />
        </div >
    );
}
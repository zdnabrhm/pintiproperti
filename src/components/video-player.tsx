import ReactPlayer from "react-player";

interface VideoPlayerProps {
  src: string;
  title?: string;
}

export function VideoPlayer({
  src,
  title = "Property investment video",
}: VideoPlayerProps) {
  return (
    <ReactPlayer
      src={src}
      controls
      width="100%"
      height="auto"
      className="aspect-video rounded-xl"
      playsInline
      preload="metadata"
      onError={(error) => {
        console.error("Video playback error:", error);
      }}
      aria-label={title}
    />
  );
}

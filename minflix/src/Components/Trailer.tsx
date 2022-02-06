import { useQuery } from "react-query";
import { IVideo, getVideo } from "../api";
import YouTube from "react-youtube";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;

  * {
    width: 100%;
    height: 100%;
  }
`;

interface ITrailer {
  movieId: number;
}

function Trailer({ movieId }: ITrailer) {
  const { data: topMovieVideo, isLoading: isVideoLoading } = useQuery<IVideo>(
    ["video", "video"],
    () => getVideo(movieId)
  );

  return (
    <Wrapper>
      {isVideoLoading ? (
        <p>Loading..</p>
      ) : (
        <YouTube
          videoId={topMovieVideo?.results[0].key}
          opts={{
            width: window.innerWidth + "",
            height: window.innerHeight + "",
            playerVars: {
              autoplay: 1,
              loop: 1,
              fs: 1,
              rel: 0,
              controls: 0,
              showinfo: 0,
              disablekb: 1,
              enablejsapi: 0,
              modestbranding: 1,
            },
          }}
        />
      )}
    </Wrapper>
  );
}

export default Trailer;

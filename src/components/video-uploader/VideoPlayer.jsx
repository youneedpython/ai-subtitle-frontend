import React from "react";

function VideoPlayer({ src }) {
    // src가 없으면 렌더링하지 않음
    if (!src)
        return null

    return (
        <video width="480" controls style={{ marginTop: "20px" }}>
            <source src={src} type="video/mp4" />
            브라우저가 video 태그를 지원하지 않습니다.
        </video>
    );
}

export default VideoPlayer
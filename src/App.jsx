import React from "react";
import VideoUploaderContainer from "./components/video-uploader/VideoUploaderContainer";

function App() {
  return (
    <div className="App">
      {/* 타이틀을 가운데 정렬하도록 스타일 추가 */}
      <h1 style={{ textAlign: 'center', marginBottom: '20px'}}>AI 자막 생성기</h1>
      <VideoUploaderContainer />
    </div>
  );
}

export default App;

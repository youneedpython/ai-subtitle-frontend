import React, { useState } from "react";

// API 서비스
import { downloadSubtitleServing, uploadVideoAndGenerateSubtitle } from "../../services/api"

import VideoPlayer from "./VideoPlayer"
import ScriptDisplay from "./ScriptDisplay"
import Button from "../common/Button"
import styles from "./VideoUploader.module.css"

function VideoUploaderContainer() {
    const [file, setFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [scriptList, setScriptList] = useState([]);
    const [srtFileName, setSrtFileName] = useState('') // 다운로드할 SRT 파일 이름 저장
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        setVideoUrl(URL.createObjectURL(selected));
        setScriptList([]);  // 새 파일 선택 시, 스크립트 목록 초기화
        setSrtFileName(''); // 새 파일 선택 시, 파일명 초기화
    };

    const handleUpload = async () => {
        if (!file) {
            alert("파일을 선택하세요!");
            return;
        }

        setIsLoading(true);     // 로딩 시작

        try {
            // 서비스 함수 호출
            const res = await uploadVideoAndGenerateSubtitle(file);

            if (res.status === 200) {
                alert("자막 생성이 완료되었습니다!");
                console.log('res >> ', res)
                setScriptList(res.data.subtitles);  // 자막 내용 저장
                setSrtFileName(res.data.srt_filename);
            }
        } catch (err) {
            alert("업로드 실패:", (err.response?.data?.detail || err.message || "알 수 없는 오류"));
            console.error("업로드 실패 상세:", err);
        } finally {
            setIsLoading(false);    // 로딩 종료
        }
    };

    const handleDownload = () => {
        if (!srtFileName) {
            alert('다운로드할 자막 파일이 없습니다. 먼저 자막을 생성해주세요!');
            return;
        }

        // 서빙 방식 다운로드 서비스 호출 (window.open 포함) /////////////////////////////////
        downloadSubtitleServing(srtFileName);

        // Blob 방식 전환 시 아래 코드 사용 //////////////////////////////////////////////////
        // setIsLoading(true);

        // try {
        //     const res = await downloadSubtitleBlob(srtFileName);
        //     downloadBlobFile(res.data, srtFileName, 'application/x-subrip');
        //     alert('자막 다운로드가 완료되었습니다.');
        // } catch (err) {
        //     alert('자막 다운로드 실패: ' + (err.response?.data?.detail || err.message));
        //     console.error('다운로드 실패 상세: ', err);            
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <div className={styles.mainContainer}> {/* 전체 레이아웃을 위한 새로운 컨테이너 */}
            {/* 두 번째 줄: 버튼들 */}
            <div className={styles.buttonSection}>
                {/* 실제 파일 input은 숨기고, label 역할을 하는 Button 컴포넌트와 연결 */}
                <input type="file"
                    accept="video/mp4"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    id="file-upload-input"  // Button 컴포넌트의 htmlFor와 연결될 id
                />
                <Button htmlFor="file-upload-input"> {/* htmlFor를 사용하여 input과 연결 */}
                    파일 선택
                </Button>
                <Button
                    onClick={handleUpload}
                    disabled={!file || isLoading}
                    style={{ marginLeft: "10px" }}
                >
                    {isLoading && file ? "생성 중..." : "자막 생성"}
                </Button>
                {/* 서빙 방식이므로 handleDownload에 async 제거, Blob 방식 전환 시 다시 추가 */}
                {/* 자막 다운로드 버튼 추가 */}
                <Button onClick={handleDownload}
                    disabled={!srtFileName || isLoading}
                    primary={!!srtFileName}
                    style={{ marginLeft: "10px" }}
                >
                    {isLoading && srtFileName ? "다운로드 준비 중..." : "자막 다운로드"}
                </Button>
            </div>

            {/* 세 번째 줄: 영상 및 스크립트 */}
            <div className={styles.contentSection}>
                {/* 왼쪽: 영상 */}
                <div className={styles.videoPlayerWrapper}>
                    {videoUrl ? (
                        <VideoPlayer src={videoUrl} />
                    ) : (
                        <div className={styles.videoPlaceholder}>
                            업로드된 영상이 표시됩니다.
                        </div>
                    )}
                </div>

                {/* 오른쪽: 추출된 스크립트 */}
                <div className={styles.scriptDisplayWrapper}>
                    <h3>추출된 스크립트</h3>
                    <ScriptDisplay scriptList={scriptList} />
                </div>
            </div>
        </div>
    );
}

export default VideoUploaderContainer
import axios from "axios";

// 백엔드 기본 URL
const API_BASE_URL = 'http://backend-app-env.eba-g9jzbjub.ap-northeast-2.elasticbeanstalk.com';

export const uploadVideoAndGenerateSubtitle = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_BASE_URL}/create_subtitled_video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 360000, // 6분 (60,000ms * 6) ==> 충분히 길게 설정
    });
};

// 서빙 방식(window.open)
export const downloadSubtitleServing = (filename) => {
    const downloadLink = `${API_BASE_URL}/download_subtitle/${filename}`;
    window.open(downloadLink, '_blank');
};

// Blob 방식 다운로드 엔드포인트도 필요하다면 여기에 추가 (현재 사용하지 않음)
// export const downloadSubtitleBlob = (filename) => {
//     return axios.get(`${API_BASE_URL}/download_subtitle_blob/${filename}`, {
//         responseType: 'blob'
//     });
// };
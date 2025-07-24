// 현재 프로젝트에서는 서빙 방식으로 다운로드하므로 이 파일은 선택적입니다.
// 향후 Blob 다운로드로 전환 시 아래 함수를 사용합니다.

// export const downloadBlobFile = (data, filename, mimeType) => {
//     const blob = new Blob([data], { type: mimeType });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', filename);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
// };
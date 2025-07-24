import React from "react";
import styles from './VideoUploader.module.css'

function ScriptDisplay({ scriptList }) {
    return (
        <div className={styles.scriptListContainer}>
            {scriptList.length === 0 ? (
                <p>스크립트 없음</p>
            ) : (
                scriptList.map((line) => (
                    <div key={line.index} className={styles.scriptItem}>
                        <div className={styles.scriptTime}>
                            {line.start} ~ {line.end}
                        </div>
                        <div className={styles.scriptText}>
                            {line.text}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ScriptDisplay;
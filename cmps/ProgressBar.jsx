export function ProgressBar({ doneCount, totalCount }) {
    return (
        <div>
            <label htmlFor="progress">Progress:</label>
            <progress id="progress" value={doneCount} max={totalCount}>
                {doneCount/totalCount*100}%
            </progress>
        </div>
    )
}
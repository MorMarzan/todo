export function ProgressBar({ doneCount, totalCount }) {
    return (
        <div className="progress">
            <label htmlFor="progress"></label>
            <progress id="progress" value={doneCount} max={totalCount}>
                {doneCount/totalCount*100}%
            </progress>
        </div>
    )
}
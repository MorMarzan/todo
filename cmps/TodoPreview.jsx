

export function TodoPreview({todo}) {
// export function TodoPreview({ todo }) {
    return (
        <article className="todo-preview">
            <h2>{todo.txt}</h2>
            <h4>id: {todo._id}</h4>
            <h4>Todo done? {todo.isDone ? 'yes': 'no'}</h4>
        </article>
    )
}
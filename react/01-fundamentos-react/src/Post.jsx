export function Post(props) {
  return (
    <div>
      <strong>{props.author}</strong>
      <p id="">{props.content}</p>
    </div>
  )
}
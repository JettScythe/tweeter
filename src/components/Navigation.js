import './Navigation.css'

export const Navigation = props => {
  const { focus } = props
  return (
    <nav>
      <a href="/"><span>tweeter</span></a>
      <span className="navDesc">
        <div>
        <strong>Write</strong> a new tweet
        </div>
        <i onClick={focus} className="fas fa-angle-double-down"></i>
      </span>
    </nav>
  )
}
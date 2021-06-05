import './Tweet.css'
import TimeAgo from 'react-timeago'

export const Tweet = (props) => {
  const {name, avatar, handle, text, date} = props
  const newTime = <TimeAgo date={date} />
  return (
    <article className="tweet">
          <header>
            <div className="user">
              <span>
                <img className="profile-image" src={avatar} alt=""/>
              </span>
              <span>{name}</span>
            </div>
            <span className="handle">{handle}</span>
          </header>
          <h5>{text}</h5>
          <footer>
            <span className="time">{newTime}</span>
            <div className="tweet-icons">
                <i className="fas fa-flag"></i>
                <i className="fas fa-retweet"></i>
                <i className="fas fa-heart"></i>
            </div> 
          </footer>
    </article>
  )
}
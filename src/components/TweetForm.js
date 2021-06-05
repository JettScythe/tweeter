import React, { useState } from 'react'
import './TweetForm.css'

export const TweetForm = props => {
  const { addNewTweet } = props
  const [text, setText] = useState("")
  const remainingLength = 140 - text.length
  const outputStyle = {color: remainingLength >= 0 ? "hsla(44, 7%, 31%, 1)" : "hsla(0, 100%, 50%, 1)"}

  const submitTweet = event => {
    event.preventDefault()
    if (remainingLength >= 0 && remainingLength < 140) {
      addNewTweet(text)
      setText("")
    }
  }

  return (
    <section className="new-tweet">
        <h2>Compose Tweet</h2>
        <span className="error-area"></span>
        <form onSubmit={submitTweet} method="POST" action="/tweets" id="new-tweet-form">
          <textarea value={text} onChange={event => setText(event.target.value)} name="text" id="tweet-text" required></textarea>
          <label for="tweet-text">What are you humming about?</label>
          <div>
            <button type="submit">Tweet</button>
            <output style={outputStyle} name="counter" className="counter" for="tweet-text">{140 - text.length}</output>
          </div>
        </form>
    </section>
  )
}
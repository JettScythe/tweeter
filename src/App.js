import React, { useState } from 'react';
import './App.css';
import { Navigation } from './components/Navigation'
import { Profile } from './components/Profile'
import { TweetForm } from './components/TweetForm'
import { Tweet } from './components/Tweet'
import profileImage from './images/profile-hex.png'

const initialTweetData = [
  {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
    text: "If I have seen further it is by standing on the shoulders of giants",
    date: 1622734000282
  },
  {
    name: "Descartes",
    avatars: "https://i.imgur.com/nlhLi3I.png",
    handle: "@rd",
    text: "Je pense , donc je suis",
    date: 1622820400282
  }
]

function App() {

  const [tweetData, setTweetData] = useState(initialTweetData)

  const tweets = tweetData.map((tweetData, index) => {
    return (
      <Tweet key={index} name={tweetData.name} avatar={tweetData.avatars} handle={tweetData.handle} text={tweetData.text} date={tweetData.date} />
    )
  })

  const addNewTweet = text => {
    const newTweet = {
      name: "Phillip Defranco",
      avatars: profileImage,
      handle: "@sxephil",
      text,
      date: Date.now()
    }
    setTweetData([newTweet, ...tweetData])
  }

  const focus = () => {
    document.getElementById("tweet-text").focus()
  }

  return (
    <div className="App">
      <Navigation focus={focus}/>
      <div className="responsive">
        <Profile />
        <main className="container">
        <TweetForm addNewTweet={addNewTweet}/>
        {tweets}
        </main>
      </div>
      <span class="to-top fas fa-arrow-up"></span>
    </div>
  );
}

export default App;

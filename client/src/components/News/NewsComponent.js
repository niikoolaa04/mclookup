import { React, useEffect, useState } from 'react'
import { newsArray } from '../../assets/news';
import './style.css';

function NewsComponent() {

  let [news, setNews] = useState({
    title: newsArray[Math.floor(Math.random() * newsArray.length)].title,
    text: newsArray[Math.floor(Math.random() * newsArray.length)].text
  });

  useEffect(() => {
    setInterval(() => {
      let newsEl = document.querySelector(".news");
      let randomEl = newsArray[Math.floor(Math.random() * newsArray.length)]
      setNews({
        title: randomEl.title,
        text: randomEl.text
      })
      newsEl.innerHTML = randomEl.title;
    }, 20000)
  }, []);

  return (
    <div>
      <div className="newsContainer">
        <p className="news" onMouseEnter={() => {
          let newsElement = document.querySelector(".fullNews");
          newsElement.style.opacity = "100%";
        }}
        onMouseLeave={() => {
          let newsElement = document.querySelector(".fullNews");
          newsElement.style.opacity = "0%";
        }}>{ newsArray[Math.floor(Math.random() * newsArray.length)].title}</p>
      </div>
      <div className="newsOuter">
        <div className="fullNews">
          <p className="newsTitle">{ news.title.toUpperCase() }</p>
          <p className="newsText">{ news.text }</p>
        </div>
      </div>
    </div>
  )
}

export default NewsComponent

import { useState, useEffect } from "react"
import { getRandomColorCSS } from "./GetRandomStuff"

const sourcePath =
  "https://raw.githubusercontent.com/koynoyno/hsk3.0-json/main/hsk3.json"

interface Word {
  words: string
  simplified: string
}

var PrinterHSK = () => {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const resp = await fetch(sourcePath)
      const data = await resp.json()
      // setWords(data['words'])
      setWords(data.words)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [textColor, setTextColor] = useState(getRandomColorCSS())

  const [name, setSingleName] = useState<string>(() => {
    if (words.length === 0) return ""
    return words[Math.floor(Math.random() * words.length)].simplified
  })

  useEffect(() => {
    if (words.length > 0) {
      const res = words[Math.floor(Math.random() * words.length)].simplified
      setSingleName(res)
    }
  }, [words])

  var handleOnClick = () => {
    setTextColor(getRandomColorCSS())
    if (words.length === 0) return
    setSingleName(words[Math.floor(Math.random() * words.length)].simplified)
  }

  return (
    <>
      <div className="main-body-lower" onClick={handleOnClick}>
        <div className="div-text">
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              <span
                className="span-text"
                title="click me !!!"
                // onClick={handleOnClick}
                style={textColor}
              >
                {name}
              </span>
              <br />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default PrinterHSK

import React, { useEffect } from 'react'
import "./App.css"
import { useState } from 'react'

const App = () => {
  const[input, setinput]=useState("")
  const[data, setdata]=useState([])
  useEffect(()=>{
    searchHandler()
  },[setinput])

  const searchHandler = async(e) => {
    e.preventDefault()
     try {
      const res = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/learners/json/${input}?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await res.json()
      console.log(data);
      
      setdata(data)
     } catch (error) {
      console.log(error);
      
     }
  }
  const handleClick =(e)=> {
    setinput(e.target.textContent)

  }
  return (
    <div>
      <nav>
        <div className="container">
          <h1 className="dc">DICTIONARY</h1>
        </div>
      </nav>

      <section className="input container">
        <h2>Find any word exist in the world 😊</h2>
        <div className="form__wrap">
          <div className="input__wrap">
            <input
              type="text"
              placeholder="Type a word"
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
              id="input"
            />
            <button id="search" onClick={searchHandler}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center">
        <div>
          <h1 className="p-4">
            <span
              className="text-2xl font-extrabold "
              style={{ color: "#553c9a" }}
            >
              Defination:{" "}
            </span>
            <span className="text-lg font-bold">{data[0]?.shortdef[0]}</span>
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4 ">
          {data.map((data) => {
            return (
              <div
                key={data.meta.uuid}
                className="h-10 w-48  m-2 p-4 text-center text-white flex items-center justify-center rounded-lg"
                style={{ backgroundColor: "#553c9a" }}
              >
                <button
                  className="flex items-center justify-center"
                  onClick={handleClick}
                >
                  {data.meta.stems[0]}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App

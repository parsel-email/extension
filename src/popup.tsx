import "./style.css"
import { useState } from "react"


function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="flex flex-col p-4 space-y-4 w-96 max-w-full min-h-[300px]">
      <h1 className="text-lg font-bold">
        Welcome to your{" "}
        <a
          href="https://www.plasmo.com"
          className="link link-primary"
        >
          Parsel
        </a>{" "}
        Extension!
      </h1>
      <button className="btn btn-primary w-fit self-start">
        DaisyUI Button
      </button>
      <input
        className="input input-bordered w-full"
        onChange={(e) => setData(e.target.value)}
        value={data}
        placeholder="Type something..."
      />
      <footer className="text-xs text-base-content/50">Crafted by @PlasmoHQ</footer>
    </div>
  )
}

export default IndexPopup
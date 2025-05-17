import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-lg font-bold mb-4">
        Welcome to your{" "}
        <a href="https://www.plasmo.com" className="text-blue-600 underline hover:text-blue-800">
          Parsel
        </a>{" "}
        Extension!
      </h1>
      <input
        className="border border-gray-300 rounded px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setData(e.target.value)}
        value={data}
        placeholder="Type something..."
      />
      <footer className="text-xs text-gray-500">Crafted by @PlasmoHQ</footer>
    </div>
  )
}

export default IndexPopup
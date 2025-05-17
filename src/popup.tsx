import "./style.css"
import { useState } from "react"
import { supabase } from "./supabase"


function IndexPopup() {
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.href
        }
      })
    } catch (error) {
      alert("Error logging in with Google")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col p-4 space-y-4 w-96 max-w-full min-h-[300px]">
      <h1 className="text-lg font-bold">Login to Parsel</h1>
      <button
        className="btn btn-primary w-fit self-start"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  )
}

export default IndexPopup
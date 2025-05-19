import type { User } from "@supabase/supabase-js" // Provider removed
import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { supabase } from "./supabase"
import "./style.css"

function SidePanel() {
  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage({
      area: "local"
    })
  })

  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        return
      }
      if (!!data.session) {
        setUser(data.session.user)
        sendToBackground({
          name: "init-session",
          body: {
            refresh_token: data.session.refresh_token,
            access_token: data.session.access_token
          }
        } as any)
      }
    }

    init()

    // Listen for auth changes to update the UI
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setUser(session.user)
          sendToBackground({
            name: "init-session",
            body: {
              refresh_token: session.refresh_token,
              access_token: session.access_token
            }
          } as any)
        } else if (event === "SIGNED_OUT") {
          setUser(null)
          // Optionally, tell background session ended if needed
          // sendToBackground({ name: "session-ended" } as any)
        }
      }
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  // handleOAuthLogin removed from here

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage()
  }

  return (
    <div className="flex flex-col p-4 space-y-4 w-96 max-w-full min-h-screen bg-base-200">
      <h1 className="text-4xl font-bold">Parsel</h1>
      <div className="flex flex-col w-full gap-4 p-6 rounded-xl shadow-lg bg-base-100 border border-base-300">
        {user && (
          <>
            <h3 className="text-lg font-semibold mb-2 flex flex-col">
              <span>Logged in as:</span>
              <span className="truncate">{user.email}</span>
              <span className="text-xs text-base-content/60">{user.id}</span>
            </h3>
            <p className="text-sm text-base-content/80">
              To logout, please go to the extension's options page.
            </p>
            <button className="btn btn-secondary" onClick={openOptionsPage}>
              Open Options
            </button>
          </>
        )}
        {!user && (
          <>
            <p className="text-lg font-semibold mb-2">You are not logged in.</p>
            <p className="text-sm text-base-content/80 mb-4">
              Please log in via the extension's options page to use Parsel.
            </p>
            <button className="btn btn-primary" onClick={openOptionsPage}>
              Login via Options Page
            </button>
          </>
        )}
      </div>
      {/* Add other side panel content here */}
    </div>
  )
}

export default SidePanel
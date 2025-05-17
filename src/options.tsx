import type { Provider, User } from "@supabase/supabase-js"
import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { supabase } from "./supabase"

import "./style.css"

const CRX_REDIRECT_URL = `chrome-extension://${process.env.PLASMO_PUBLIC_CRX_ID}/options.html`

function IndexOptions() {
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
  }, [])

  const handleOAuthLogin = async (provider: Provider, scopes = "email") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: CRX_REDIRECT_URL
      }
    })
  }

  return (
    <main className="flex justify-center items-center w-full min-h-screen bg-base-200">
      <div className="flex flex-col w-80 gap-4 p-6 rounded-xl shadow-lg bg-base-100 border border-base-300">
        {user && (
          <>
            <h3 className="text-lg font-semibold mb-2 flex flex-col">
              <span className="truncate">{user.email}</span>
              <span className="text-xs text-base-content/60">{user.id}</span>
            </h3>
            <button
              className="btn btn-error btn-outline"
              onClick={async () => {
                await supabase.auth.signOut()
                await supabase.auth.getUser() // force refresh
                await supabase.auth.getSession() // force refresh
                setUser(null)
              }}>
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <button
              className="btn btn-primary"
              onClick={() => {
                console.log(CRX_REDIRECT_URL)
                handleOAuthLogin("google")
              }}>
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </main>
  )
}

export default IndexOptions

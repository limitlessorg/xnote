import React from 'react'
import { Outlet } from 'react-router-dom'
import { isMobile } from 'utils'

const PassportLayout: React.FC = () => {
  const result = isMobile()
  return (
    <div className="h-full w-full">
      {!result && (
        <>
          <img
            className="absolute left-10 bottom-0 h-4/5 w-1/2 bg-auto"
            src="/passport.png"
            alt=""
          />
          <div className="absolute top-1/4 right-40 h-3/5 w-1/4">
            <Outlet />
          </div>
        </>
      )}
      {result && (
        <div className="px-8 py-24">
          <Outlet />
        </div>
      )}
    </div>
  )
}
export default PassportLayout

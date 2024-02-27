import React from 'react'

function NotificationButton() {
  return (
    <div className="hs-dropdown [--trigger:hover]  z-50">
      {/* notification button */}
      <button
        type="button"
        id="hs-dropdown-hover-event"
        className="w-[2.375rem] h-[2.375rem] hs-dropdown-toggle inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        data-hs-offcanvas="#hs-offcanvas-left"
      >
        <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 21">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z" />
        </svg>
      </button>
      <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[20rem] border bg-gray-50 shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" aria-labelledby="hs-dropdown-hover-event">
        <div className="py-2 first:pt-0 last:pb-0">
          <span className="block py-3 px-3 text-sm text-black dark:text-white">
            Your notifications will show up here
          </span>
        </div>
      </div>
    </div>
  )
}

export default NotificationButton
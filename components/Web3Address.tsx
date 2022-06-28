import React from 'react'

export function Web3Address() {

  return (
    <div className="flex items-center justify-center">
      <div className="border-grey md: w-full rounded-xl border sm:max-w-xl md:max-w-2xl">
        <div className="flex flex-row justify-between py-2 px-6">
          <span className="md:text-md text-left text-sm font-light lg:text-lg">
            Address
          </span>
          <span className="md:text-md truncate pl-4 text-right text-sm  font-light lg:text-lg">
          </span>
        </div>
      </div>
    </div>
  )
}

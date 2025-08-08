import React from 'react'
import laptopImage from "../assets/chatWindow_default.png"

const DefaultChatWindow = () => {
  return (
    <div className="min-h-screen bg-[#f1f1f1] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <img
          src={laptopImage}
          alt="Laptop with WhatsApp"
          className="mx-auto w-full max-w-xs mb-6"
        />

        <h1 className="text-2xl md:text-3xl font-medium mb-2">
          Download WhatsApp for Windows
        </h1>

        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Make calls, share your screen and get a faster experience when you download the Windows app.
        </p>

        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-300">
          Download
        </button>

        <p className="text-xs text-gray-500 mt-10 flex items-center justify-center gap-2">
          <span role="img" aria-label="lock">🔒</span>
          Your personal messages are end-to-end encrypted
        </p>
      </div>
    </div>
  );
}

export default DefaultChatWindow

import { useState } from 'react'

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)

  if (showConfirm) {
    return (
      <div className="fixed flex bg-gray-950/60 inset-0 items-center h-full justify-center">
        <div className=" bg-white p-4 rounded-lg">
          <div className="text-center mb-2">
            Are you sure you want to delete?
          </div>
          <div className="flex gap-2">
            <button
              className=" bg-gray-200"
              type="button"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="primary"
              onClick={() => {
                onDelete()
                setShowConfirm(false)
              }}
              type="button"
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      className="px-2 bg-gray-200"
      onClick={() => setShowConfirm(true)}
      type="button"
    >
      {label}
    </button>
  )
}

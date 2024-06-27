import toast from 'react-hot-toast'
import Image from 'next/image'

export default function EditableImage({ link, setLink }) {
  async function handleImageFile(ev) {
    const files = ev.target.files
    if (files?.length === 1) {
      const data = new FormData()
      data.set('files', files[0])

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link)
          })
        }
        throw new Error('Something went wrong')
      })

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload successfully!',
        error: 'Error Uploading Image!',
      })
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-full w-full h-full mb-1"
          alt="Item Image"
          src={link}
          width={250}
          height={250}
        />
      )}
      {!link && (
        <div className="bg-gray-200 p-4 text-gray-500 rounded-lg">No Image</div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleImageFile} />
        <span className="mt-2 block p-1 border border-gray-300 rounded-lg text-center cursor-pointer">
          Edit
        </span>
      </label>
    </>
  )
}

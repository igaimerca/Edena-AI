'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload } from 'lucide-react'
import { toast } from 'react-toastify'

export default function ResumeUploadDropzone() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]

      if (file.size > 5 * 1024 * 1024) {
        toast.error('File is too large! Max size is 5MB.')
        return
      }

      setSelectedFile(file)
      toast.info('Parsing your resume...')

      const formData = new FormData()
      formData.append('resume', file)

      try {
        const res = await fetch('http://localhost:3001/api/resume/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          throw new Error('Server error')
        }

        const data = await res.json()
        console.log('🧠 Basic Info:', data.basicInfo)
        console.log('✅ Parsed Data:', data.parsed)
        toast.success('Resume parsed successfully! Check the console.')
      } catch (err) {
        console.error(err)
        toast.error('Failed to parse resume. Try again.')
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
    },
  })

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Upload Resume</h2>
        <p className="text-white/60 text-center mb-8">PDF or DOC/DOCX files supported</p>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl px-6 py-14 transition-colors duration-300 cursor-pointer
            ${isDragActive ? 'border-[#5D2CA8] bg-[#1f1f1f]' : 'border-white/20 bg-gradient-to-br from-black via-[#2c2c2c] to-black'}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            <CloudUpload className="w-10 h-10 text-white/60 mb-4" />
            <p className="text-white/80 text-lg font-medium">
              {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-white/50 mt-2">PDF or Word file only (Max: 5MB)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

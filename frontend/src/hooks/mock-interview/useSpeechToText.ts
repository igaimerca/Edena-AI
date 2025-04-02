export function useSpeechToText() {
    let mediaRecorder: MediaRecorder
    let chunks: Blob[] = []
  
    const startRecording = async (): Promise<string> => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder = new MediaRecorder(stream)
  
      return new Promise((resolve) => {
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
  
        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunks, { type: 'audio/webm' })
          const form = new FormData()
          form.append('file', blob)
          const res = await fetch('/api/openai/stt', { method: 'POST', body: form })
          const { text } = await res.json()
          resolve(text)
        }
  
        mediaRecorder.start()
  
        setTimeout(() => {
          mediaRecorder.stop()
        }, 120 * 1000) // 2 minutes max recording
      })
    }
  
    const stopRecording = () => {
      if (mediaRecorder?.state === 'recording') {
        mediaRecorder.stop()
      }
    }
  
    return { startRecording, stopRecording }
  }
  
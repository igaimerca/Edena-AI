// lib/api.ts
export const speakWithOpenAI = async (text: string) => {
    const res = await fetch('http://localhost:3001/api/interview/tts', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' },
    })
  
    const blob = await res.blob()
    const audio = new Audio(URL.createObjectURL(blob))
    await audio.play()
  }
  
  export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'audio.webm')
  
    const res = await fetch('http://localhost:3001/api/interview/stt', {
      method: 'POST',
      body: formData,
    })
  
    if (!res.ok) {
      const errorText = await res.text()
      console.error("STT API Error:", errorText)
      throw new Error("Failed to transcribe audio")
    }
  
    const data = await res.json()
    return data.transcript // ✅ This must match what your backend sends back
  }
  
export async function transcribeAudio(blob: Blob): Promise<string> {
    const formData = new FormData()
    formData.append('file', blob)
    
    const res = await fetch('/api/openai/stt', {
      method: 'POST',
      body: formData,
    })
  
    const data = await res.json()
    return data.transcription || ''
  }
  
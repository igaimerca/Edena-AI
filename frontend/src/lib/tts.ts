export async function speakWithOpenAI(text: string) {
    const res = await fetch('/api/openai/tts', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
  
    const blob = await res.blob()
    const audio = new Audio(URL.createObjectURL(blob))
    return new Promise<void>((resolve) => {
      audio.onended = () => resolve()
      audio.play()
    })
  }
  
export function useTextToSpeech() {
    const playSpeech = async (text: string) => {
      const res = await fetch('/api/openai/tts', {
        method: 'POST',
        body: JSON.stringify({ text }),
      })
      const blob = await res.blob()
      const audio = new Audio(URL.createObjectURL(blob))
      await audio.play()
    }
  
    return { playSpeech }
  }
  
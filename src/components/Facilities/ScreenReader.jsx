import React, { useState, useEffect } from "react";

const ScreenReader = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      const femaleVoice = availableVoices.find(voice =>
        voice.name.toLowerCase().includes("female")
      );
      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
      }
    };

    
    populateVoices();


    window.speechSynthesis.onvoiceschanged = populateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null; 
    };
  }, []);

  const handleSpeak = () => {
    if (text.trim() === "") return;

    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = selectedVoice; 
    speech.lang = "en-US"; 
    speech.rate = 1; 
    
    speech.onend = () => {
      console.log("Speech has finished.");
    };

    window.speechSynthesis.speak(speech); 
  };

  return (
    <div className="container mx-auto p-5 max-w-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Screen Reader</h1>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="6"
        placeholder="Enter text here to read aloud..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSpeak}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Read Aloud
      </button>
      <div className="mt-4">
        <h2 className="text-xl">Available Voices:</h2>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setSelectedVoice(voices[e.target.value])}
        >
          <option value="">Select a voice</option>
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ScreenReader;

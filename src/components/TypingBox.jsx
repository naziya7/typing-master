import React, { useState, useEffect } from 'react';
import sentences from './sentence';
import './type.css';

const TouchTyping = () => {
  const [currentSentence, setCurrentSentence] = useState('');
  const [typedText, setTypedText] = useState('');
  const [nextCharacters, setNextCharacters] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [keyPresses, setKeyPresses] = useState(0);
  const [showResetButton, setShowResetButton] = useState(false);

  const handleTextChange = (e) => {
    const { value } = e.target;
    setTypedText(value);
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const handleSentenceChange = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const sentence = sentences[randomIndex];
    setCurrentSentence(sentence);
    setTypedText('');
    setNextCharacters(sentence);
    setStartTime(0);
    setEndTime(0);
    setAccuracy(0);
    setKeyPresses(0);
    setShowResetButton(true);
  };

  const handleKeyPress = () => {
    setKeyPresses((prevKeyPresses) => prevKeyPresses + 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEndTime(Date.now());

    const wordsCount = currentSentence.trim().split(' ').length;
    const typedWordsCount = typedText.trim().split(' ').length;

    const calculatedAccuracy = (typedWordsCount / wordsCount) * 100 || 0;

    setAccuracy(calculatedAccuracy.toFixed(2));
  };

  useEffect(() => {
    handleSentenceChange();
  }, []);

  useEffect(() => {
    const charactersToType = currentSentence.slice(
      typedText.length,
      typedText.length + 10
    );
    setNextCharacters(charactersToType);
  }, [currentSentence, typedText]);

  const handleReset = () => {
    setCurrentSentence('');
    setTypedText('');
    setNextCharacters('');
    setStartTime(0);
    setEndTime(0);
    setAccuracy(100);
    setKeyPresses(0);
    setShowResetButton(false);
  };

  return (
    <div className="typing-game-container">
      <div className="content">
        <h1 className="heading">Touch Typing Game</h1>
        <div className="sentence">
          <p>{currentSentence}</p>
        </div>
        <p className="nextchar">Next Characters: {nextCharacters}</p>
        <form onSubmit={handleFormSubmit}>
          <textarea
            value={typedText}
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
            placeholder="Start typing..."
            rows={4}
            cols={50}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="features">
          <div className="individualfeatures">
            <p>Accuracy: {accuracy}%</p>
          </div>
          <div className="individualfeatures">
            <p>Key Presses: {keyPresses}</p>
          </div>
        </div>
        {showResetButton && (
          <button onClick={handleReset}>Reset</button>
        )}
        <button onClick={handleSentenceChange}>Start</button>
      </div>
    </div>
  );
};

export default TouchTyping;
// const TouchTyping = () => {
//   const [currentSentence, setCurrentSentence] = useState('');
//   const [typedText, setTypedText] = useState('');
//   const [nextCharacters, setNextCharacters] = useState('');
//   const [startTime, setStartTime] = useState(0);
//   const [endTime, setEndTime] = useState(0);
//   const [accuracy, setAccuracy] = useState(100);
//   const [keyPresses, setKeyPresses] = useState(0);

//   const handleTextChange = (e) => {
//     const { value } = e.target;
//     setTypedText(value);
//     if (!startTime) {
//       setStartTime(Date.now());
//     }
//   };

//   const handleSentenceChange = () => {
//     const randomIndex = Math.floor(Math.random() * sentences.length);
//     const sentence = sentences[randomIndex];
//     setCurrentSentence(sentence);
//     setTypedText('');
//     setNextCharacters(sentence);
//     setStartTime(0);
//     setEndTime(0);
//     setAccuracy(0);
//     setKeyPresses(0);
//   };

//   const handleKeyPress = () => {
//     setKeyPresses((prevKeyPresses) => prevKeyPresses + 1);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     setEndTime(Date.now());

//     const wordsCount = currentSentence.trim().split(' ').length;
//     const typedWordsCount = typedText.trim().split(' ').length;

//     const calculatedAccuracy = (typedWordsCount / wordsCount) * 100 || 0;

//     setAccuracy(calculatedAccuracy.toFixed(2));
//   };

//   useEffect(() => {
//     handleSentenceChange();
//   }, []);

//   useEffect(() => {
//     const charactersToType = currentSentence.slice(
//       typedText.length,
//       typedText.length + 10
//     );
//     setNextCharacters(charactersToType);
//   }, [currentSentence, typedText]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (startTime > 0 && Date.now() - startTime >= 5 * 60 * 1000) {
//         setEndTime(Date.now());
//         clearInterval(interval);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [startTime]);

//   return (
//     <div className="typing-game-container">
//       <div className="content">
//         <h1 className="heading">Touch Typing Game</h1>
//         <div className="sentence">
//           <p>{currentSentence}</p>
//         </div>
//         <p className="nextchar">Next Characters: {nextCharacters}</p>
//         <form onSubmit={handleFormSubmit}>
//           <textarea
//             value={typedText}
//             onChange={handleTextChange}
//             onKeyPress={handleKeyPress}
//             placeholder="Start typing..."
//             rows={4}
//             cols={50}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <div className="features">
//           <div className="individualfeatures">
//             <p>Accuracy: {accuracy}%</p>
//           </div>
//           <div className="individualfeatures">
//             <p>Key Presses: {keyPresses}</p>
//           </div>
//         </div>
//         <button onClick={handleSentenceChange}>Change Sentence</button>
//       </div>
//     </div>
//   );
// };

// export default TouchTyping;
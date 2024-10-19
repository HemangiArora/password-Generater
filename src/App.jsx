
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

const App = () => {
  const [password, setPassword] = useState(""); // To store the generated password
  const [length, setLength] = useState(19); // Default password length
  const [includeUppercase, setIncludeUppercase] = useState(true); // Toggle uppercase letters
  const [includeLowercase, setIncludeLowercase] = useState(true); // Toggle lowercase letters
  const [includeNumbers, setIncludeNumbers] = useState(false); // Toggle numbers
  const [includeSymbols, setIncludeSymbols] = useState(true); // Toggle symbols
  const [strengthLevel, setStrengthLevel] = useState("Strong"); // User-selected strength

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characterSet = "";
    if (includeUppercase) characterSet += uppercase;
    if (includeLowercase) characterSet += lowercase;
    if (includeNumbers) characterSet += numbers;
    if (includeSymbols) characterSet += symbols;

    // Adjust password generation based on the strength level selected
    if (strengthLevel === "Average") {
      setLength(8); // Shorter passwords
      setIncludeNumbers(false); // Exclude numbers
      setIncludeSymbols(false); // Exclude symbols
    } else if (strengthLevel === "Good") {
      setLength(12); // Medium-length passwords
      setIncludeNumbers(true); // Include numbers
      setIncludeSymbols(false); // Exclude symbols
    } else if (strengthLevel === "Strong") {
      setLength(19); // Longer passwords
      setIncludeNumbers(true); // Include numbers
      setIncludeSymbols(true); // Include symbols
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      generatedPassword += characterSet[randomIndex];
    }

    setPassword(generatedPassword);

    // Show toast notification that a new password has been generated
    toast.success("New password generated!");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-900 text-white rounded-lg mt-10">
      {/* Input box to show generated password */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          value={password}
          readOnly
          className="w-3/4 p-2 text-lg bg-gray-800 rounded"
        />
        <button
          onClick={() => navigator.clipboard.writeText(password)}
          className="p-2 bg-green-600 text-white rounded ml-2"
        >
          COPY
        </button>
      </div>

      {/* Strength selection dropdown */}
      <div className="mb-6">
        <label className="block mb-2">Password Strength</label>
        <select
          value={strengthLevel}
          onChange={(e) => setStrengthLevel(e.target.value)}
          className="w-full p-2 text-black rounded"
        >
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Strong">Strong</option>
        </select>
      </div>

      {/* Slider to set password length (adjustable based on strength level) */}
      <div className="mb-6">
        <label className="block mb-2">Character Length</label>
        <input
          type="range"
          min="4"
          max="30"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-3/4"
        />
        <span className="ml-4 text-lg">{length}</span>
      </div>

      {/* Checkboxes for password options (Uppercase, Lowercase, Numbers, Symbols) */}
      <div className="mb-6">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="mr-2"
          />
          Include Uppercase Letters
        </label>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
            className="mr-2"
          />
          Include Lowercase Letters
        </label>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
          Include Numbers
        </label>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="mr-2"
          />
          Include Symbols
        </label>
      </div>

      {/* Password strength display */}
      <div className="mb-6">
        <p className="text-lg">Strength: {strengthLevel}</p>
      </div>

      {/* Button to generate password */}
      <button
        onClick={generatePassword}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        GENERATE PASSWORD
      </button>

      {/* Toast Container for displaying notifications, positioned at the top-right corner */}
      <ToastContainer
        position="top-right" // Position the toast at the top-right corner
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;

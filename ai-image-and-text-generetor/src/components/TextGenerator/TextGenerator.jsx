import React, { useState, useRef } from "react";
import "./TextGenerator.css"; 

function TextGenerator() {
  const [inputText, setInputText] = useState(""); 
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false); 
  const inputRef = useRef(null); 

  
  const generateText = async () => {
    if (!inputText) return; 

    setLoading(true); 

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_api_key", 
        },
        body: JSON.stringify({
          prompt: inputText,
          max_tokens: 100, 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate text");
      }

      const data = await response.json();
      setGeneratedText(data.choices[0].text.trim()); 
    } catch (error) {
      console.error("Error generating text:", error);
      setGeneratedText("Failed to generate text");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 heading text-center">
            AI Text <span>generator</span>{" "}
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-3"></div>
          <div className="col-md-6 text-center">
            <div className="search-box">
              <input
                type="text"
                className="text-input"
                ref={inputRef}
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div
                className="generate-btn"
                onClick={() => generateText()}
              >
                Generate Text
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-3"></div>
          <div className="col-md-6 text-center">
            <div className="generated-text">
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                <div>{generatedText}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TextGenerator;

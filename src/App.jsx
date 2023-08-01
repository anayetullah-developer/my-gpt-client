import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setResponse(result.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">Chat with GPT-3</div>
            <div className="card-body">
              <div className="chat-box">
                {response && (
                  <div className="chat-message">
                    <div className="text-right">
                      <p className="text-secondary mb-1">You:</p>
                      <p className="bg-light p-2 mb-1">{prompt}</p>
                    </div>
                    <div>
                      <p className="text-secondary mb-1">GPT-3:</p>
                      <p className="bg-light p-2 mb-1">{response}</p>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="mt-3">
                <div className="form-group">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="form-control"
                    placeholder="Type your message..."
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

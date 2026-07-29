import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Connecting...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBackend = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api");

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Unable to connect to backend");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackend();
  }, []);

  return (
    <main className="app">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <section className="card">
        <div className="badge">
          <span
            className={`status-dot ${
              loading ? "loading" : error ? "error" : "online"
            }`}
          ></span>

          {loading
            ? "Connecting"
            : error
            ? "Connection Failed"
            : "System Online"}
        </div>

        <div className="icon">⚡</div>

        <p className="eyebrow">FULL STACK APPLICATION</p>

        <h1>
          React Frontend
          <span>Running Successfully</span>
        </h1>

        <p className="description">
          Your React application is running and communicating with the
          backend API.
        </p>

        <div className={`backend-box ${error ? "backend-error" : ""}`}>
          <div>
            <p className="label">BACKEND RESPONSE</p>

            <h2 className={loading ? "message loading-text" : "message"}>
              {message}
            </h2>
          </div>

          <div className="api-badge">/api</div>
        </div>

        <button
          className="refresh-button"
          onClick={fetchBackend}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Connecting...
            </>
          ) : (
            <>↻ Refresh Backend</>
          )}
        </button>

        <div className="footer">
          <span>React</span>
          <span className="divider">•</span>
          <span>REST API</span>
          <span className="divider">•</span>
          <span>Full Stack</span>
        </div>
      </section>
    </main>
  );
}

export default App;
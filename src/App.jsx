import sqlServer from "./assets/sql-server.png";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Spinner from "./components/Spinner";
import "./index.css"; 
import AdsOverlay from "./components/AdsOverlay";
import Ads from "./components/Ads";
import LandingPage from "./components/LandingPage";
import { Analytics } from "@vercel/analytics/react"
// sql-ai-query-generator

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setcode] = useState(null);
  const [Explanation, setExplanation] = useState(null);
  const [icon, seticon] = useState(false);
  const [show, setshow] = useState(false);
  const [adsWatched, setAdsWatched] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [adTimer, setAdTimer] = useState(5); // seconds to simulate ad watching

  useEffect(() => {
    // Load Google AdSense script once
    if (!window.adsbygoogle && !document.getElementById("adsbygoogle-js")) {
      const script = document.createElement("script");
      script.id = "adsbygoogle-js";
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (!adsWatched && !showLanding && adTimer > 0) {
      timer = setTimeout(() => setAdTimer(adTimer - 1), 1000);
    } else if (adTimer === 0 && !adsWatched) {
      setAdsWatched(true);
    }
    return () => clearTimeout(timer);
  }, [adTimer, adsWatched, showLanding]);

  function extractQueryAndExplanation(apiString) {
    const codeMatch = apiString.match(/```([\s\S]*?)```/);
    if (codeMatch && codeMatch[1]) {
      setcode(codeMatch[1].trim());
    } else {
      setcode(apiString.trim());
    }

    const explanationMatch = apiString.match(/Explanation:([\s\S]*)/);
    if (explanationMatch && explanationMatch[1]) {
      setExplanation(explanationMatch[1].trim());
    } else {
      setExplanation(null);
    }
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!adsWatched) {
      toast.error("Please watch the ads before generating a query.");
      return;
    }
    setshow(true);
    setLoading(true);
    setExplanation(null);
    setcode(null);
    const obj = { input: userInput };
    try {
      const response = await fetch(
        import.meta.env.VITE_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY ,
          },
          body: JSON.stringify(obj),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      extractQueryAndExplanation(data.sqlQuery);
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to generate query. Please try again.");
    } finally {
      setLoading(false);
      setUserInput("");
      setAdsWatched(false);
      setAdTimer(5);
    }
  };

  function copyChanger() {
    navigator.clipboard.writeText(code);
    seticon(true);
    setTimeout(() => {
      seticon(false);
    }, 5000);

    toast.success("The code has been saved to your clipboard successfully");
  }

  function handleStart() {
    setShowLanding(false);
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-teal-100 font-sans">
      <Analytics />
      {showLanding ? (
        <LandingPage onStart={handleStart} />
      ) : (
        <>
          <ToastContainer autoClose={4000} position="bottom-right" />
          <Ads position="top" />
          <Ads position="left" />
          <Ads position="right" />
          <Ads position="bottom" />
          {!adsWatched && <AdsOverlay adTimer={adTimer} />}
          <main className="max-w-3xl mx-auto p-8 pt-24 pb-24 relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-white rounded-full shadow-lg p-4 mb-4 animate-bounce">
                <img src={sqlServer} className="w-16 h-16" alt="SQL server" />
              </div>
              <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 mb-2 drop-shadow-lg">
                SQL Query Generator
              </h3>
              <p className="text-lg text-gray-600 text-center max-w-xl">
                Instantly generate SQL queries from natural language. Describe your query and get code with explanations!
              </p>
            </div>
            <form
              onSubmit={onSubmitForm}
              className="flex flex-col items-center gap-4 bg-white/80 rounded-xl shadow-xl p-6 backdrop-blur-md"
            >
              <input
                type="text"
                name="query-description"
                placeholder="Describe your query (e.g., Get all users who signed up last month)"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                aria-label="Describe your query"
                disabled={!adsWatched}
                required
                className="w-full p-4 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg transition"
              />
              <button
                type="submit"
                disabled={!adsWatched}
                className={`w-full p-4 rounded-lg font-bold text-lg shadow transition-all duration-200 ${
                  adsWatched
                    ? "bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-indigo-600 hover:to-teal-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {adsWatched ? "✨ Generate Query" : `Watch ads (${adTimer})`}
              </button>
            </form>
            {show && (
              <div className="mt-10">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <Spinner Loading={loading} />
                  </div>
                ) : (
                  <div className="bg-white/90 p-8 rounded-2xl shadow-2xl border border-indigo-100 animate-fade-in">
                    <h4 className="text-2xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
                      <span className="inline-block animate-pulse">📝</span>
                      Generated SQL Query
                    </h4>
                    <div className="relative group">
                      <pre
                        id="pre"
                        className="overflow-x-auto bg-gradient-to-br from-gray-100 via-white to-indigo-50 p-6 rounded-xl border border-indigo-100 text-base font-mono transition"
                        style={{ minHeight: "80px" }}
                      >
                        <code>{code}</code>
                      </pre>
                      <button
                        onClick={copyChanger}
                        className="absolute top-3 right-3 bg-indigo-500 hover:bg-teal-400 text-white rounded-full p-2 shadow-lg transition group-hover:scale-110"
                        aria-label="Copy SQL query to clipboard"
                        tabIndex={0}
                      >
                        {icon ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-6 h-6"
                          >
                            <path
                              fill="#63E6BE"
                              d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-6 h-6"
                          >
                            <path
                              fill="#fff"
                              d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    {Explanation && (
                      <div className="mt-8">
                        <h4 className="text-xl font-semibold text-teal-600 mb-2 flex items-center gap-2">
                          <span className="inline-block animate-bounce">💡</span>
                          Explanation
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{Explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}

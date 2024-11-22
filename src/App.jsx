import styles from "./styles.module.css";
import sqlServer from "./assets/sql-server.png";
import { useState} from "react";
import "./App.css";
import { toast } from "react-toastify";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import Spinner from "./components/Spinner";


export default function App() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [code,setcode]=useState(null);
  const [Explanation,setExplanation]=useState(null);
  const [icon, seticon] = useState(false);
  const [show, setshow] = useState(false);
   
  function CleanTheSrting(userInput){
    const regex = /```([\s\S]*?)```/g;
    let match;
    // Array to hold the cleaned strings
    const cleanedStrings = [];

    while ((match = regex.exec(userInput)) !== null) {
        // Remove newlines and trim whitespace from the matched string
        const cleanedString = match[1].replace(/\n/g, ' ').trim();
        cleanedStrings.push(cleanedString);
    }

    // Regular expression to match anything after \n```\n\n
    const regexAfterPattern = /\n```\n\nExplanation:([\s\S]*)/;
    const match2 = userInput.match(regexAfterPattern);
    
    // If a match is found, return the cleaned string after the pattern
    if (match2 && match2[1]) {
      const cleanedStringAfterPattern = match2[1].trim()
      setExplanation(cleanedStringAfterPattern)  ; // Trim whitespace
    }
    // If no match is found, return the cleaned string
    
    setcode(cleanedStrings) ;
  }
  
  const onSubmitForm = async(e)=>{
    e.preventDefault();
    setshow(true);
    setLoading(true);
    console.log(userInput)
    const obj={"input":userInput}
    console.log(obj)
      try{
          const response = await fetch(" https://back-end-sql-generator-r0of04kxc-saad-mbts-projects.vercel.app/Generate_sql_query", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)
          CleanTheSrting(data.sqlQuery)
          return ;
      }catch(err){
        console.log(err.message)
      }finally {
        setLoading(false);
        setUserInput(""); // Clear input after submission
      }
      

   
  };

  function copyChanger(){
    navigator.clipboard.writeText(code)
    seticon(true)
    setTimeout(() => {
      seticon(false)
      }, 5000);
    
    toast.success("The code have been save to your clipboard Successfully")
    console.log(code)
  }
  return (
    <main className={styles.main}>
      <ToastContainer autoClose={4000} position="bottom-right"/>
      <img src={sqlServer} className={styles.icon} alt="SQL server" />
      <h3>Generate SQL</h3>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="query-description"
          placeholder="Describe your query"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <input type="submit" value="Generate query" />
      </form>
      {
        show?<div>
                 {loading?<Spinner Loading={loading} />:
        <div className={styles.query}>
          <h4>The SQL query for this would be : </h4>
          <pre id="pre">
            <code>{code}</code>
            {
              icon?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{width:"20px", marginLeft:10}}>
                <path fill="#63E6BE" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/>
              </svg>
              :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{width:"20px", marginLeft:10}} onClick={()=>copyChanger()}>
            <path fill="#63E6BE" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/>
            </svg>
            }
            
            
          </pre>
           {Explanation!=null?<div>
                <h4>Explanation :</h4>
                <p>{Explanation}</p>
              </div>
            :""}
          
        </div>
      }</div>:""
      }
      
      
    </main>
  );
}
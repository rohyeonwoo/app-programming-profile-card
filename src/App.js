import './App.css';
import { useState, useEffect, useCallback } from "react";
import { Parser } from 'expr-eval';
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import History from "./components/History";

const parser = new Parser();

function App() {
    const [ input, setInput ] = useState("");
    const [ history, setHistory ] = useState([]);
    const handleClick = useCallback((value) => {
        if (value === "C") {
            setInput("");
            return;
        }
        if (value === "AC") {
            setInput("");
            setHistory([]);
            return;
        }
        if (value === "=") {
            try {
                const result = parser.evaluate(input);
                setInput(result.toString());
                const newRecord = `${input} = ${result}`;
                setHistory(prev => [newRecord, ...prev].slice(0, 5));
            } catch {
                setInput("Error");
            }
            return;
        };
        setInput(prev => prev + value);
        }, [input]);
    useEffect(() => {
        const onKeyDown = (e) => {
            const tag = e.target.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.isComposing) return;

            const k = e.key;

            if (/^[0-9]$/.test(k)) { e.preventDefault(); handleClick(k); return; }
            if (["+", "-", "*", "/", ".", "(", ")", "%"].includes(k)) { e.preventDefault(); handleClick(k); return; }
            if (k === "Enter") { e.preventDefault(); handleClick("="); return; }
            if (k === "Escape") { e.preventDefault(); handleClick("C"); return; }                if (k === "Backspace") { e.preventDefault(); setInput((prev) => prev.slice(0, -1)); return; }
            if (k === "Delete") { e.preventDefault(); setInput(""); return; }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [handleClick]);

    return (
        <div className="container">
            <h1>React 계산기</h1>
            <Display value={input} />
            <Keypad onKey={handleClick} />
            <History records={history} />
        </div>
    );
}

export default App;
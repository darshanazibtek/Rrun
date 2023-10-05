import React, { useState, useEffect, useRef } from "react";
import { WebR } from "@r-wasm/webr";
import { Editor } from "@monaco-editor/react";

const WebrGraph = () => {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState([]);
    const [stringOutput, setStringOutput] = useState([]);
    const [error, setError] = useState("");

    const canvasRef = useRef(null);
    const handleCodeChange = value => {
        setCode(value);
    };

    const handleRunClick = async () => {
        setStringOutput([]);
        setOutput([]);
        setError("");
        const webR = new WebR();
        await webR.init();

        try {
            let shelter = await new webR.Shelter(code);
            let result = await shelter.captureR(code);

            //If shelter fails to give output pass it to EvalR with code Spiltting
            if (result.output.length === 0) {
                const codeLines = code.split("\n");
                const newOutput = [];
                for (const line of codeLines) {
                    const trimmedLine = line.trim();

                    if (trimmedLine !== "" && !trimmedLine.startsWith("#")) {
                        try {
                            const evalResult = await webR.evalR(trimmedLine);

                            if (evalResult._payload !== undefined) {
                                const resultValue = await evalResult.toJs();
                                //find the type of value of resultValue
                                console.log(resultValue.type == "list");

                                if (resultValue.type === "list") {
                                    shelter.showPlot(canvasRef.current);
                                    return;
                                }

                                newOutput.push(resultValue.values);
                            }
                        } catch (evalError) {
                            console.error(
                                "Error occurred during evaluation:",
                                evalError
                            );
                            setError(`Evaluation Error: ${evalError.message}`);
                        }
                    }
                }

                setStringOutput(newOutput);
                console.log("newot", newOutput);
            }

            setOutput(result.output);

            shelter.purge();
        } catch (error) {
            console.error("Error:", error);
            setError(`Error occurred: ${error.message}`);
        } finally {
            webR.destroy().catch(error => console.error(error));
        }
    };

    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         // WebR.destroyAll().catch(error => console.error(error));
    //     };

    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);

    useEffect(() => {
        console.log("upop", output);
    }, [output]);

    return (
        <div>
            <h1>Epi Monitor</h1>
            <div className="code-editor">
                <code>
                    <Editor
                        value={code}
                        onChange={handleCodeChange}
                        height="400px"
                        language="r"
                        theme="vs-dark"
                    />
                </code>
            </div>
            <button className="run-btn" onClick={handleRunClick}>
                Run
            </button>
            {error && <div className="error">{error}</div>}
            <div className="output">
                {output &&
                    output[0] &&
                    output.map(data => {
                        try {
                            return <p>{data.data}</p>;
                        } catch (error) {
                            console.error("Error in mapping output:", error);
                            return <p>Error in mapping output</p>;
                        }
                    })}
            </div>
            <div className="string-output">
                {stringOutput &&
                    stringOutput.map((result, index) => {
                        try {
                            return (
                                <div key={index}>
                                    <p>
                                        [ {index + 1}] {result}
                                    </p>
                                </div>
                            );
                        } catch (error) {
                            console.error(
                                "Error in mapping stringOutput:",
                                error
                            );
                            return <p>Error in mapping stringOutput</p>;
                        }
                    })}
            </div>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default WebrGraph;

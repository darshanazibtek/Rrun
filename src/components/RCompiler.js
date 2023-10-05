import React, { useState, useEffect, useRef } from "react";
import { WebR } from "@r-wasm/webr";
import { Editor } from "@monaco-editor/react";
import "./RComplier.css";
import codeData from "../DummyData/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const RCompiler = () => {
    const [code, setCode] = useState(codeData.code);
    const [output, setOutput] = useState([]);
    const [stringOutput, setStringOutput] = useState([]);
    const [error, setError] = useState("");
    const [isGraph, setGraph] = useState(false);
    const [graphData, setGraphData] = useState();
    const [loading, setLoading] = useState(false);
    const [hint, setHint] = useState(false);

    const canvasRef = useRef(null);
    const handleCodeChange = value => {
        setCode(value);
    };

    const handleRunClick = async () => {
        setStringOutput([]);
        setOutput([]);
        setError("");
        setGraph(false);
        setGraphData();
        setLoading(true);

        const webR = new WebR({
            WEBR_URL: "http://localhost:3000/check",
            SW_URL: "/webr-serviceworker.js",
        });
        await webR.init();

        try {
            const width = 300;
            const height = 250;
            const id = "base-canvas";
            let shelter = await new webR.Shelter();
            await webR.evalRVoid(`canvas(width=${width}, height=${height})`);
            let result = await shelter.captureR(code);
            await webR.evalRVoid("dev.off()");
            const msgs = await webR.flush();
            const canvas = document.getElementById(id);
            canvas.setAttribute("width", 2.5 * width);
            canvas.setAttribute("height", 2.5 * height);
            msgs.forEach(msg => {
                if (msg.type === "canvasExec")
                    Function(`this.getContext("2d").${msg.data}`).bind(
                        canvas
                    )();
                return;
            });

            console.log("captureResult", result);
            //If shelter fails to give output pass it to EvalR with code Spiltting

            console.log(result.output.length === 0);

            if (result.output.length === 0) {
                const codeLines = code.split("\n");
                const newOutput = [];
                for (const line of codeLines) {
                    const trimmedLine = line.trim();

                    if (trimmedLine !== "" && !trimmedLine.startsWith("#")) {
                        try {
                            const evalResult = await webR.evalR(trimmedLine);

                            console.log("evalResult", evalResult);
                            if (evalResult._payload !== undefined) {
                                const resultValue = await evalResult.toJs();

                                console.log("resultvalue", resultValue);
                                newOutput.push(resultValue.values);
                            }
                        } catch (evalError) {
                            setLoading(false);
                            console.error(
                                "Error occurred during evaluation:",
                                evalError
                            );

                            setError(`Evaluation Error: ${evalError.message}`);
                        }
                    }
                }
                if (newOutput[0].length > 1) {
                    console.log("its a graph");
                    setGraph(true);
                    const chartData = LineChartData(newOutput);
                    setGraphData(chartData);
                } else {
                    console.log("its a text");
                }
                setLoading(false);
                setStringOutput(newOutput);
                console.log("newot", newOutput);
            }
            setLoading(false);
            setOutput(result.output);

            shelter.purge();
        } catch (error) {
            setLoading(false);

            console.error("Error:", error);
            setError(`Error occurred: ${error.message}`);
        } finally {
            webR.destroy().catch(error => console.error(error));
        }
    };

    return (
        <div className="combine-ui">
            <h1 className="head">Epi Monitor</h1>
            <div className="course-ui">
                <div className="course-intro">
                    <h1 className="lesson-title">{codeData.programName}</h1>
                    <p>
                        <b>Description:</b>
                        {codeData.description}
                    </p>
                    <p>
                        <b>Instructions:</b>
                        {codeData.instructions}
                    </p>
                    <div
                        className="hint"
                        onClick={() => {
                            setHint(!hint);
                        }}
                    >
                        Take hint XP:-10
                    </div>
                    {hint && <div className="hint-sec">Your hint is here</div>}
                </div>
                <div className="coding-ui">
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
                    <div className="code-util">
                        <button className="run-btn" onClick={handleRunClick}>
                            Run Code
                        </button>
                    </div>
                    <div className="output-ui">
                        {loading && (
                            <div class="fa-3x">
                                {/* <p>Loading..output please wait</p> */}
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <div>
                                    <p>loading...!</p>
                                </div>
                            </div>
                        )}
                        {error && <div className="error">{error}</div>}

                        <div className="output">
                            {output &&
                                output[0] &&
                                output.map(data => {
                                    try {
                                        return (
                                            <p className="output-data">
                                                {data.data}
                                            </p>
                                        );
                                    } catch (error) {
                                        console.error(
                                            "Error in mapping output:",
                                            error
                                        );
                                        return <p>Error in mapping output</p>;
                                    }
                                })}
                        </div>
                        <div className="string-output">
                            {stringOutput &&
                                !graphData &&
                                stringOutput.map((result, index) => {
                                    try {
                                        return (
                                            <div key={index}>
                                                <p>
                                                    [ {1}] {result}
                                                </p>
                                            </div>
                                        );
                                    } catch (error) {
                                        console.error(
                                            "Error in mapping stringOutput:",
                                            error
                                        );
                                        return (
                                            <p>Error in mapping stringOutput</p>
                                        );
                                    }
                                })}
                        </div>
                        <div className="canvas-output">
                            {canvasRef && (
                                <canvas id="base-canvas" ref={canvasRef} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RCompiler;

const LineChartData = output => {
    const data = {
        labels: output[0],
        datasets: [
            {
                label: "Example Dataset",
                data: output[1],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return data;
};

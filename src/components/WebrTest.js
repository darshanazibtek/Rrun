import React, { useState, useEffect, useRef, useMemo } from "react";
import { WebR } from "@r-wasm/webr";
import { Editor } from "@monaco-editor/react";
import "./RComplier.css";
import codeData from "../DummyData/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBackward,
    faForward,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";

const WebrTest = () => {
    const [code, setCode] = useState(codeData.code);
    const [output, setOutput] = useState([]);
    const [stringOutput, setStringOutput] = useState([]);
    const [error, setError] = useState("");
    const [isGraph, setGraph] = useState(false);
    const [graphData, setGraphData] = useState();
    const [loading, setLoading] = useState(false);
    const [hint, setHint] = useState(false);
    const [Answer, setUserAnswer] = useState(false);

    const navigate = useNavigate();

    const canvasRef = useRef(null);

    const handleCodeChange = value => {
        setCode(value);
    };

    const handleAnswer = async () => {
        setUserAnswer(true);
    };

    const handleRunClick = async () => {
        const canvas = document.getElementById("base-canvas");
        const context = canvas.getContext("2d");

        // Clear the entire canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        setStringOutput([]);
        setOutput([]);
        setError("");
        setGraph(false);
        setGraphData();
        setLoading(true);
        setUserAnswer(false);

        const webR = new WebR({
            WEBR_URL: "http://localhost:3000/check",
            SW_URL: "/webr-serviceworker.js",
        });
        await webR.init();

        if (code.includes("library(dplyr)")) {
            try {
                await webR.installPackages(["dplyr"]).then(async () => {
                    // let shelter = await new webR.Shelter();
                    // let result = await shelter.captureR(code);

                    let result = await webR.evalR(code);
                    let newResult = await result.toJs();
                    setOutput(newResult);

                    return;
                });
            } catch (error) {
                setError(`Error occurred: ${error.message}`);
            }
        }

        if (code.includes("library(ggplot2)")) {
            try {
                await webR.installPackages(["ggplot2"]).then(async () => {
                    const width = 250;
                    const height = 200;
                    const id = "base-canvas";
                    let shelter = await new webR.Shelter();
                    await webR.evalRVoid(
                        `canvas(width=${width}, height=${height})`
                    );
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
                        setLoading(false);
                        return;
                    });
                });
                return;
            } catch (error) {
                setError(`Error occurred: ${error.message}`);
            }
        }

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
                    setGraph(true);
                    const chartData = LineChartData(newOutput);
                    setGraphData(chartData);
                } else {
                    console.log("its a text");
                }
                setLoading(false);
                setStringOutput(newOutput);
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
            <div className="handler">
                <button className="handler-btn">
                    <FontAwesomeIcon icon={faBackward} size="xl" />
                    Back
                </button>

                <h4>LearnR course</h4>
                <button
                    className="handler-btn"
                    onClick={() => {
                        navigate("/quiz");
                    }}
                >
                    Next <FontAwesomeIcon icon={faForward} size="xl" />
                </button>
            </div>
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
                        Take Hint XP:-10
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
                        <div className="code-util">
                            <button
                                className="run-btn"
                                onClick={handleRunClick}
                            >
                                Run Code
                            </button>
                            <button className="sub-btn" onClick={handleAnswer}>
                                Submit Answer
                            </button>
                        </div>
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
                            <div>
                                {Answer && <h3> Your Answer is correct</h3>}
                            </div>
                            {output &&
                                output[0] &&
                                output.map((data, i) => {
                                    try {
                                        return (
                                            <p className="output-data" key={i}>
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

export default WebrTest;

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

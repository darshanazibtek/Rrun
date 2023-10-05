import React, { useState } from "react";
import axios from "axios";

const JDoodle = () => {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");

    const executeCode = async () => {
        try {
            const response = await axios.post(
                "https://api.jdoodle.com/v1/execute",
                {
                    clientId: "361b7cbfec8dca18610276fcba8d414e",
                    clientSecret:
                        "c85cc17062cb46af42d4c5ca3d810ba16b8765e460988965c56f0697dac0aa18",
                    script: code,
                    language: "r",
                    versionIndex: 3,
                }
            );

            setOutput(response.data.output);
            console.log("res", response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                rows={10}
                cols={80}
            ></textarea>
            <br />
            <button onClick={executeCode}>Execute</button>
            <br />
            <pre>{output}</pre>
        </div>
    );
};

export default JDoodle;

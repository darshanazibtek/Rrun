import React, { useState } from "react";
import MonacoEditorComponent from "./MonacoEditorComponent";

const Meditor = () => {
    const [code, setCode] = useState("");

    const handleCodeChange = newCode => {
        setCode(newCode);
    };

    return (
        <div>
            <h1>React Monaco Editor Example</h1>
            <MonacoEditorComponent
                code={code}
                language="javascript"
                onChange={handleCodeChange}
            />
        </div>
    );
};

export default Meditor;

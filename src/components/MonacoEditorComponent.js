import React from "react";
import MonacoEditor from "react-monaco-editor";

const MonacoEditorComponent = ({ code, language, onChange }) => {
    const editorOptions = {
        selectOnLineNumbers: true,
    };

    const handleCodeChange = newCode => {
        onChange(newCode);
    };

    return (
        <div className="code-div">
            <div></div>
            <div></div>
            <MonacoEditor
                width="300"
                height="600"
                language="r"
                theme="vs-dark"
                value={code}
                options={editorOptions}
                onChange={handleCodeChange}
            />
        </div>
    );
};

export default MonacoEditorComponent;

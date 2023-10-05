import { Editor } from "@monaco-editor/react";
import "./CodingEnv.css";

const CodingEnv = () => {
    return (
        <div className="coding-env">
            <p className="question-no">Question.1</p>
            <div>
                <div className="code-playground">
                    <code>
                        <Editor
                            // value={code}
                            // onChange={handleCodeChange}
                            height="250px"
                            language="r"
                            theme="vs-dark"
                        />
                    </code>
                </div>
                <div className="hint-sc"></div>
                <div className="exc-btn">
                    <button>Execute</button>
                </div>
                <p>Result</p>
                <div className="result-sc"></div>
            </div>
        </div>
    );
};
export default CodingEnv;

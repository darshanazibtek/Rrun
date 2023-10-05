import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/theme-github";

const AceEdit = () => {
    const [code, setCode] = useState("");

    const handleChange = newCode => {
        setCode(newCode);
    };

    return (
        <AceEditor
            mode="r"
            theme="github"
            value={code}
            onChange={handleChange}
            name="r-editor"
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "400px" }}
        />
    );
};

export default AceEdit;

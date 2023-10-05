// import React, { useState } from "react";
// import { WebR } from "@r-wasm/webr";

// const Jupyter = () => {
//     const webR = new WebR();
//     webR.init();
//     const [output, setOutput] = useState("");

//     const runRCode = async () => {
//         const code = `
//       # Your R code goes here
//       x <- 1:10
//       y <- x * 2
//       y
//     `;

//         try {
//             const result = await webR()(code);
//             setOutput(result.toString());
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={runRCode}>Run R Code</button>
//             <pre>{output}</pre>
//         </div>
//     );
// };

// export default Jupyter;

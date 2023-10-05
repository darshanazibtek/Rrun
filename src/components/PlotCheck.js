import React, { useState, useEffect } from "react";
import { WebR } from "@r-wasm/webr";
import Plot from "react-plotly.js";

const PlotCheck = () => {
    const [data, setData] = useState([]);
    const [plotLayout, setPlotLayout] = useState({});
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const webR = new WebR();
            await webR.init();

            const rCode = `
            # Create some sample data
            x <- c(1, 2, 3, 4, 5)  # x-axis values
            y <- c(2, 4, 6, 8, 10) # y-axis values
            
            # Plot the data
            plot(x, y, type = "l", col = "blue", lwd = 2, xlab = "X", ylab = "Y", main = "Line Plot")
            
            # Add a grid
            grid()
            
            # Add a legend
            legend("topleft", legend = "Data", col = "blue", lwd = 2)
      `;

            const result = await webR.evalR(rCode);
            const processedData = await result.toArray();
            setData(processedData);

            const plot = await webR.createPlot(rCode);
            const plotData = await plot.getData();
            const plotLayout = await plot.getLayout();
            setPlotData(plotData);
            setPlotLayout(plotLayout);

            webR.destroy(result);
            webR.destroy(plot);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Webr</h1>
            <Plot data={plotData} layout={plotLayout} />
        </div>
    );
};

export default PlotCheck;

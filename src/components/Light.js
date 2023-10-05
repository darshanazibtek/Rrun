const Light = () => {
    return (
        <div>
            <div
                data-datacamp-exercise
                data-lang="r"
                data-height="500"
                id="r-exercise"
            >
                <code data-type="pre-exercise-code"># no pec</code>
                <code data-type="sample-code">
                    # Calculate 3 + 4 3 + 4 # Calculate 6 + 12
                </code>
                <code data-type="solution">
                    # Calculate 3 + 4 3 + 4 # Calculate 6 + 12 6 + 12
                </code>
                <code data-type="sct">
                    test_output_contains(&quot;18&quot;, incorrect_msg =
                    &quot;Make sure to add `6 + 12` on a new line. Do not start
                    the line with a `#`, otherwise your R code is not
                    executed!&quot;) success_msg(&quot;Awesome! See how the
                    console shows the result of the R code you submitted? Now
                    that you&#39;re familiar with the interface, let&#39;s get
                    down to R business!&quot;)
                </code>
            </div>
        </div>
    );
};
export default Light;

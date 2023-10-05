import { useState } from "react";
import QuizData from "../../../DummyData/quizData.json";

const MultipleChoiceEnv = () => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleSelection = options => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[QuizData[0].question] = options;
        setSelectedAnswers(updatedSelectedAnswers);

        console.log("upslANS", updatedSelectedAnswers);
    };

    return (
        <div className="coding-env">
            <div>
                <h4>{QuizData[0].question}</h4>
                {QuizData[0].options.map(options => {
                    return (
                        <ul>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        value={options}
                                        name={`question1`}
                                        onChange={handleSelection}
                                    />
                                    {options}
                                </label>
                            </li>
                        </ul>
                    );
                })}
            </div>
        </div>
    );
};
export default MultipleChoiceEnv;

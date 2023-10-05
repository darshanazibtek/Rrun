import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [answerReply, setAnswerReply] = useState("");
    const [hint, setHint] = useState(false);

    const navigate = useNavigate();

    // Define your quiz data
    const quizData = [
        {
            question:
                "Which function is used to read data from a CSV file in R?",
            options: [
                "read.csv()",
                "write.csv()",
                "read.table()",
                "write.table()",
            ],
            correctAnswer: "read.csv()",
        },
        {
            question: "What does the function str() do in R?",
            options: [
                "Converts a string to uppercase",
                "Calculates the square root of a number",
                "Displays the structure of an object",
                "Computes the sum of a vector",
            ],
            correctAnswer: "Displays the structure of an object",
        },
        // Add more questions here
    ];

    const handleAnswerSelect = option => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestion] = option;
        setSelectedAnswers(updatedSelectedAnswers);
    };

    const handleNextQuestion = () => {
        // Check if the selected answer is correct
        if (
            selectedAnswers[currentQuestion] ===
            quizData[currentQuestion].correctAnswer
        ) {
            setScore(score + 1);
            setResult(true);
            setAnswerReply("Your Answer is correct");
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setResult(true);
            setAnswerReply("Your Answer is wrong");

            // Move to the next question
        }
        setSelectedAnswers([]);
    };

    const renderQuizResult = () => {
        return (
            <div>
                <h2>Quiz Completed</h2>
                <p>
                    Your Score: {score}/{quizData.length}
                </p>
            </div>
        );
    };
    const renderQuizQuestion = () => {
        const currentQuiz = quizData[currentQuestion];
        const selectedOption = selectedAnswers[currentQuestion];

        return (
            <div>
                <h1 className="head">Epi Monitor</h1>
                <div className="handler">
                    <button
                        className="handler-btn"
                        onClick={() => {
                            navigate("/check");
                        }}
                    >
                        <FontAwesomeIcon icon={faBackward} size="xl" />
                        Back
                    </button>

                    <h4>LearnR course</h4>
                    <div>
                        <h3>your score is :{score} </h3>
                    </div>
                    <button
                        className="handler-btn"
                        onClick={() => {
                            setCurrentQuestion(currentQuestion + 1);
                        }}
                        // Disable next button until an answer is selected
                    >
                        Next <FontAwesomeIcon icon={faForward} size="xl" />
                    </button>
                </div>

                <div className="quiz">
                    <h2>Question {currentQuestion + 1}</h2>
                    <p>{currentQuiz.question}</p>
                    <ul>
                        {currentQuiz.options.map((option, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion}`}
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={() =>
                                            handleAnswerSelect(option)
                                        }
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleNextQuestion}
                        disabled={!selectedOption}
                    >
                        Submit
                    </button>
                    <div>
                        {result && (
                            <div style={{ color: "blue" }}>{answerReply}</div>
                        )}
                    </div>
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
            </div>
        );
    };

    return (
        <div>
            {currentQuestion < quizData.length
                ? renderQuizQuestion()
                : renderQuizResult()}
        </div>
    );
};

export default Quiz;

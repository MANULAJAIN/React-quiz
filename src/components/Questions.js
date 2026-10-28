import data from './data';
import { useEffect, useState } from 'react';
export default function Questions() {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(2 * 60);

    useEffect(() => {
        if (timeLeft <= 0) {
            submitQuiz();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1)
        }, 1000)
        return () => clearInterval(timer);
    }, [timeLeft])

    function formatTimer(seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60

        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    }

    const [questions, setQuestions] = useState(data[currentIndex].question);

    function nextQuestion() {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }


    function setQues(index) {
        setCurrentIndex(index)
    }

    function previousQuestion() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }
    console.log(data[currentIndex].question);
    console.log(data[currentIndex].options);

    function selectOption(option) {
        setAnswers({
            ...answers,
            [currentIndex]: option
        });
        score();
    }

    const score = () => {
        let total = 0;
        data.forEach((question, index) => {
            if (answers[index] === question.answer) {
                total++;
            }
        }
        );
        console.log("score", total);

    }

    function submitQuiz() {
        let total = 0;
        data.forEach((question, index) => {
            if (answers[index] === question.answer) {
                total++;
            }
        });
        alert(`You scored ${total} out of ${data.length}`);
    }


    return (<>


        <div class="card text-center" style={{ maxWidth: '500px' }}>
            <div class="card-header">
                React Quiz

                <span className="quiz-timer">Time Left: {formatTimer(timeLeft)}</span>
            </div>
            <div class="card-body">
                <h5 class="card-title mb-4">
                    Questions {currentIndex + 1} of {data.length}<br />

                    {data[currentIndex].question}</h5>

                <div className="options-container">

                    {data[currentIndex].options.map((option, index) => (
                        <label key={index} className="option-label" >
                            <input type="radio" name={`option-${currentIndex}`} value={option} checked={answers[currentIndex] === option} onChange={() => selectOption(option)} />
                            {option}
                        </label>

                    ))}

                </div>


            </div>

            <div class="card-footer text-body-secondary">
                <button className="btn btn-secondary" onClick={previousQuestion} disabled={currentIndex === 0}>
                    Previous
                </button>

                {currentIndex === data.length - 1 ? (
                    <button className="btn btn-primary" onClick={submitQuiz}>
                        Submit Quiz
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={nextQuestion}>
                        Next
                    </button>
                )}

            </div>


            <div className="question-numbers">
                {data.map((question, index) => (
                    <button key={index} className={`question-number ${answers[index] ? 'answered' : ''} ${currentIndex === index ? 'active' : ''}`} onClick={() => setQues(index)}>
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    </>)
}   
import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [questions]);

  function handleClick(q) {
    console.log(q.id);
    fetch(`http://localhost:4000/questions/${q.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json)
      .then(() => {
        console.log("deleted")
        const updatedQues = questions.filter((question) => question.id !== q.id);
        setQuestions(updatedQues);
      });
    
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions &&
          questions.map((q) => {
            return (
              <QuestionItem key={q.id} question={q} handleClick={handleClick} />
            );
          })}
      </ul>
    </section>
  );
}

export default QuestionList;

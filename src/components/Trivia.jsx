import { useEffect } from "react";
import { useState } from "react";
import useSound from "use-sound";
import correct from "../Sounds/correct.mp3";
import play from "../Sounds/play.mp3";
import wrong from "../Sounds/wrong.mp3";

export default function Trivia({
  data,
  setstop,
  questionnumber,
  setquestionnumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectanswer, setselectedanswer] = useState(null);
  const [classname, setclassname] = useState("answer");
  const [letsplay] = useSound(play);
  const [correctanswer] = useSound(correct);
  const [wronganswer] = useSound(wrong);

  useEffect(()=>{
    letsplay();
  },[letsplay]);

  useEffect(() => {
    setQuestion(data[questionnumber - 1]);
  }, [data, questionnumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
        callback();
    }, duration);
  }
  const handleclick = (a) => {
    setselectedanswer(a);
    setclassname("answer active");
    delay(3000, ()=>{
      setclassname(a.correct ? "answer correct" : "answer wrong");
    });

    delay(5000, ()=>{
      if(a.correct){
        correctanswer();
        delay(1000, ()=>{
          setquestionnumber(prev => prev + 1)
          setselectedanswer(null);
        });
      } else {
        wronganswer();
        delay(1000,()=>{
          setstop(true);
        })
      }
    });

  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectanswer === a ? classname : "answer"}
            onClick={() => handleclick(a)}>
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

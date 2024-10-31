"use client";
import Card from "@/components/Card";
import { AllQuestions } from "@/questionData/questions";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const questions = AllQuestions(); //this is fetching all questions....
  const [answers, setAnswers] = useState({}); //this is created to store the answers
  const [submitError, setSubmitError] = useState('')

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    courseName: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  //this function stores the answers in the state
  const handleInputChange = (id, question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
    console.log(answers);
  };

  //this is to handle the overall submit
  const submitAll = async () => {
    const userAnswer = answers;
    const userData = formData;

    //this validates the input especially the form to make sure user fills it
    if (
      !userData.phoneNumber ||
      !userData.email ||
      !userData.phoneNumber ||
      !userData.courseName
    ) {
      //then this prompts the user to know their error
      setSubmitError(<p className="text-red-500 text-xl font-bold mb-10">Fill in your details...</p>);

      //this clears out the error message after 3secs
      setTimeout(() => {
        setSubmitError('')
      }, 3000)
      return;
    } else {
      //if we make it pass the validation, the we connect to the database and post details
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userData, userAnswer }),
        });

        //this waits to check the result if it submitted successfully...
        const result = await response.json();
        if (result.success) {
          console.log("Data submitted successfully:", result);
          setSubmitError(
            <p className="text-2xl font-bold text-green-500 mb-10">
              Your answers has been submitted....
            </p>
          );
          //this clears out the error message after 3secs
          setTimeout(() => {
            setSubmitError("");
          }, 3000);
        } else {
          setSubmitError(
            <p className="text-2xl font-bold text-red-500">
              Failed to submit data
            </p>
          ); 
          //this clears out the error message after 3secs
          setTimeout(() => {
            setSubmitError("");
          }, 3000);
          console.log("Failed to submit data", result.error);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  return (
    <div>
      {/**Hero section */}
      <div className="relative xl:w-[1510px] overflow-x-hidden">
        <div className="relative top-[-80px] md:w-[768px] lg:w-[1024px] xl:w-[1518px]">
          <img
            src="/heroImage.jpg"
            className="hero md:w-[768px] lg:w-[1024px] xl:w-[1600px] xl:h-[500px]"
            alt="Hero"
          />
          <div className="overlay md:w-[768px] lg:w-[1024px] xl:w-[1600px] xl:h-[500px]"></div>
        </div>
        <div className="relative z-20 ml-3 my-5 text-white">
          <h1 className="uppercase  pt-10 font-bold md:text-center xl:text-7xl">
            Welcome To Your Exam
          </h1>
          <p className="text-start px-2 xl:px-32 xl:mt-20 xl:text-center xl:text-3xl">
            Please read your answers through before clicking the submit button.
            You can only submit the exam once. Any other submissions will be
            disregarded. <br />
            Please give your correct contact details as indicated in your
            registration form.
          </p>
        </div>
      </div>

      {/**Form section */}
      <div className="big-form-div mt-24 mb-56 md:mb-0 md:mt-36 xl:mt-56 xl:pl-48">
        <div className="sec-form-div bg-gray-200 w-[330px] ml-8 pl-4 rounded-lg shadow-xl py-2 md:w-[600px] md:ml-20 lg:ml-48">
          <h1 className="font-bold text-2xl md:ml-40 ml-7">
            Fill in correct details
          </h1>

          <form className="mt-3 md:ml-10">
            <div className="text-start">
              <label htmlFor="fullName" className="pl-2 font-semibold">
                Full name:
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="border-2 border-black w-[300px] rounded-lg pl-1 md:w-[380px]"
                required
              />
            </div>

            <div className="mt-3 text-start flex flex-col md:flex-row">
              <label htmlFor="email" className="pl-2 font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-black w-[300px] rounded-lg md:w-[410px]"
                required
              />
            </div>

            <div className="mt-3 text-start">
              <label htmlFor="phoneNumber" className="pl-2 font-semibold">
                Phone number:
              </label>
              <input
                type="number"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border-2 border-black w-[300px] rounded-lg md:w-[340px]"
                required
              />
            </div>

            <div className="mt-3 text-start">
              <label
                htmlFor="courseName"
                className="text-start pl-2 font-semibold"
              >
                Name of course:
              </label>
              <input
                type="text"
                id="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="border-2 border-black w-[300px] rounded-lg md:w-[330px]"
                required
              />
            </div>
          </form>
        </div>
      </div>

      {/**Question section-------> */}
      <div className="mt-3 md:mt-6 ml-2">
        {/**This is going to display the questions from the questionsData */}
        {questions.map((question) => (
          <div className="mt-3 md:mt-6" key={question.id}>
            <Card key={question.id}>
              <h1 className="font-bold text-xl pl-2">{question.question}</h1>
              {question.isTextArea ? (
                <textarea
                  className="qes-input h-16 pb-3"
                  onChange={(e) =>
                    handleInputChange(
                      question.id,
                      question.question,
                      e.target.value
                    )
                  }
                ></textarea>
              ) : (
                <input
                  type="text"
                  className="qes-input"
                  onChange={(e) =>
                    handleInputChange(
                      question.id,
                      question.question,
                      e.target.value
                    )
                  }
                />
              )}
            </Card>
          </div>
        ))}

        <button
          onClick={submitAll}
          className="button text-2xl border-2 px-6 py-1 rounded-md font-bold text-black bg-gray-200 border-white shadow-lg inset-2 xl:px-12 xl:ml-[-350px] my-7 ml-10"
        >
          Submit
        </button>

        {submitError}
      </div>
    </div>
  );
}

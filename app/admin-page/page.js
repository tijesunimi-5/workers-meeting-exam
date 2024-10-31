"use client";
import Card from "@/components/Card";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/submissions");
        const data = await response.json();

        if (data.success) {
          setSubmissions(data.data); //this updates state with fetch submission
        } else {
          console.error("Failed to fetch submission:", data.error);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading)
    return <p className="text-center mt-32 text-2xl font-bold">Loading.....</p>;

  if (submissions.length === 0) {
    return (
      <p className="text-center mt-32 text-2xl font-bold">
        No submissions available
      </p>
    );
  }

  return (
    <div className="my-20">
      <h1 className="text-2xl font-bold text-center">User Submission</h1>

      <div className="ml-2">
        <div className="flex flex-col gap-5">
          {submissions.map((submissions, index) => (
            <Card key={index}>
              <div key={index} className="ml-2">
                <h2 className="font-semibold">
                  Fullname: {submissions.userData.fullName}
                </h2>
                <p>Email: {submissions.userData.email}</p>
                <p>Phone: {submissions.userData.phoneNumber}</p>
                <p>Course: {submissions.userData.courseName}</p>
                <h3 className="text-xl font-bold text-center mt-10">
                  Answers:
                </h3>
                <ul>
                  {Object.entries(submissions.userAnswer).map(
                    ([questionId, answer]) => (
                      <li key={questionId}>
                        <p>
                          Question {questionId}:{" "}
                          <span className="font-semibold">
                            answer: {answer}
                          </span>
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

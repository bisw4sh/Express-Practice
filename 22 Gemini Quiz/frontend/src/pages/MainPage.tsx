import {
  Form,
  useLoaderData,
  useActionData,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "react-router-dom";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface MCQ {
  question: string;
  options: string[];
  correct_answer: string;
}
interface FormEntries {
  mcqs: string;
  [key: string]: FormDataEntryValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<MCQ[]> => {
  const response = await fetch("/api/quiz/" + params.fileName);
  const data: MCQ[] = await response.json();
  return data;
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData.entries()) as FormEntries;
  const mcqs: MCQ[] = JSON.parse(formEntries.mcqs);
  const answers: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(formEntries)) {
    if (key !== "mcqs") {
      answers[key] = value as string;
    }
  }

  let correct_answer_num = 0;
  const individual_correct = [];
  for (let i = 0; i < mcqs.length; i++) {
    if (mcqs[i].correct_answer === answers[`mcq${i}`]) {
      individual_correct.push(true);
      correct_answer_num++;
    } else {
      individual_correct.push(false);
    }
  }

  return { correct_answer_num, individual_correct };
};

export default function MainPage() {
  const data = useLoaderData() as MCQ[];
  console.log(data);
  data.forEach((single) => console.log(single.correct_answer));
  const action_response = useActionData() as {
    correct_answer_num: number;
    individual_correct: boolean[];
  };

  return (
    <>
      <Form method="POST">
        <input
          type="text"
          name="mcqs"
          value={JSON.stringify(data)}
          className="hidden"
          readOnly
        />
        <div className="grid min-h-screen grid-cols-3 gap-4 py-5 max-sm:grid-cols-1 sm:max-lg:grid-cols-2">
          {data.map((mcq, index) => (
            <main
              key={index + mcq.question}
              className="min-h-1/6 font-lightbold text-md flex flex-col items-center justify-between rounded-md bg-indigo-500 p-4 text-black"
            >
              <h1 className="text-2xl font-semibold">{mcq.question}</h1>
              <ul className="w-full space-y-2">
                {mcq.options.map((option, i) => (
                  <div className="flex items-center gap-2" key={i}>
                    <label htmlFor={option} className="flex items-center gap-1">
                      <span>{i + 1}</span>
                      <input
                        type="radio"
                        id={option}
                        name={`mcq${index}`}
                        value={option}
                        onClick={(e) => console.log(e.currentTarget.value)}
                      />
                      <li key={i}>{option}</li>
                    </label>
                  </div>
                ))}
              </ul>
              <p
                className={twMerge(
                  clsx(
                    "text-md mt-5 w-full self-end rounded-md bg-sky-500 px-2 py-3 font-semibold text-slate-900",
                    action_response?.individual_correct?.[index]
                      ? "bg-fuchsia-400"
                      : null,
                  ),
                )}
              >
                {action_response?.individual_correct?.[index] ? (
                  <span>Correct: {mcq.correct_answer}</span>
                ) : (
                  "Tick a correct answer to the above question"
                )}
              </p>
            </main>
          ))}
        </div>
        <div
          className="tooltip tooltip-open tooltip-info sticky right-10 top-10 w-full"
          data-tip="correct"
        >
          {action_response?.correct_answer_num}
        </div>
        <button className="btn btn-success w-full" type="submit">
          Submit
        </button>
      </Form>
    </>
  );
}

import tw from "twin.macro";
import { Dispatch, SetStateAction, useState } from "react";

interface ExpenseType {
  title: string;
  cost: string;
}

type ExpenseProps = {
  expenses: [] | ExpenseType[];
  setExpenses: Dispatch<SetStateAction<[] | ExpenseType[]>>;
};

const AddExpense = ({ expenses, setExpenses }: ExpenseProps) => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newExpense: ExpenseType = {
      title,
      cost,
    };

    setExpenses([...expenses, newExpense]);

    setTitle("");
    setCost("");
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormInput
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormInput
          placeholder="Price"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <SubmitButton value="+" type="submit" />
      </FormContainer>
    </>
  );
};

export default AddExpense;

const FormContainer = tw.form`
  flex
  background-color[#e9e9e9]
  justify-center
  gap-1
`;

const FormInput = tw.input`
  p-2
`;

const SubmitButton = tw.input`
  px-2
`;

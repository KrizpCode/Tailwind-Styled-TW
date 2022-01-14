interface ExpenseType {
  title: string;
  cost: string;
}

type ExpenseProps = {
  expenses: ExpenseType[] | [];
};

const Expenses = ({ expenses }: ExpenseProps) => {
  return (
    <>
      {expenses &&
        expenses.map((expense) => (
          <>
            <p>{expense.title}</p>
          </>
        ))}
    </>
  );
};

export default Expenses;

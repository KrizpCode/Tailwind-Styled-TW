import React, { useContext, FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext<Partial<Budgets>>({});

export const useBudgets = () => {
	return useContext(BudgetsContext);
};

type BudgetType = {
	id?: string;
	name: string;
	max: number;
};

type ExpenseType = {
	id: string;
	budgetId: BudgetType['id'];
	amount: number;
	description: string;
};

type Budgets = {
	budgets: [] | BudgetType[];
	expenses: [] | ExpenseType[];
	getBudgetExpenses: ({ budgetId }: ExpenseType) => ExpenseType[];
	addExpense: ({ budgetId, amount, description }: ExpenseType) => void;
	addBudget: ({ name, max }: BudgetType) => void;
	deleteExpense: ({ id }: ExpenseType) => void;
	deleteBudget: ({ id }: BudgetType) => void;
};

export const BudgetsProvider: FC<Budgets> = ({ children }) => {
	const [budgets, setBudgets] = useLocalStorage<BudgetType[] | []>(
		'budgets',
		[]
	);
	const [expenses, setExpenses] = useLocalStorage<ExpenseType[] | []>(
		'expenses',
		[]
	);

	const getBudgetExpenses = ({ budgetId }: ExpenseType): ExpenseType[] => {
		return expenses.filter((expense) => expense.budgetId === budgetId);
	};

	const addExpense = ({ budgetId, amount, description }: ExpenseType): void => {
		setExpenses((prevExpenses) => {
			return [...prevExpenses, { id: uuid(), budgetId, amount, description }];
		});
	};

	const addBudget = ({ name, max }: BudgetType): void => {
		setBudgets((prevBudgets) => {
			if (prevBudgets.find((budget) => budget.name === name)) {
				return prevBudgets;
			}

			return [...prevBudgets, { id: uuid(), name, max }];
		});
	};

	const deleteExpense = ({ id }: ExpenseType) => {
		setExpenses((prevExpenses) => {
			return prevExpenses.filter((expense) => expense.id !== id);
		});
	};

	const deleteBudget = ({ id }: BudgetType) => {
		setBudgets((prevBudgets) => {
			return prevBudgets.filter((budget) => budget.id !== id);
		});
	};

	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
				getBudgetExpenses,
				addExpense,
				addBudget,
				deleteExpense,
				deleteBudget,
			}}
		>
			{children}
		</BudgetsContext.Provider>
	);
};

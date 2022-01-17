import styled from 'styled-components';
import tw from 'twin.macro';

import { currencyFormatter } from '../utils';
import ProgressBar from './ProgressBar';

type BudgetCardProps = {
	name: string;
	amount: number;
	max: number;
};

const BudgetCard = ({ name, amount, max }: BudgetCardProps) => {
	return (
		<Card>
			<CardBody>
				<CardTitle>
					<TitleWrapper>{name}</TitleWrapper>
					<CurrencyWrapper>
						{currencyFormatter.format(amount)}
						<SmallerSpan>/ {currencyFormatter.format(max)}</SmallerSpan>
					</CurrencyWrapper>
				</CardTitle>
				<ProgressBar percent={(amount / max) * 100} />
				<ButtonContainer>
					<Button style={{ marginLeft: 'auto' }} coloured={true}>
						Add Expense
					</Button>
					<Button coloured={false}>View Expenses</Button>
				</ButtonContainer>
			</CardBody>
		</Card>
	);
};

export default BudgetCard;

const Card = tw.div`
  border
  border-color[#cccbcb]
  border-radius[3px]
`;

const CardBody = tw.div`
  p-4
`;

const CardTitle = tw.h2`
  flex
  justify-between
  align-items[baseline]
  mb-3
  font-medium
  font-size[x-large]
`;

const TitleWrapper = tw.div`
  margin-inline-end[1rem]
`;

const CurrencyWrapper = tw.div`
  flex
  align-items[baseline]
`;

const SmallerSpan = tw.span`
  font-size[medium]
  opacity-75
  margin-inline-start[0.3rem]
`;

const ButtonContainer = tw.div`
  flex
  gap-2
  mt-6
`;

type ButtonProps = {
	coloured: boolean;
};

const Button = styled.button(({ coloured }: ButtonProps) => [
	coloured
		? tw`
      border-color[#b840f0]
      text-[#b840f0]

      hover:background-color[#b840f0]
  `
		: tw`
      border-color[#888888]
      text-[#888888]

      hover:background-color[#888888]
  `,

	tw`
		border-radius[4px]
		border-2
		px-2
		py-1
		font-medium
    transition[all 0.3s ease-in-out]

    hover:text-white
  `,
]);

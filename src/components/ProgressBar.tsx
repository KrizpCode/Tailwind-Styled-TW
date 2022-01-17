import tw from 'twin.macro';
import styled from 'styled-components';

type ProgressBarProps = {
	percent: number;
};

const ProgressBar = ({ percent }: ProgressBarProps) => {
	if (percent > 100) {
		percent = 100;
	}

	const percentString = percent.toString();

	return (
		<ProgressContainer>
			<ProgressFiller style={{ width: `${percentString}%` }}></ProgressFiller>
		</ProgressContainer>
	);
};

export default ProgressBar;

const ProgressContainer = tw.div`
  height[20px]
  width[100%]
  background-color[#e0e0de]
  border-radius[50px]
`;

const ProgressFiller = tw.div`
  height[100%]
  transition[width 1s ease-in-out]
  border-radius[50px]
  background-color[#b840f0]
`;

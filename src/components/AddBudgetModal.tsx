import tw from 'twin.macro';
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { useBudgets } from '../contexts/BudgetContext';

type AddBudgetModalProps = {
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	budgetButtonRef: RefObject<HTMLButtonElement>;
};

const AddBudgetModal = ({
	modalOpen,
	setModalOpen,
	budgetButtonRef,
}: AddBudgetModalProps) => {
	const nameRef = useRef<HTMLInputElement>(null);
	const maxRef = useRef<HTMLInputElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		const { addBudget } = useBudgets();

		addBudget!({
			name: nameRef.current!.value,
			max: parseFloat(maxRef.current!.value),
		});

		setModalOpen(false);
	};

	const handleClickOutside = (event: Event) => {
		if (
			budgetButtonRef.current &&
			budgetButtonRef.current.contains(event.target as Node)
		) {
			setModalOpen(true);
		} else if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node)
		) {
			setModalOpen(false);
		}
	};

	const handleScroll = () => {
		setModalOpen(false);
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		window.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [modalOpen, setModalOpen]);

	return (
		<>
			{modalOpen && (
				<ModalWrapper>
					<Modal ref={modalRef}>
						<ModalHeader>
							<ModalTitle>New Budget</ModalTitle>
							<CloseButton>+</CloseButton>
						</ModalHeader>
						<BudgetForm onSubmit={(e) => handleSubmit(e)}>
							<FormLabel htmlFor="name">Name</FormLabel>
							<FormInput ref={nameRef} id="name" type="text" required />
							<FormLabel htmlFor="spending">Maximum Spending</FormLabel>
							<FormInput
								ref={maxRef}
								id="spending"
								type="number"
								required
								min={0}
								step={0.1}
							/>
							<FormButton type="submit" value="Add" />
						</BudgetForm>
					</Modal>
				</ModalWrapper>
			)}
		</>
	);
};

export default AddBudgetModal;

const ModalWrapper = tw.div`
  fixed
  top-0
  left-0
  background-color[rgba(0, 0, 0, 0.75)]
  height[100%]
  width[100%]
`;

const Modal = tw.div`
  border-radius[5px]
  background-color[#FFFFFF]
  pb-4
  fixed
  width[95%]
  max-width[450px]
  top[50%]
  left[50%]
  transform[translateX(-50%) translateY(-50%)]
`;

const ModalHeader = tw.div`
  flex
  justify-between
  align-items[center]
  px-4
  border-b
  border-color[#b6b6b6]
`;

const ModalTitle = tw.h2`
  font-bold
  font-size[x-large]
`;

const CloseButton = tw.button`
  font-size[xx-large]
  font-bold
  transform[rotate(45deg)]
`;

const BudgetForm = tw.form`
  flex
  flex-col
  px-4
`;

const FormLabel = tw.label`
  font-semibold
  mt-4
  mb-1.5
`;

const FormInput = tw.input`
  font-semibold
  p-2
  border
  border-color[#b6b6b6]
  border-radius[5px]
`;

const FormButton = tw.input`
  background-color[#b840f0]
  text-white

  font-semibold
  mt-4
  margin-inline-start[auto]
  border-radius[4px]
  px-2
  py-1
  hover:cursor-pointer
`;

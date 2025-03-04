import Button from './button';
import SeminarForm from './form-seminar';
import Modal from './modal';
import { useState } from 'react';

function CardSeminar({ seminar, deleteSeminar, saveSeminar }) {
	const { id, title, description, date, time, photo } = seminar;
	const [isOpen, setIsOpen] = useState(false);
	const [typeModal, setTypeModal] = useState('');

	const handleClickOpenModal = (type) => {
		setIsOpen(true);
		setTypeModal(type);
	};

	const handleClickCloseModal = () => {
		setIsOpen(false);
		setTypeModal('');
	};

	const handleClickDeleteSeminar = (event) => {
		event.preventDefault();
		deleteSeminar(id);
		setIsOpen(false);
	};

	return (
		<>
			<div className="rounded-lg overflow-hidden shadow-lg bg-white m-5">
				<img className="w-full h-48 object-cover" src={photo} alt={title} />
				<div className="p-4">
					<h2 className="text-xl font-semibold text-gray-800">{title}</h2>
					<p className="text-gray-600 mt-2">{description}</p>
					<div className="mt-4 text-gray-500">
						<p>
							<strong>Дата:</strong> {date}
						</p>
						<p>
							<strong>Время:</strong> {time}
						</p>
					</div>
					<Button onClick={() => handleClickOpenModal('edit')}>
						Редактировать
					</Button>
					<Button
						className="min-w-20 mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
						onClick={() => handleClickOpenModal('delete')}
					>
						Удалить
					</Button>
				</div>
			</div>
			<Modal isOpen={isOpen} onClose={handleClickCloseModal}>
				{typeModal === 'delete' && (
					<div className="w-96 text-center">
						<h1>Удалить семинар?</h1>
						<Button onClick={handleClickDeleteSeminar}>Да</Button>
						<Button onClick={handleClickCloseModal}>Нет</Button>
					</div>
				)}
				{typeModal === 'edit' && (
					<SeminarForm
						seminar={seminar}
						onSave={saveSeminar}
						onCancel={handleClickCloseModal}
					/>
				)}
			</Modal>
		</>
	);
}

export default CardSeminar;

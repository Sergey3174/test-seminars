import { useEffect, useState } from 'react';
import './App.css';
import CardSeminar from './components/card-seminar';
import Loader from './components/loader';

function App() {
	const [seminars, setSeminars] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// Загрузка семинаров
		setIsLoading(true);
		fetch(`http://localhost:3001/seminars`)
			.then((response) => response.json())
			.then((seminars) => {
				setSeminars(seminars);
				setIsLoading(false);
			})
			.catch((error) => console.error('Ошибка загрузки:', error));
	}, []);

	const deleteSeminar = async (id) => {
		// Функция удаления семинаров
		try {
			setIsLoading(true);
			const response = await fetch(`http://localhost:3001/seminars/${id}`, {
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error(`Failed to delete seminar with id ${id}`);
			}
			setIsLoading(false);
			setSeminars((prev) => prev.filter((seminar) => seminar.id !== id));
		} catch (error) {
			console.error('Error deleting seminar:', error);
			alert('Failed to delete seminar. Please try again later.');
		}
	};

	const saveSeminar = async (id, updatedSeminar) => {
		// Функция редактирования семинаров
		function convertDate(inputDate) {
			// конвертация даты
			const [year, month, day] = inputDate.split('-');
			return `${day}.${month}.${year}`;
		}
		updatedSeminar.date = convertDate(updatedSeminar.date);
		try {
			setIsLoading(true);
			const response = await fetch(`http://localhost:3001/seminars/${id}`, {
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				method: 'PUT',
				body: JSON.stringify(updatedSeminar),
			});

			if (!response.ok) {
				throw new Error(`Failed to save seminar with id ${id}`);
			}
			setIsLoading(false);

			setSeminars((prev) =>
				prev.map((seminar) =>
					seminar.id === id ? { ...seminar, ...updatedSeminar } : seminar,
				),
			);
		} catch (error) {
			console.error('Error saving seminar:', error);
			alert('Не удалось сохранить семинар. Попробуйте позже.');
		}
	};

	return (
		<div className="w-196 rounded-lg overflow-hidden shadow-lg bg-white m-auto">
			<h1 className="m-5 text-2xl">Список семинаров</h1>
			{isLoading ? (
				<Loader />
			) : seminars.length > 0 ? (
				seminars?.map((seminar) => (
					<CardSeminar
						seminar={seminar}
						key={seminar.id}
						deleteSeminar={deleteSeminar}
						saveSeminar={saveSeminar}
					/>
				))
			) : (
				<span>Семинаров нет</span>
			)}
		</div>
	);
}

export default App;

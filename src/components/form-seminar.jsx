import React, { useState } from 'react';
import Button from './button';

function SeminarForm({ seminar, onSave, onCancel }) {
	const { id, title, description, date, time, photo } = seminar;

	const [formData, setFormData] = useState({
		title,
		description,
		date: convertDate(date),
		time,
		photo,
	});

	function convertDate(inputDate) {
		const [day, month, year] = inputDate.split('.');
		return `${year}-${month}-${day}`;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(id, formData);
	};

	return (
		<div className="w-96">
			<h2 className="text-2xl font-semibold text-center mb-4">
				Редактировать семинар
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700"
					>
						Название семинара
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700"
					></label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						rows="4"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="date"
						className="block text-sm font-medium text-gray-700"
					>
						Дата
					</label>
					<input
						type="date"
						id="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="time"
						className="block text-sm font-medium text-gray-700"
					>
						Время
					</label>
					<input
						type="time"
						id="time"
						name="time"
						value={formData.time}
						onChange={handleChange}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="photo"
						className="block text-sm font-medium text-gray-700"
					>
						Ссылка на изображение
					</label>
					<input
						type="url"
						id="photo"
						name="photo"
						value={formData.photo}
						onChange={handleChange}
						className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						required
					/>
				</div>

				<div className="flex justify-between">
					<Button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded
						hover:bg-blue-600 focus:outline-none focus:ring-2
						focus:ring-blue-500"
					>
						Сохранить
					</Button>
					<Button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
					>
						Отменить
					</Button>
				</div>
			</form>
		</div>
	);
}

export default SeminarForm;

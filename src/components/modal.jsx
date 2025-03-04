import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 flex items-center justify-center bg-blue-200/50">
			<div className="bg-white p-6 rounded-lg shadow-lg relative">
				<button className="absolute top-2 right-2 text-xl" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>,
		document.body,
	);
};

export default Modal;

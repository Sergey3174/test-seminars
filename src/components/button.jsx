import clsx from 'clsx';

function Button({ children, ...props }) {
	return (
		<button
			className={clsx(
				'min-w-20 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2',
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;

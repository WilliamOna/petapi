import React, { useEffect } from 'react';
import Amplify, { API } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './App.css';

Amplify.configure(config);

function App() {
	const [petName, setPetName] = React.useState('');
	const [petType, setPetType] = React.useState('');
	const [pets, setPets] = React.useState([]);
	useEffect(() => {
		API.get('petsapi', '/pet/name').then((petRes) =>
			setPets([...pets, ...petRes])
		);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		API.post('petsapi', '/pet', {
			body: {
				name: petName,
				type: petType,
			},
		}).then((fetchedPets) => setPets([...pets, ...fetchedPets]));
	};
	return (
		<div className='App'>
			<header className='App-header'>
				{' '}
				Pets!
				<AmplifySignOut />
				<form>
					<input
						value={petName}
						placeholder='Fiddo'
						onChange={(e) => setPetName(e.target.value)}
					/>
					<input
						value={petType}
						placeholder='Dog'
						onChange={(e) => setPetType(e.target.value)}
					/>
					<button onClick={handleSubmit}>Add Pet</button>
				</form>
				<ul>
					{pets.map((pet) => (
						<li>
							{pet.name} the {pet.type}
						</li>
					))}
				</ul>
			</header>
		</div>
	);
}

export default withAuthenticator(App);

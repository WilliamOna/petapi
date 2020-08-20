import React from 'react';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './App.css';

Amplify.configure(config);

function App() {
	return (
		<div className='App'>
			<header className='App-header'> Pets!</header>
		</div>
	);
}

export default withAuthenticator(App);

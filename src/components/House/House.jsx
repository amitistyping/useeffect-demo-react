import { useState, useEffect } from 'react';
import {
	Container,
	Typography,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableBody,
	Paper,
	Box,
} from '@mui/material';

const wizardAPIURL = `https://wizard-world-api.herokuapp.com/Houses`;

const fetchWizardHouses = async () => {
	try {
		const fetchWizardHousesAPIResponse = await fetch(wizardAPIURL);
		const fetchWizardHousesAPIResponseJSON = await fetchWizardHousesAPIResponse.json();
		return fetchWizardHousesAPIResponseJSON;
	} catch (error) {
		console.log(`Failed to fetch Wizard Houses. Error: ${error.message}`);
	}
};

const House = () => {
	const [wizardHouses, setWizardHouses] = useState();

	useEffect(() => {
		(async () => {
			const fetchWizardHousesData = await fetchWizardHouses();
			setWizardHouses(fetchWizardHousesData);
		})();
	}, []);

	return (
		<Container sx={{ width: '75%' }}>
			<Box display='flex' flexWrap='wrap' justifyContent='center' alignItems='center'>
				<Typography variant='h3' component='h3' sx={{ mt: 5 }}>
					Wizard Houses
				</Typography>
				<TableContainer component={Paper} sx={{ mt: 10 }}>
					<Table aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align='right'>House Colors</TableCell>
								<TableCell align='right'>Founder</TableCell>
								<TableCell align='right'>Animal</TableCell>
								<TableCell align='right'>Element</TableCell>
								<TableCell align='right'>Ghost</TableCell>
								<TableCell align='right'>Common Room</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{wizardHouses
								? wizardHouses.map((wizardHouse) => (
										<TableRow
											key={wizardHouse.name}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component='th' scope='row'>
												{wizardHouse.name}
											</TableCell>
											<TableCell align='right'>{wizardHouse.houseColours}</TableCell>
											<TableCell align='right'>{wizardHouse.founder}</TableCell>
											<TableCell align='right'>{wizardHouse.animal}</TableCell>
											<TableCell align='right'>{wizardHouse.element}</TableCell>
											<TableCell align='right'>{wizardHouse.ghost}</TableCell>
											<TableCell align='right'>{wizardHouse.commonRoom}</TableCell>
										</TableRow>
								  ))
								: null}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Container>
	);
};

export default House;

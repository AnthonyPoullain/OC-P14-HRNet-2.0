import React, { useState } from 'react';
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import Field from '../Field/Field';
import styles from './Table.module.css';

function Table({
	data,
	columns,
}: {
	data: Employee[];
	columns: (string | object)[];
}) {
	// Number of entries to display in the table
	const amountsOfEntries = [10, 25, 50, 100];
	const [nbOfEntries, setNbOfEntries] = useState(amountsOfEntries[0]);

	return (
		<>
			<div className={styles['pagination-input']}>
				<span>Show</span>
				<Field
					value={nbOfEntries.toString()}
					type="select"
					id="entries"
					options={amountsOfEntries}
					onChange={(e) => setNbOfEntries(Number(e.target.value))}
				/>
				<span>entries</span>
			</div>

			<Grid
				data={data}
				columns={columns}
				search
				sort
				style={{
					table: {
						'font-size': '14px',
					},
					th: {
						'text-align': 'left',
						'padding-left': '20px',
						'padding-right': '10px',
						'vertical-align': 'center',
					},
					td: {
						width: '100px',
					},
				}}
				pagination={{
					enabled: true,
					limit: nbOfEntries,
				}}
			/>
		</>
	);
}

export default React.memo(Table);

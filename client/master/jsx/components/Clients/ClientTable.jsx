import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table, Pagination } from 'react-bootstrap';
import moment from 'moment';


class ClientTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			query: ''
		}
	}

	render() {
		const { moves, onTableClick, filterMoves } = this.props;
		const { query } = this.state;
		return (
				<div className="panel panel-default">
					{ /* START table-header */ }
					<div className="panel-heading">
						<Row>
							<Col lg={ 12 }>
								<div className="input-group input-group-lg">
									<input 
										type="text" 
										placeholder="Search by name" 
										className="form-control" 
										value={ query }
										onChange={ e => {
											let query = e.target.value;
											this.setState({ query });
											filterMoves(query) 
										}}/>

								</div>
							</Col>
						</Row>
					</div>
					{ /* START table-responsive */ }
					<Table id="table-ext-1" responsive bordered hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Picture</th>
								<th>Origin</th>
								<th>Destination</th>
								<th>Survey Date</th>
							</tr>
						</thead>
						<tbody>
							{moves.map( move => (
								<tr 
									onClick={ () => onTableClick(move.user_id) } 
									key={ move._id }>
									<td>{ move.name }</td>
									<td>
										<div className="media">
											<img 
												src="https://t3.ftcdn.net/jpg/01/06/07/16/240_F_106071621_UwCztl7yyMbVNSMijfuYyZrzbtmoxJPH.jpg" 
												alt="Image" 
												className="img-responsive img-circle" 
												style={{maxHeight: '80px'}}/>
										</div>
									</td>
									<td>{ move.currentAddress }</td>
									<td>{ move.futureAddress }</td>
									<td>{ move.surveyComplete ? 'Survey Complete' : moment(move.surveyTime).format("MM/DD, ddd, hA") }</td>
								</tr>    
							))}
							
						</tbody>
					</Table>
					{ /* END table-responsive */ }
					<div className="panel-footer">
						
					</div>
				</div>
		);
	}

}

export default ClientTable;

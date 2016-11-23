import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table, Pagination } from 'react-bootstrap';
// import TableExtendedRun from './TableExtended.run';

class ClientTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { moves, onTableClick } = this.props;
		return (
				<div className="panel panel-default">
					{ /* START table-header */ }
					<div className="panel-heading">
						<Row>
							<Col lg={ 2 }>
								<div className="input-group">
									<input type="text" placeholder="Search" className="input-sm form-control" />
									<span className="input-group-btn">
											  <button type="button" className="btn btn-sm btn-default">Search</button>
										   </span>
								</div>
							</Col>
							<Col lg={ 8 }></Col>
							<Col lg={ 2 }>
								<div className="input-group pull-right">
									<select className="input-sm form-control">
										<option value="0">Bulk action</option>
										<option value="1">Delete</option>
										<option value="2">Clone</option>
										<option value="3">Export</option>
									</select>
									<span className="input-group-btn">
											  <button className="btn btn-sm btn-default">Apply</button>
										   </span>
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
								<th>Status</th>
								<th>Buttons</th>
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
											<img src="img/user/01.jpg" alt="Image" className="img-responsive img-circle" />
										</div>
									</td>
									<td>{ move.currentAddress }</td>
									<td>{ move.futureAddress }</td>
									<td>Survey Complete</td>
									<td className="text-center">
										<div data-label="25%" className="radial-bar radial-bar-25 radial-bar-xs"></div>
									</td>
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

import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populatePersonData();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Navn</th>
            <th>Tlf</th>
            <th>Billede</th>
            <th>Motto</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.id}>
              <td>{forecast.navn}</td>
              <td>{forecast.telefonnummer}</td>
              <td>{forecast.imageUrl}</td>
              <td>{forecast.motto}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel">Telefonbog</h1>
        <p>Dette komponent henter data fra en server.</p>
        {contents}
      </div>
    );
  }

  async populatePersonData() {
      const response = await fetch('https://shrouded-peak-36914.herokuapp.com/persons');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
    }
}

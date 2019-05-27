import React, {Component} from 'react';
import autoBind from 'react-autobind';

class ParseRupiah extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      denomAmount: {
        oneHundredThousand: 0,
        fiftyThousand: 0,
        twentyThousand: 0,
        tenThousand: 0,
        fiveThousand: 0,
        oneThousand: 0,
        fiveHundred: 0,
        twoHundred: 0,
        oneHundred: 0,
        fifty: 0,
        remainder: 0,
      },
    };
    autoBind(this);
  }

  onChange(event) {
    this.setState({inputValue: event.target.value});
    console.log(event.target.value);
  }

  onSubmit() {}

  parseInput() {
    let inputValue = this.state.inputValue;
    let re = /^(Rp\s*)?(\d+(\.?\d{3})*(,\d{2})?)$/gm;
  }

  render() {
    return (
      <div>
        <div className="input-container">
          <form>
            <input
              type="text"
              id="rupiah"
              placeholder="Input rupiah amount"
              value={this.state.inputValue}
              onChange={this.onChange}
            />
            <button type="submit" onClick={this.onSubmit}>
              Submit
            </button>
          </form>
        </div>
        <div className="results">
          <table>
            <thead>
              <tr>
                <td>Denomination</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              <tr className="table-odd">
                <td>100000</td>
                <td>{this.state.denomAmount.oneHundredThousand}</td>
              </tr>
              <tr>
                <td>50000</td>
                <td>{this.state.denomAmount.fiftyThousand}</td>
              </tr>
              <tr className="table-odd">
                <td>20000</td>
                <td>{this.state.denomAmount.twentyThousand}</td>
              </tr>
              <tr>
                <td>10000</td>
                <td>{this.state.denomAmount.tenThousand}</td>
              </tr>
              <tr className="table-odd">
                <td>5000</td>
                <td>{this.state.denomAmount.fiveThousand}</td>
              </tr>
              <tr>
                <td>1000</td>
                <td>{this.state.denomAmount.oneThousand}</td>
              </tr>
              <tr className="table-odd">
                <td>500</td>
                <td>{this.state.denomAmount.fiveHundred}</td>
              </tr>
              <tr>
                <td>200</td>
                <td>{this.state.denomAmount.twoHundred}</td>
              </tr>
              <tr className="table-odd">
                <td>100</td>
                <td>{this.state.denomAmount.oneHundred}</td>
              </tr>
              <tr>
                <td>50</td>
                <td>{this.state.denomAmount.fifty}</td>
              </tr>
              <tr className="table-odd">
                <td>Remainder</td>
                <td>{this.state.denomAmount.remainder}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ParseRupiah;

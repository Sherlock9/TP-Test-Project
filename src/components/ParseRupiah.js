import React, {Component} from 'react';
import autoBind from 'react-autobind';

import '../styles/ParseRupiah.css';

class ParseRupiah extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      denomAmount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      warningShown: false,
    };
    autoBind(this);
  }

  onChange(event) {
    this.setState({inputValue: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    this.parseInput();
  }

  parseInput() {
    let {inputValue} = this.state;
    let rupiahRe = /^(Rp\s*)?(\d+(\.?\d{3})*(,\d{2})?)$/g;
    let reArray = rupiahRe.exec(inputValue);

    // if bad input, run badInput() and quit early
    if (reArray == null) {
      this.setState({
        denomAmount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        warningShown: true,
      });
      return;
    } else {
      this.setState({
        warningShown: false,
      });
    }

    let replaceSeparator1 = reArray[2].replace(/\.(\d+)/g, '$1');
    let replaceSeparator2 = replaceSeparator1.replace(/,(\d+)$/, '.$1');
    let finalValue = parseFloat(replaceSeparator2);
    this.setResults(finalValue);
  }

  setResults(moneyValue) {
    let denominations = [
      100000,
      50000,
      20000,
      10000,
      5000,
      1000,
      500,
      200,
      100,
      50,
    ];
    let resultsArray = [];
    for (let denom of denominations) {
      let quotient = Math.floor(moneyValue / denom);
      resultsArray.push(quotient);
      moneyValue = moneyValue % denom;
    }
    resultsArray.push(moneyValue);
    this.setState({denomAmount: resultsArray});
  }

  render() {
    let {inputValue, denomAmount, warningShown} = this.state;
    return (
      <div>
        <div className="input-container">
          <form>
            <input
              type="text"
              id="rupiah"
              placeholder="Input rupiah amount"
              value={inputValue}
              onChange={this.onChange}
            />
            <button type="submit" onClick={this.onSubmit}>
              Submit
            </button>
          </form>
        </div>
        {/* In future, use a more helpful warning that explains what the correct formats are */}
        <div className="bad-input">
          {warningShown && (
            <p className="warning">Your input is not formatted correctly.</p>
          )}
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
                <td>{denomAmount[0]}</td>
              </tr>
              <tr>
                <td>50000</td>
                <td>{denomAmount[1]}</td>
              </tr>
              <tr className="table-odd">
                <td>20000</td>
                <td>{denomAmount[2]}</td>
              </tr>
              <tr>
                <td>10000</td>
                <td>{denomAmount[3]}</td>
              </tr>
              <tr className="table-odd">
                <td>5000</td>
                <td>{denomAmount[4]}</td>
              </tr>
              <tr>
                <td>1000</td>
                <td>{denomAmount[5]}</td>
              </tr>
              <tr className="table-odd">
                <td>500</td>
                <td>{denomAmount[6]}</td>
              </tr>
              <tr>
                <td>200</td>
                <td>{denomAmount[7]}</td>
              </tr>
              <tr className="table-odd">
                <td>100</td>
                <td>{denomAmount[8]}</td>
              </tr>
              <tr>
                <td>50</td>
                <td>{denomAmount[9]}</td>
              </tr>
              <tr className="table-odd">
                <td>Remainder</td>
                <td>{denomAmount[10]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ParseRupiah;

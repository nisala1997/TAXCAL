import React, { useState } from "react";
import backgroundImg from "./image.png";
import "./App.css";

// Tax rates
const TAX_A = 0.234956; // BUCD
const TAX_B = 0.420199; // ACF

function App() {
  const [inputType, setInputType] = useState("With Tax");
  const [option, setOption] = useState("COMBO");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState({
    bucd: 0,
    acf: 0,
    withoutTax: 0,
    withTax: 0,
    taxValue: 0,
  });

  const handleCalculate = () => {
    let numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) return;

    let bucd = 0,
      acf = 0,
      withTaxPrice = 0,
      withoutTaxPrice = 0;

    if (inputType === "With Tax") {
      withTaxPrice = numPrice;
      switch (option) {
        case "COMBO":
          bucd = (withTaxPrice * 0.92) / (1 + TAX_A);
          acf = (withTaxPrice * 0.08) / (1 + TAX_B);
          break;
        case "VOICE":
          bucd = 0;
          acf = withTaxPrice / (1 + TAX_B);
          break;
        case "DATA":
          bucd = withTaxPrice / (1 + TAX_A);
          acf = 0;
          break;
        case "SPECIAL":
          bucd = (withTaxPrice * 0.82) / (1 + TAX_A);
          acf = (withTaxPrice * 0.18) / (1 + TAX_B);
          break;
        default:
          bucd = acf = 0;
      }
    } else {
      switch (option) {
        case "COMBO":
          bucd = numPrice * 0.92;
          acf = numPrice * 0.08;
          withTaxPrice = bucd * (1 + TAX_A) + acf * (1 + TAX_B);
          break;
        case "VOICE":
          bucd = 0;
          acf = numPrice;
          withTaxPrice = acf * (1 + TAX_B);
          break;
        case "DATA":
          bucd = numPrice;
          acf = 0;
          withTaxPrice = bucd * (1 + TAX_A);
          break;
        case "SPECIAL":
          bucd = numPrice * 0.82;
          acf = numPrice * 0.18;
          withTaxPrice = bucd * (1 + TAX_A) + acf * (1 + TAX_B);
          break;
        default:
          bucd = acf = withTaxPrice = 0;
      }
    }

    withoutTaxPrice = bucd + acf;
    const taxValue = withTaxPrice - withoutTaxPrice;

    setResults({
      bucd,
      acf,
      withoutTax: withoutTaxPrice,
      withTax: withTaxPrice,
      taxValue,
    });
  };

  return (
    <div className="full-screen">
      {/* Blurred Background */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>

      {/* Logo */}
      <div className="logo">NN.</div>

      {/* Calculator card */}
      <div className="calculator-card">
        <h2>TAXCAL</h2>

        <div className="form-group">
          <label>Input Type:</label>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option>With Tax</option>
            <option>Without Tax</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            {inputType === "With Tax"
              ? "Enter Package Price (With Tax, Rs.):"
              : "Enter Package Price (Without Tax, Rs.):"}
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={
              inputType === "With Tax"
                ? "Enter with-tax price"
                : "Enter without-tax price"
            }
          />
        </div>

        <div className="form-group">
          <label>Select Option:</label>
          <select value={option} onChange={(e) => setOption(e.target.value)}>
            <option>COMBO</option>
            <option>DATA</option>
            <option>VOICE</option>
            <option>SPECIAL</option>
          </select>
        </div>

        <button onClick={handleCalculate}>Calculate</button>

        <div className="results">
          <p>BUCD: {results.bucd.toFixed(2)}</p>
          <p>ACF: {results.acf.toFixed(2)}</p>
          <p>Without Tax: {results.withoutTax.toFixed(2)}</p>
          <p>With Tax: {results.withTax.toFixed(2)}</p>
          <p>Tax Value: {results.taxValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

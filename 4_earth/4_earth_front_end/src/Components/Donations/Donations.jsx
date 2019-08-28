import React, { useEffect, useState } from "react";
import axios from "axios";

export default function(props) {
  const [donationsState, setDonationsState] = useState({
    name: "",
    cardNumber: "",
    expiration: "",
    code: "",
    amount: ""
  });

  const [postedDonationState, setPostedDonation] = useState({
    donated: false
  });

  const inputChangeHandler = event => {
    const newState = {
      ...donationsState
    };
    newState[event.target.name] = event.target.value;
    setDonationsState(newState);
  };

  const submitHandler = event => {
    event.preventDefault();
    const url = "http://localhost:3001/donation";
    const data = {
      name: donationsState.name,
      cardNumber: donationsState.cardNumber,
      expiration: donationsState.expiration,
      code: donationsState.code,
      amount: donationsState.amount
    };
    axios.post(url, data).then(response => {
      setPostedDonation({ donated: true });
    });
  };

  return (
    <div id="donationsContainer" className="donationsContainer">
      <h1>This is donations component</h1>
      <div className="donationFormContainer">
        {postedDonationState.donated ? (
          <div>Thank you!</div>
        ) : (
          <form className="donationForm" onSubmit={submitHandler}>
            <label htmlFor="name">
              Cardholder Name:
              <input type="text" name="name" onChange={inputChangeHandler} />
            </label>
            <label htmlFor="cardNumber">
              Card Number:
              <input
                type="text"
                name="cardNumber"
                onChange={inputChangeHandler}
              />
            </label>
            <label htmlFor="expireDate">
              Expiration Date:
              <input
                type="text"
                name="expireDate"
                onChange={inputChangeHandler}
              />
            </label>
            <label htmlFor="code">
              Security Code:
              <input type="text" name="code" onChange={inputChangeHandler} />
            </label>
            <label htmlFor="amount">
              Amount:
              <input type="text" name="amount" onChange={inputChangeHandler} />
            </label>
            <button>Donate</button>
          </form>
        )}
      </div>
    </div>
  );
}

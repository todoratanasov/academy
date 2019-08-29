import React, { useEffect, useState } from "react";
import axios from "axios";
import Thanks from "../Thanks/Thanks";

export default function(props) {
  const [creditCardState, setCreditCardState] = useState({
    card: "/credit_card/face_clear.png"
  });

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

  const selectHandler = event => {
    const inputName = event.target.name;
    if (inputName === "name") {
      setCreditCardState({
        card: "/credit_card/face_name.png"
      });
    } else if (inputName === "cardNumber") {
      setCreditCardState({
        card: "/credit_card/face_number.png"
      });
    } else if (inputName === "expireDate") {
      setCreditCardState({
        card: "/credit_card/face_expire.png"
      });
    } else if (inputName === "code") {
      setCreditCardState({
        card: "/credit_card/back_code.png"
      });
    }
    console.log(event.target.name);
  };

  return (
    <div id="donationsContainer" className="donationsContainer">
      <h1>Let's invest in our children's future!</h1>
      <div className="donationFormContainer">
        {postedDonationState.donated ? (
          <Thanks title={"We'll put your money in to good use!"} />
        ) : (
          <div className="donationAndExampleContainer">
            <form className="donationForm" onSubmit={submitHandler}>
              <h3>Make a donation!</h3>
              <label htmlFor="name">
                Cardholder Name:
                <input
                  type="text"
                  name="name"
                  onChange={inputChangeHandler}
                  onSelect={selectHandler}
                />
              </label>
              <label htmlFor="cardNumber">
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  onChange={inputChangeHandler}
                  onSelect={selectHandler}
                />
              </label>
              <label htmlFor="expireDate">
                Expiration Date:
                <input
                  type="text"
                  name="expireDate"
                  onChange={inputChangeHandler}
                  onSelect={selectHandler}
                />
              </label>
              <label htmlFor="code">
                Security Code:
                <input
                  type="text"
                  name="code"
                  onChange={inputChangeHandler}
                  onSelect={selectHandler}
                />
              </label>
              <label htmlFor="amount">
                Amount:
                <input
                  type="text"
                  name="amount"
                  onChange={inputChangeHandler}
                />
              </label>
              <button>Donate</button>
            </form>
            <div className="cardExample">
              <img src={process.env.PUBLIC_URL + creditCardState.card} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//import axios from "axios";
class App extends React.Component {
  constructor() {
    super();
  }
  onClickSubmit() {
    ReactDOM.render(<F1 />, document.getElementById("app"));
  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.onClickSubmit}>Checkout</button>
        </div>
      </div>
    );
  }
}
//*****************************************************form F1*****************************
//***************************************************************************************** */
class F1 extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  changeHandlerName(evt) {
    this.setState({
      name: evt.target.value
    });
  }

  changeHandlerEmail(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  changeHandlerPassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  submitHandler() {
    console.log("F1==>f2");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // console.log("okkkk");
    axios
      .post("http://localhost:4000/step", this.state, config)
      .then(response => {
        console.log("data ==>", response.data);
        ReactDOM.render(
          <F2 id={response.data} />,
          document.getElementById("app")
        );
      });
  }

  render() {
    return (
      <div>
        <h1>F1 form </h1>
        <p>Enter your name, and submit:</p>
        <input type="text" onChange={evt => this.changeHandlerName(evt)} />
        <p>Enter your Email, and submit:</p>
        <input type="text" onChange={evt => this.changeHandlerEmail(evt)} />
        <p>Enter your Password, and submit:</p>
        <input
          type="password"
          onChange={evt => this.changeHandlerPassword(evt)}
        />
        <button onClick={() => this.submitHandler()}>Next</button>
      </div>
    );
  }
}
/****************************************************Form2 *********************************************/
/***************************************************************************************************** */
class F2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line1: "",
      line2: "",
      city: "",
      _state: "",
      zipcode: "",
      phone: 0
    };
  }

  submitHandler() {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios
      .put(
        "http://localhost:4000/updateStep",
        { id: this.props.id, data: this.state },
        config
      )
      .then(r => {
        ReactDOM.render(<F3 id={r.data._id} />, document.getElementById("app"));
      })
      .catch(e => console.log(e));

    // ReactDOM.render(
    //   <F3 data={Object.assign(this.props.data, this.state)} />,
    //   document.getElementById("form")
    // );
  }

  render() {
    return (
      <div>
        <h1>F2 form </h1>
        <p>Address </p>
        <p>line 1:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ line1: evt.target.value });
          }}
        />
        <p>line 2:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ line2: evt.target.value });
          }}
        />
        <p>City:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ city: evt.target.value });
          }}
        />
        <p>State:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ _state: evt.target.value });
          }}
        />
        <p>zip code:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ zipcode: evt.target.value });
          }}
        />

        <p>Phone:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ phone: evt.target.value });
          }}
        />
        <button onClick={() => this.submitHandler()}>Next</button>
      </div>
    );
  }
}
/****************************************************Form3 *********************************************/
/***************************************************************************************************** */
class F3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCard: "",
      expirydate: "",
      cvv: "",
      billingZc: ""
    };
  }
  // componentDidMount() {
  //   console.log(this.props.data);
  // }

  submitHandler() {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios
      .put(
        "http://localhost:4000/updateStep2",
        { id: this.props.id, data: this.state },
        config
      )
      .then(r => {
        console.log("response 3====>", r);
        ReactDOM.render(<App />, document.getElementById("app"));
      })
      .catch(e => console.log(e));

    // ReactDOM.render(
    //   <F3 data={Object.assign(this.props.data, this.state)} />,
    //   document.getElementById("form")
    // );
  }

  // submitHandler() {

  //   ReactDOM.render(
  //     <F3 data={Object.assign(this.props.data, this.state)} />,
  //     document.getElementById("form")
  //   );
  // }

  render() {
    return (
      <div>
        <h1>F2 form </h1>
        <p>Credit Card:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ creditCard: evt.target.value });
          }}
        />
        <p> Expiry date</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ expirydate: evt.target.value });
          }}
        />
        <p>CCV:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ cvv: evt.target.value });
          }}
        />
        <p>billing zip code:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ billingZc: evt.target.value });
          }}
        />

        <button onClick={() => this.submitHandler()}>Next</button>
      </div>
    );
  }
}

class pu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCard: "",
      expirydate: "",
      cvv: "",
      billingZc: ""
    };
  }
  componentDidMount() {
    console.log(this.props.data);
  }

  submitHandler() {
    ReactDOM.render(
      <F3 data={Object.assign(this.props.data, this.state)} />,
      document.getElementById("app")
    );
  }

  render() {
    return (
      <div>
        <h1>F2 form </h1>
        <p>Credit Card:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ creditCard: evt.target.value });
          }}
        />
        <p> Expiry date</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ expirydate: evt.target.value });
          }}
        />
        <p>CCV:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ cvv: evt.target.value });
          }}
        />
        <p>billing zip code:</p>
        <input
          type="text"
          onChange={evt => {
            this.setState({ billingZc: evt.target.value });
          }}
        />

        <button onClick={() => this.submitHandler()}>Next</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

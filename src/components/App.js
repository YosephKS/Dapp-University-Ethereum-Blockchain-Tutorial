import React, { Component } from "react";
import Web3 from "web3";
import Contract from "web3-eth-contract";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./App.css";
import NavBar from "./Navbar";
import SocialNetwork from "../abis/SocialNetwork.json";

Contract.setProvider("http://localhost:7545");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      socialNetwork: null,
      posts: [],
      loading: false,
    };
    this.createPosts = this.createPosts.bind(this);
    this.tipPosts = this.tipPosts.bind(this);
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
        } catch (error) {
          console.error(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      }
      // Non-dapp browsers...
      else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    });
  }

  async loadBlockchainData() {
    this.setState({ loading: true });
    const web3 = window.web3;
    // Load account
    web3.eth.getAccounts((error, accounts) => {
      this.setState({ account: accounts[0] });
      console.log(window.web3.eth.getBalance(accounts[0]));
    });
    // NetworkID
    web3.version.getNetwork(async (error, networkId) => {
      // If no error and social network Id is found
      const networkData = SocialNetwork.networks[networkId];
      if (!error && networkData) {
        const socialNetwork = new Contract(
          SocialNetwork.abi,
          networkData.address
        );
        this.setState({ socialNetwork });
        const postCount = await socialNetwork.methods.postCount().call();
        this.setState({ postCount });
        // Load Posts
        for (let i = 1; i <= postCount; i++) {
          const post = await socialNetwork.methods.posts(i).call();
          this.setState({
            posts: [...this.state.posts, post],
          });
        }
        // Sort posts. Show highest tipped posts first
        this.setState({
          posts: this.state.posts.sort((a, b) => b.tipAmount - a.tipAmount),
        });
        this.setState({ loading: false });
      } else {
        window.alert("SocialNetwork Contract not deployed.");
      }
    });
    // Address
    // ABI
  }

  async createPosts(content) {
    this.setState({ loading: true });
    // console.log(this.state.account);
    this.state.socialNetwork.methods
      .createPost(content)
      .send({ from: this.state.account, gas: 3000000 })
      .once("receipt", async (receipt) => {
        this.setState({ loading: false });
      });
  }

  async tipPosts(id, tipAmount) {
    this.setState({ loading: true });
    // console.log(this.state.account);
    this.state.socialNetwork.methods
      .tipPost(id)
      .send({ from: this.state.account, value: tipAmount, gas: 3000000 })
      .once("receipt", async (receipt) => {
        console.log(receipt);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <NavBar account={this.state.account} />
        <div className="container-fluid mt-5">
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const content = this.postContent.value;
                      this.createPosts(content);
                    }}
                  >
                    <div
                      className="form-group mr-sm-2"
                      style={{ marginTop: "50px" }}
                    >
                      <input
                        id="postContent"
                        type="text"
                        className="form-control"
                        placeholder="What's on your mind?"
                        ref={(input) => {
                          this.postContent = input;
                        }}
                        required
                      />
                      <Button
                        variant="primary"
                        type="submit"
                        block
                        style={{ marginTop: "12.5px" }}
                      >
                        Share
                      </Button>
                    </div>
                  </form>
                  {this.state.posts.map((post, key) => {
                    return (
                      <Card
                        style={{ width: "500px", marginBottom: "20px" }}
                        key={key}
                      >
                        <Card.Header>{post.author}</Card.Header>
                        <Card.Body>
                          <Card.Text>{post.content}</Card.Text>
                          <Button
                            variant="primary"
                            name={post.id}
                            onClick={(event) => {
                              let tipAmount = window.web3.utils.toWei(
                                "0.1",
                                "Ether"
                              );
                              this.tipPosts(event.target.name, tipAmount);
                            }}
                          >
                            TIP 0.1 ETH
                          </Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                          TIPS:{" "}
                          {window.web3.utils.fromWei(
                            post.tipAmount.toString(),
                            "Ether"
                          )}
                        </Card.Footer>
                      </Card>
                    );
                  })}
                </div>
              </main>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

import web3 from "./web3";

const ADDRESS = "0x37bC45Fe1F47Ab5735A7f6f1849740929fa5E453";
const ABI = [
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "initialSupply", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  }
];

export default new web3.eth.Contract(ABI, ADDRESS);
pragma solidity ^0.5.0;

contract Bina {
struct Airline {

uint256 money;
uint active;
// 0 = deleted / 1 = active

mapping(uint256 => uint256) customers;

    }

address owner;

mapping(address => Airline) airlinesMap;
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
        }

function register(address addr) public 
{
    uint active =1;
    uint256 balance =700
    airlinesMap[addr] = Airline(balance,active);
    }
    
function request(address outGoing, uint256 flightNum,uint256 customerID) public
 {
    airlinesMap[outGoing].customers[customerID] = flightNum;
    }

function response(address inComing, uint256 customerID) public 
{
    airlinesMap[inComing].customers[customerID] = 0;
    }

function settlePayment(address outGoing, address inComing, uint256 amount) public 
{
    uint256 o =airlinesMap[outGoing].money
    uint256 i =  airlinesMap[inComing].money    
    airlinesMap[inComing].money = i -amount;
    airlinesMap[outGoing].money = o+ amount;
    }

function unregister(address airline) public onlyOwner
{
    uint256 leftmoney =airlinesMap[airline].money;
    airlinesMap[airline].money=0;
    uint active =0;
    airlinesMap[owner].money = airlinesMap[owner].money +leftmoney;

    }


//function balancedetails(address outGoing, address inComing, uint256 amount) public 
//{
    uint256 o =airlinesMap[outGoing].money
    uint256 i =  airlinesMap[inComing].money    
    airlinesMap[outGoing].customers[customerID] = flightNum;

//   }


}
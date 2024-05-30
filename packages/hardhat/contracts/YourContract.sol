//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
	address public owner;

	event PaymentSent(
		address indexed _from,
		address indexed _to,
		uint256 _amount
	);

	constructor() {
		owner = msg.sender;
	}

	function sendPayment(address payable _to) public payable {
		require(msg.value > 0, "Necesitas enviar algo de Ether");
		require(_to != address(0), "Direccion invalida");

		_to.transfer(msg.value);

		emit PaymentSent(msg.sender, _to, msg.value);
	}

	// Function to receive Ether. msg.data must be empty
	receive() external payable {}

	// Fallback function is called when msg.data is not empty
	fallback() external payable {}
}

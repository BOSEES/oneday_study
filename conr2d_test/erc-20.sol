// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint public totalSupply;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowances;

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _totalSupply) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply;
        balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }


    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function _transfer(address _from, address _to, uint256 _value) private returns (bool success) {
        require(balances[_from] >= _value);
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {        
        return _transfer(msg.sender, _to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(allowances[_from][_to] >= _value);
        require(msg.sender == _to);
        allowances[_from][_to] -= _value;
        return _transfer(_from, _to, _value);
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        require(_value == 0 || allowances[msg.sender][_spender] == 0);
        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return allowances[_owner][_spender];
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}


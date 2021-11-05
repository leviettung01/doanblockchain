// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TruffleFactory is ERC721, Ownable{
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter _tokenIds;
    mapping(uint256 => string) _tokenURIs;
    
    constructor(address marketplaceAddress) ERC721("Truffle","TFT")
    {
        contractAddress = marketplaceAddress;
    }
    
    address contractAddress;
    uint256 DNA_MOD = 10**16;
    uint256 fee = 0.025 ether;
    uint256 levelUpFee = 0.001 ether;
    uint256 feeBreed = 0.01 ether;
    uint randNonce = 0;
        uint32[3] public cooldowns = [
        uint32(30 minutes),
        uint32(1 hours),
        uint32(2 hours)
    ];

    struct Truffle {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
        uint32 readyTime;
        uint8 dadId;
        uint8 mumId;
    }

    Truffle[] public truffles;

    event NewTruffle(address indexed owner, uint256 id, uint256 dna);

    // Helpers
    function getFee() public view returns (uint256) {
        return fee;
    }

    function FreeLeveUp() public view returns (uint256) {
        return levelUpFee;
    }
    
    function getFeeBreed() public view returns (uint256) {
        return feeBreed;
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _createRandomDna(string memory _mod) internal view returns (uint256) {
        uint256 randomNum = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, _mod))
        );
        return randomNum % DNA_MOD;
    }
    
    function _createTruffle(string memory _name,  uint256 _dna ,uint8 dadId, uint8 mumId) internal {
        uint8 randRarity = uint8(_dna % 100);
        
        uint256 newId = _tokenIds.current();
        Truffle memory newTruffle = Truffle(_name, newId, _dna, 1, randRarity, uint32(block.timestamp), dadId, mumId );
        truffles.push(newTruffle);
        _safeMint(msg.sender, newId);
        _setTokenURI(newId, _name);
        _tokenIds.increment();
        setApprovalForAll(contractAddress,true);
        
        emit NewTruffle(msg.sender, newId, _dna);
    }
    

    function createRandomTruffle(string memory _name) public payable {
        require(msg.value == fee);
        uint256 randDna = _createRandomDna(_name);
        uint256 newDna = randDna - randDna % 100 + randMod(20);
        _createTruffle(_name, newDna, 0, 0);
    }

    function getTruffle() public view returns (Truffle[] memory) {
        return truffles;
    }
    
    function getOwnerTruffles(address _owner) public view returns (Truffle[] memory) {
        Truffle[] memory result = new Truffle[](balanceOf(_owner));
        uint256 counter = 0;
        for (uint256 i = 0; i < truffles.length; i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = truffles[i];
                counter++;
            }
        }
        return result;
    }

    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }
    
    function updateFeeLevelUp(uint256 _feeLevelUp) external onlyOwner {
        levelUpFee = _feeLevelUp;
    }

    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // Actions
    modifier aboveLevel(uint _level, uint _TruffleId) {
        require(truffles[_TruffleId].level >= _level);
        _;
    }

    function levelUp(uint256 _TruffleId) external payable {
        require(msg.value == levelUpFee);
        require(ownerOf(_TruffleId) == msg.sender);
        Truffle storage truffle = truffles[_TruffleId];
        truffle.level++;
    }
    
    function updateName(uint256 _TruffleId, string calldata _newName) external aboveLevel(2, _TruffleId) {
        require(ownerOf(_TruffleId) == msg.sender);
        truffles[_TruffleId].name = _newName;
    }

    function randMod(uint _modulus) internal returns(uint) {//hàm số ngẫu nhiên
        randNonce++;
        uint256 randomNum2 = uint256(
        keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))
        );
        return randomNum2 % _modulus;
    }
    
    function _triggerCooldown(Truffle storage _truffle) internal {//hàm kich hoat cooldown
        if(_truffle.rarity >= 75){
            _truffle.readyTime = uint32(block.timestamp + cooldowns[0]);
        }if(_truffle.rarity >= 50 && _truffle.rarity < 75){
            _truffle.readyTime = uint32(block.timestamp + cooldowns[1]);
        }if(_truffle.rarity < 50){
            _truffle.readyTime = uint32(block.timestamp + cooldowns[2]);
        }
    }
    
    function _isReady(Truffle storage _truffle) internal view returns (bool) {
        return (_truffle.readyTime <= block.timestamp);
    }
    
    function BreedAndMultiply(uint _truffleId, uint _targetDna) public payable onlyOwner{
        require(msg.value >= feeBreed);
        Truffle storage myTruffle = truffles[_truffleId];
        Truffle storage myTargetDna = truffles[_targetDna];
        require(_isReady(myTruffle));
        require(_isReady(myTargetDna));
        uint8 dadId = uint8(myTargetDna.id);
        uint8 mumId = uint8(myTargetDna.id);
        
        uint8 valueRarity = uint8(myTruffle.dna % 100);
        uint8 valueRarity2 = uint8(myTargetDna.dna % 100);
        uint8 valueRarity3 = uint8(valueRarity + randMod(valueRarity) + valueRarity2 - randMod(valueRarity2)) /2;
        uint8 valueRarity4 = uint8(valueRarity3 * 15 / 100);
        
        uint number = valueRarity % 10;
        uint number2 = valueRarity2 % 10;
        uint newDna;
        uint rand = randMod(100);
        require(valueRarity < 99 && valueRarity2 < 99);
        if(valueRarity <= 60 && valueRarity2 <=60){
            if(valueRarity <= 20 && valueRarity2 <= 20){
                if(rand >= 50){
                    if(valueRarity>= valueRarity2){
                        uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number)/(5**number);
                        newDna = algorithm - algorithm % 100 + valueRarity + randMod(10);
                    }else{
                        uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number2)/(5**number2);
                        newDna = algorithm - algorithm % 100 + valueRarity2 + randMod(10);
                    }
                }else{
                    uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number)/(5**number);
                    newDna = algorithm - algorithm % 100 + valueRarity3;
                }
            }else{
                if(rand >= 60){
                    if(valueRarity>= valueRarity2){
                        uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number)/(5**number);
                        newDna = algorithm - algorithm % 100 + valueRarity + randMod(10);
                    }else{
                        uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number2)/(5**number2);
                        newDna = algorithm - algorithm % 100 + valueRarity2 + randMod(10);
                    }
                }else{
                    uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number)/(5**number);
                    newDna = algorithm - algorithm % 100 + valueRarity3 + valueRarity4;
                }
            }
        }if(valueRarity > 60 && valueRarity2 > 60){
            if(rand >= 70){
                if(valueRarity>= valueRarity2){
                    uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number)/(5**number);
                    newDna = algorithm - algorithm % 100 + valueRarity + randMod(8);
                }else{
                    uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number2)/(5**number2);
                    newDna = algorithm - algorithm % 100 + valueRarity2 + randMod(8);
                }
            }else{
                uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number)/(5**number);
                newDna = algorithm - algorithm % 100 + valueRarity3;
            }
        }if(valueRarity > 60 && valueRarity2 <= 60){
            if(rand >= 80){
                uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number)/(5**number);
                newDna = algorithm - algorithm % 100 + valueRarity + randMod(7);
            }else{
                uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number)/(5**number);
                newDna = algorithm - algorithm % 100 + valueRarity3;
            }
        }if(valueRarity <= 60 && valueRarity2 > 60){
            if(rand >= 80){
                uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number2)/(5**number2);
                newDna = algorithm - algorithm % 100 + valueRarity2 + randMod(8);
            }else{
                uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number2)/(5**number2);
                newDna = algorithm - algorithm % 100 + valueRarity3;
            }
        }
        
        _createTruffle("No name", newDna, dadId, mumId);
        _triggerCooldown(myTruffle);
        _triggerCooldown(myTargetDna);
    }
    
}

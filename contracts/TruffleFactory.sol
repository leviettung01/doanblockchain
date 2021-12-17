// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TruffleFactory is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter _tokenIds;

    address public admin;
    uint256 DNA_MOD = 10**16;
    uint256 fee = 0.025 ether;
    uint256 levelUpFee = 0.001 ether;
    uint256 breedFee = 0.01 ether;
    uint256 sellFee = 0.001 ether;
    uint256 randNonce = 0;
    uint256 lostTime = 30 minutes;
    uint256 quantilyLimit;
    uint32[3] public cooldowns = [
        uint32(12 hours),
        uint32(18 hours),
        uint32(1 days)
    ];

    mapping(uint256 => uint256) public tokenIdToPrice;
    mapping(uint256 => string) _tokenURIs;

    constructor() ERC721("Truffle", "TFT") {
        admin = msg.sender;
    }

    struct Truffle {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
        address currentOwner;
        address previousOwner;
        uint32 readyTime;
        uint8 dadId;
        uint8 mumId;
        uint256 sell;
        uint32 sellTime;
    }

    Truffle[] public truffles;

    event NewTruffle(address indexed owner, uint256 id, uint256 dna);
    event BuyTruffle(address _seller, address _buyer, uint256 _price);

    function getFee() public view returns (uint256) {
        return fee;
    }

    function getleveUpFee() public view returns (uint256) {
        return levelUpFee;
    }

    function getFeeBreed() public view returns (uint256) {
        return breedFee;
    }

    function getFeeSell() public view returns (uint256) {
        return sellFee;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _createRandomDna(string memory _mod)
        internal
        view
        returns (uint256)
    {
        uint256 randomNum = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, _mod))
        );
        return randomNum % DNA_MOD;
    }

    function _createTruffle(
        string memory _name,
        uint256 _dna,
        uint8 dadId,
        uint8 mumId
    ) internal {
        uint8 randRarity = uint8(_dna % 100);

        uint256 newId = _tokenIds.current();

        Truffle memory newTruffle = Truffle(
            _name,
            newId,
            _dna,
            0,
            randRarity,
            msg.sender,
            address(0),
            uint32(block.timestamp),
            dadId,
            mumId,
            0,
            0
        );
        truffles.push(newTruffle);
        _safeMint(msg.sender, newId);
        _tokenIds.increment();

        emit NewTruffle(msg.sender, newId, _dna);
    }

    function createRandomTruffleFree(string memory _name) public payable {
        require(msg.sender != address(0));
        uint256 counter = 0;
        for (uint256 i = 0; i < truffles.length; i++) {
            if (ownerOf(i) == msg.sender) {
                counter++;
            }
        }
        require(counter < 2);
        quantilyLimit = _tokenIds.current();
        require(quantilyLimit < 1000);
        uint256 randDna = _createRandomDna(_name);
        uint256 newDna = randDna - (randDna % 100) + randMod(5) + 1;
        _createTruffle(_name, newDna, 0, 0);
    }

    function createRandomTruffle(string memory _name) public payable{
        require(msg.sender != address(0));
        require(msg.value >= fee);
        quantilyLimit = _tokenIds.current();
        require(quantilyLimit < 1000);
        uint256 randDna = _createRandomDna(_name);
        uint256 newDna = randDna - randDna % 100 + randMod(20) + 10;
        _createTruffle(_name, newDna, 0, 0);
        payable(admin).transfer(fee);
    }

    function getTruffle() public view returns (Truffle[] memory) {
        return truffles;
    }

    function getOwnerTruffles(address _owner)
        public
        view
        returns (Truffle[] memory)
    {
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

    function randMod(uint256 _modulus) internal returns (uint256) {
        randNonce++;
        uint256 randomNum2 = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))
        );
        return randomNum2 % _modulus;
    }

    function updateFee(uint256 _fee) external onlyOwner{
        fee = _fee;
    }

    function updateFeeLevelUp(uint256 _feeLevelUp) external onlyOwner{
        levelUpFee = _feeLevelUp;
    }

    function updateFeeBreed(uint256 _feeBreed) external onlyOwner{
        breedFee = _feeBreed;
    }

    function updateFeeSell(uint256 _feeSell) external onlyOwner{
        sellFee = _feeSell;
    }

    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    modifier aboveLevel(uint256 _level, uint256 _TruffleId) {
        require(truffles[_TruffleId].level >= _level);
        _;
    }

    function levelUp(uint256 _TruffleId) external payable {
        require(msg.value == levelUpFee);
        require(ownerOf(_TruffleId) == msg.sender);
        Truffle storage truffle = truffles[_TruffleId];
        require(truffle.level < 20);
        require(truffle.sell == 0);
        truffle.level++;
        payable(admin).transfer(levelUpFee); 
    }

    function updateName(uint256 _TruffleId, string calldata _newName)
        external
        aboveLevel(2, _TruffleId)
    {
        require(ownerOf(_TruffleId) == msg.sender);
        Truffle storage truffle = truffles[_TruffleId];
        require(truffle.sell == 0);
        truffles[_TruffleId].name = _newName;
    }

    function _triggerCooldown(Truffle storage _truffle) internal {
        //hàm kich hoat cooldown
        uint8 levels = _truffle.level;
        if (_truffle.rarity >= 75) {
            for (uint8 i = 0; i <= 20; i++) {
                if (i == levels) {
                    _truffle.readyTime = uint32(
                        block.timestamp + cooldowns[0] - (lostTime * i)
                    );
                    break;
                }
            }
        }
        if (_truffle.rarity >= 50 && _truffle.rarity < 75) {
            for (uint8 i = 0; i <= 20; i++) {
                if (i == levels) {
                    _truffle.readyTime = uint32(
                        block.timestamp + cooldowns[1] - (lostTime * i)
                    );
                    break;
                }
            }
        }
        if (_truffle.rarity < 50) {
            for (uint8 i = 0; i <= 20; i++) {
                if (i == levels) {
                    _truffle.readyTime = uint32(
                        block.timestamp + cooldowns[2] - (lostTime * i)
                    );
                    break;
                }
            }
        }
    }

    function _isReady(Truffle storage _truffle) internal view returns (bool) {
        return (_truffle.readyTime <= block.timestamp);
    }

    function BreedAndMultiply(uint256 _truffleId, uint256 _targetDna)
        public
        payable
    {
        require(msg.value == breedFee);
        Truffle storage myTruffle = truffles[_truffleId];
        Truffle storage myTargetDna = truffles[_targetDna];
        require(_truffleId != _targetDna);
        require(ownerOf(_truffleId) == msg.sender);
        require(ownerOf(_targetDna) == msg.sender);
        require(_isReady(myTruffle),"Breed not ready !");
        require(_isReady(myTargetDna),"Breed not ready !");
        require(myTruffle.sell == 0,"The product being sold cannot be mated!");
        require(myTargetDna.sell == 0, "The product being sold cannot be mated!");
        
        uint8 dadId = uint8(myTruffle.id);
        uint8 mumId = uint8(myTargetDna.id);

        uint8 valueRarity = uint8(myTruffle.rarity);
        uint8 valueRarity2 = uint8(myTargetDna.rarity);
        uint8 valueRarity3 = uint8(
            valueRarity +
                randMod(valueRarity) +
                valueRarity2 -
                randMod(valueRarity2)
        ) / 2;
        uint8 valueRarity4 = uint8((valueRarity3 * 15) / 100);

        uint256 number = valueRarity % 10;
        uint256 number2 = valueRarity2 % 10;
        uint256 newDna;
        uint256 rand = randMod(100);
        require(valueRarity < 99 && valueRarity2 < 99);
        if(valueRarity <= 60 && valueRarity2 <= 60){
            if(valueRarity <= 30 && valueRarity2 <= 30){
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
            }if(valueRarity > 30 && valueRarity2 > 30){
                if(rand >= 55){
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
                newDna = algorithm - algorithm % 100 + valueRarity2 + randMod(7);
            }else{
                uint algorithm = (myTruffle.dna + myTargetDna.dna)*(4**number2)/(5**number2);
                newDna = algorithm - algorithm % 100 + valueRarity3;
            }
        }
        

        _createTruffle("New Truffle", newDna, dadId, mumId);
        _triggerCooldown(myTruffle);
        _triggerCooldown(myTargetDna);
        payable(admin).transfer(breedFee); 
    }
    function GiftToken(address _from, address _to, uint256 _tokenId) external {
        _transfer(_from, _to, _tokenId);
        tokenIdToPrice[_tokenId] = 0; // not for sale anymore
        Truffle storage myTruffle = truffles[_tokenId];
        myTruffle.sell = 0;
        myTruffle.sellTime = 0;
        // update the token's previous owner
        myTruffle.previousOwner = myTruffle.currentOwner;
        // update the token's current owner
        myTruffle.currentOwner = _to;
    }

    function allowBuy(uint256 _tokenId, uint256 _price) external payable {
        require(msg.sender == ownerOf(_tokenId), "Not owner of this token");
        require(msg.value >= sellFee,"Price must be equal to listing price");
        require(_price > 0, "Price must be at least 1 wei");
        Truffle storage myTokenID = truffles[_tokenId];
        require(_isReady(myTokenID), "Breed not reedy");
        tokenIdToPrice[_tokenId] = _price;
        Truffle storage myTruffle = truffles[_tokenId];
        myTruffle.sell = _price;
        myTruffle.sellTime = uint32(block.timestamp);
    }

    function disallowBuy(uint256 _tokenId) external {
        require(msg.sender == ownerOf(_tokenId), "Not owner of this token");
        tokenIdToPrice[_tokenId] = 0;
        Truffle storage myTruffle = truffles[_tokenId];
        myTruffle.sell = 0;
        myTruffle.sellTime = 0;
    }

    function buy(uint256 _tokenId) external payable {
        uint256 price = tokenIdToPrice[_tokenId];
        require(price > 0, "This token is not for sale");
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        address seller = ownerOf(_tokenId);

        _transfer(seller, msg.sender, _tokenId);
        tokenIdToPrice[_tokenId] = 0; // not for sale anymore
        Truffle storage myTruffle = truffles[_tokenId];
        myTruffle.sell = 0;
        myTruffle.sellTime = 0;
        payable(seller).transfer(msg.value); // send the ETH to the seller
        payable(admin).transfer(sellFee); 
        // update the token's previous owner
        myTruffle.previousOwner = myTruffle.currentOwner;
        // update the token's current owner
        myTruffle.currentOwner = msg.sender;

        emit BuyTruffle(seller, msg.sender, msg.value);
    }

    function changePrice(uint256 _tokenId, uint256 _newPrice) external {
        require(_exists(_tokenId));
        require(_newPrice > 0, "Price must be at least 1 wei");
        address seller = ownerOf(_tokenId);
        require(seller == msg.sender);
        tokenIdToPrice[_tokenId] = _newPrice;
        Truffle storage myTruffle = truffles[_tokenId];
        myTruffle.sell = _newPrice;
        myTruffle.sellTime = uint32(block.timestamp);
    }

    function getAllTruffleSell() public view returns (Truffle[] memory) {
        uint256 counter = 0;
        uint256 itemCount = 0;
        for (uint256 i = 0; i < truffles.length; i++) {
            if (truffles[i].sell > 0) {
                itemCount += 1;
            }
        }
        Truffle[] memory truffleSell = new Truffle[](itemCount);
        for (uint256 i = 0; i < truffles.length; i++) {
            if (truffles[i].sell > 0) {
                truffleSell[counter] = truffles[i];
                counter++;
            }
        }
        return truffleSell;
    }

    function getOwnerTrufflesSell(address _owner) public view returns (Truffle[] memory) {
        uint256 counter = 0;
        uint itemCount = 0;
        for (uint i = 0; i < truffles.length; i++) {
          if (ownerOf(i) == _owner && truffles[i].sell > 0) {
                itemCount += 1;
            }
        }
        Truffle[] memory result = new Truffle[](itemCount);
        for (uint256 i = 0; i < truffles.length; i++) {
            if (ownerOf(i) == _owner && truffles[i].sell > 0) {
                result[counter] = truffles[i];
                counter++;
            }
        }
        return result;
    }

    function dailyMission(uint256 _tokenId ) external {
        require(msg.sender == ownerOf(_tokenId), "Not owner of this token");
        Truffle storage myTruffle = truffles[_tokenId];
        require(myTruffle.rarity < 99);
        require(myTruffle.sell == 0);
        require(_isReady(myTruffle));
        uint8 valueRarity = uint8(myTruffle.dna % 100);
        uint rand = randMod(100);
        if(myTruffle.level < 20){
            if(valueRarity <= 10){
                if(rand <= 20)
                    myTruffle.level++;
            }else if(valueRarity > 10 && valueRarity <= 30){
                if(rand <= 35)
                    myTruffle.level++;
            }else if(valueRarity > 30 && valueRarity <= 50){
                if(rand <= 40)
                    myTruffle.level++;
            }else if(valueRarity > 50 && valueRarity <= 70){
                if(rand <= 45)
                    myTruffle.level++;
            }
            else if(valueRarity > 70 && valueRarity <= 90){
                if(rand <= 60)
                    myTruffle.level++;
            }
            else if(valueRarity > 90){
                if(rand <= 70)
                    myTruffle.level++;
            }
        }else{
            if(valueRarity <= 10){
                if(rand <= 20)
                    myTruffle.rarity++;
            }else if(valueRarity > 10 && valueRarity <= 30){
                if(rand <= 35)
                    myTruffle.rarity++;
            }else if(valueRarity > 30 && valueRarity <= 50){
                if(rand <= 40)
                    myTruffle.rarity++;
            }else if(valueRarity > 50 && valueRarity <= 70){
                if(rand <= 45)
                    myTruffle.rarity++;
            }
            else if(valueRarity > 70 && valueRarity <= 90){
                if(rand <= 60)
                    myTruffle.rarity++;
            }
            else if(valueRarity > 90){
                if(rand <= 70)
                    myTruffle.rarity++;
            }
        }

        myTruffle.readyTime = uint32(block.timestamp + 1 days);
    }
}
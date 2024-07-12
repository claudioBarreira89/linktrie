// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract YourContract is AccessControl {
	bytes32 public constant PROFILE_ADMIN_ROLE =
		keccak256("PROFILE_ADMIN_ROLE");

	struct UserProfile {
        address owner;
		string username;
		string profileUrl;
		mapping(string => string) links;
		string[] linkKeys;
	}
	mapping(string => address) public usernames;
	mapping(address => UserProfile) public userProfiles;

	event ProfileCreated(address indexed user, string username);
	event ProfileUpdated(address indexed user, string username);
	event LinkAdded(address indexed user, string key, string value);
	event LinkRemoved(address indexed user, string key);

	constructor() {
		_setupRole(PROFILE_ADMIN_ROLE, msg.sender);
	}

	function createProfile(string memory _username) public {
		require(usernames[_username] == address(0), "Username taken");
		require(bytes(_username).length > 0, "Username cannot be empty");
		// require(userProfiles[msg.sender].linkKeys.length == 0, "Profile already exists");
		usernames[_username] = msg.sender;
		UserProfile storage profile = userProfiles[msg.sender];
		profile.username = _username;
        profile.owner = msg.sender;

		emit ProfileCreated(msg.sender, _username);
	}

	function updateProfile(
		string memory _username,
		string memory _profileUrl
	) public {
		require(userProfiles[msg.sender].linkKeys.length == 0, "Name taken");
		UserProfile storage profile = userProfiles[msg.sender];
        require(profile.owner == msg.sender, "Only owner can update profile");
		profile.username = _username;
		profile.profileUrl = _profileUrl;

		emit ProfileUpdated(msg.sender, _username);
	}

	function addLink(string memory _key, string memory _value) public {
        // Require that user profile exists
        require(bytes(userProfiles[msg.sender].username).length > 0, "Profile does not exist");
		require(bytes(_key).length > 0, "Link key cannot be empty");
		require(bytes(_value).length > 0, "Link value cannot be empty");
		require(
			userProfiles[msg.sender].linkKeys.length < 10,
			"Maximum of 10 links allowed"
		);

		UserProfile storage profile = userProfiles[msg.sender];
        
		profile.links[_key] = _value;
		profile.linkKeys.push(_key);

		emit LinkAdded(msg.sender, _key, _value);
	}

	function removeLink(string memory _key) public {
		UserProfile storage profile = userProfiles[msg.sender];
		require(bytes(profile.links[_key]).length > 0, "Link not found");

		uint256 linkIndex = findLinkIndex(profile.linkKeys, _key);
		require(linkIndex < profile.linkKeys.length, "Link not found");

		for (uint256 i = linkIndex; i < profile.linkKeys.length - 1; i++) {
			profile.linkKeys[i] = profile.linkKeys[i + 1];
		}
		profile.linkKeys.pop();

		delete profile.links[_key];

		emit LinkRemoved(msg.sender, _key);
	}

	function getUserProfileByTrie(
		string memory _trie
	)
		public
		view
		returns (address, string memory, string memory, string[] memory, string[] memory)
	{
		UserProfile storage profile = userProfiles[usernames[_trie]];
		return (
            profile.owner,
			profile.username,
			profile.profileUrl,
			profile.linkKeys,
			getLinksValues(profile)
		);
	}

	function getUserProfile(
		address _user
	)
		public
		view
		returns (address, string memory, string memory, string[] memory, string[] memory)
	{
		UserProfile storage profile = userProfiles[_user];
		return (
            profile.owner,
			profile.username,
			profile.profileUrl,
			profile.linkKeys,
			getLinksValues(profile)
		);
	}

	function findLinkIndex(
		string[] memory keys,
		string memory key
	) internal pure returns (uint256) {
		for (uint256 i = 0; i < keys.length; i++) {
			if (
				keccak256(abi.encodePacked(keys[i])) ==
				keccak256(abi.encodePacked(key))
			) {
				return i;
			}
		}
		return keys.length;
	}

	function getLinksValues(
		UserProfile storage profile
	) internal view returns (string[] memory) {
		string[] memory values = new string[](profile.linkKeys.length);
		for (uint256 i = 0; i < profile.linkKeys.length; i++) {
			values[i] = profile.links[profile.linkKeys[i]];
		}
		return values;
	}

	modifier onlyProfileAdmin() {
		require(
			hasRole(PROFILE_ADMIN_ROLE, msg.sender),
			"Caller is not a profile admin"
		);
		_;
	}
}

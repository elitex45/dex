// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Dai = await ethers.getContractFactory("Dai");
  const Dex = await ethers.getContractFactory("Dex");
  const Drupee = await ethers.getContractFactory("Drupee");


  const dai_ref = await Dai.deploy();
  const drupee_ref = await Drupee.deploy();
  const dex_ref = await Dex.deploy(drupee_ref.address, dai_ref.address);

  await dai_ref.deployed();
  await drupee_ref.deployed();
  await dex_ref.deployed();

  // let provider = ethers.getDefaultProvider();
  // let privateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';
  // let wallet = new ethers.Wallet(privateKey, provider);
  // const TokenArtifact = artifacts.readArtifactSync("Drupee");
  // let contract = new ethers.Contract(drupee_ref.address, TokenArtifact.abi, wallet);
  // let res = await contract.mint_drupee(dex_ref.address);
  // let result = res.wait();


  // We also save the contract's artifacts and address in the frontend directory
  // saveFrontendFiles(drupee_ref, "drupee_ref", "dRupee");
  saveFrontendFiles(dai_ref, "Dai", "Dai");
  saveFrontendFiles(dex_ref, "Dex", "Dex");
  saveFrontendFiles(drupee_ref, "Drupee", "Drupee");

  console.log("Dex address:", dex_ref.address);



}

function saveFrontendFiles(token, name, original) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/" + name + "-address.json",
    JSON.stringify({ name: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync(original);

  fs.writeFileSync(
    contractsDir + "/" + original + ".json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
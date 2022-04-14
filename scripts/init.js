
const TokenArtifact = require("../frontend/src/contracts/Dex.json");
const contractAddress = require("../frontend/src/contracts/Dex-address.json")
const Drupee = require("../frontend/src/contracts/Drupee.json");
const DrupeeAdd = require("../frontend/src/contracts/Drupee-address.json")

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    let dexcon = new ethers.Contract(
        contractAddress.name,
        TokenArtifact.abi,
        deployer
    );

    let drucon = new ethers.Contract(
        DrupeeAdd.name,
        Drupee.abi,
        deployer
    );

    await drucon.approve(contractAddress.name, 1000000);

    await dexcon.init_drupee_eth(10000, { value: 10000 });

    console.log("Done")

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

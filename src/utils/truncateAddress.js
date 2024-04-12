export function truncateAddress(address) {

    // if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    //     throw new Error("Invalid Ethereum address format");
    // }

    const firstFour = address.substring(0, 6); 
    const lastFour = address.substring(38); 

    const truncatedAddress = `${firstFour}............${lastFour}`;

    return truncatedAddress;
}
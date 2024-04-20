export const  generateTokenWithAddress = (walletAddress)  => {
    // Check if the wallet address is a valid string
    if (typeof walletAddress !== 'string') {
        throw new Error('Input must be a string representing a wallet address');
    }

    // Extract the first two and last six characters of the wallet address
    const firstTwo = walletAddress.substring(0, 2);
    const lastSix = walletAddress.substring(walletAddress.length - 6);

    // Concatenate the extracted parts
    const concatenatedParts = firstTwo + lastSix;

    return concatenatedParts;
}



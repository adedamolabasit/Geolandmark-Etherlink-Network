export function truncateWalletAddress(address) {
    // Check if address is valid and has more than 12 characters
    if (typeof address !== 'string' || address.length <= 12) {
      return address; // Return original address if it's not valid or short
    }
  
    const firstThree = address.substring(0, 3); // Get first three characters
    const lastThree = address.substring(address.length - 3); // Get last three characters
  
    // Create truncated address with dots in between
    const truncatedAddress = `${firstThree}...........${lastThree}`;
  
    return truncatedAddress;
  }
  
  
// Import the Nigerian states data from your JSON file
import nigerianStatesData from "../data/nigerian-states.json"

// Get all states
export const getAllStates = () => {
    return Object.keys(nigerianStatesData)
}

// Get local governments by state
export const getCitiesByState = (state) => {
    return nigerianStatesData[state] || []
}

// Format address for geocoding - improved for better geocoding results
export const getFormattedAddress = (location) => {
    if (!location) return ""
    const { state, city, address } = location

    // Format the address to be more geocoding-friendly
    // Include the city/LGA name only once to avoid duplication
    if (address.includes(city)) {
        return `${address}, ${state}, Nigeria`
    } else {
        return `${address}, ${city}, ${state}, Nigeria`
    }
}

// Get coordinates for major Nigerian cities (fallback)
export const getMajorCityCoordinates = (state, city) => {
    // Mapping of major cities to their coordinates
    const cityCoordinates = {
        // Major cities in each state with their coordinates
        Lagos: { lat: 6.5244, lng: 3.3792 },
        Abuja: { lat: 9.0765, lng: 7.3986 },
        Kano: { lat: 12.0022, lng: 8.592 },
        Ibadan: { lat: 7.3775, lng: 3.947 },
        "Port Harcourt": { lat: 4.8156, lng: 7.0498 },
        "Benin City": { lat: 6.335, lng: 5.6037 },
        Kaduna: { lat: 10.5222, lng: 7.4383 },
        Enugu: { lat: 6.4584, lng: 7.5464 },
        Aba: { lat: 5.1167, lng: 7.3667 },
        Onitsha: { lat: 6.1667, lng: 6.7833 },
        Maiduguri: { lat: 11.8333, lng: 13.15 },
        Uyo: { lat: 5.0333, lng: 7.9167 },
        Umuahia: { lat: 5.5167, lng: 7.4833 },
        Calabar: { lat: 4.95, lng: 8.325 },
        Abeokuta: { lat: 7.1583, lng: 3.3464 },
        Ilorin: { lat: 8.5, lng: 4.55 },
        Jos: { lat: 9.9167, lng: 8.8583 },
        Owerri: { lat: 5.4833, lng: 7.0333 },
        Warri: { lat: 5.5167, lng: 5.75 },
        Akure: { lat: 7.25, lng: 5.195 },
        Bauchi: { lat: 10.3103, lng: 9.8437 },
        Asaba: { lat: 6.2, lng: 6.7333 },
        Yola: { lat: 9.2333, lng: 12.4833 },
        Makurdi: { lat: 7.7333, lng: 8.5333 },
        Sokoto: { lat: 13.0622, lng: 5.2339 },
        Lokoja: { lat: 7.8, lng: 6.7333 },
        Gombe: { lat: 10.284, lng: 11.167 },
        Yenagoa: { lat: 4.9267, lng: 6.2676 },
        Abakaliki: { lat: 6.325, lng: 8.1167 },
        Jalingo: { lat: 8.9, lng: 11.3667 },
        "Ado Ekiti": { lat: 7.6167, lng: 5.2167 },
        Osogbo: { lat: 7.7667, lng: 4.5667 },
        Dutse: { lat: 11.8, lng: 9.35 },
        "Birnin Kebbi": { lat: 12.45, lng: 4.197 },
        Minna: { lat: 9.6139, lng: 6.5569 },
        Damaturu: { lat: 11.747, lng: 11.966 },
        Lafia: { lat: 8.4833, lng: 8.5167 },
        Gusau: { lat: 12.1667, lng: 6.6667 },
    }

    // Try to find the city directly
    if (cityCoordinates[city]) {
        return cityCoordinates[city]
    }

    // Try to find the state capital or a major city in the state
    const stateCapitals = {
        Abia: "Umuahia",
        Adamawa: "Yola",
        "Akwa Ibom": "Uyo",
        Anambra: "Awka",
        Bauchi: "Bauchi",
        Bayelsa: "Yenagoa",
        Benue: "Makurdi",
        Borno: "Maiduguri",
        "Cross River": "Calabar",
        Delta: "Asaba",
        Ebonyi: "Abakaliki",
        Edo: "Benin City",
        Ekiti: "Ado Ekiti",
        Enugu: "Enugu",
        FCT: "Abuja",
        Gombe: "Gombe",
        Imo: "Owerri",
        Jigawa: "Dutse",
        Kaduna: "Kaduna",
        Kano: "Kano",
        Katsina: "Katsina",
        Kebbi: "Birnin Kebbi",
        Kogi: "Lokoja",
        Kwara: "Ilorin",
        Lagos: "Lagos",
        Nasarawa: "Lafia",
        Niger: "Minna",
        Ogun: "Abeokuta",
        Ondo: "Akure",
        Osun: "Osogbo",
        Oyo: "Ibadan",
        Plateau: "Jos",
        Rivers: "Port Harcourt",
        Sokoto: "Sokoto",
        Taraba: "Jalingo",
        Yobe: "Damaturu",
        Zamfara: "Gusau",
    }

    const stateCapital = stateCapitals[state]
    if (stateCapital && cityCoordinates[stateCapital]) {
        return cityCoordinates[stateCapital]
    }

    // Default to a central point in Nigeria if no match is found
    return { lat: 9.082, lng: 8.6753 } // Center of Nigeria
}


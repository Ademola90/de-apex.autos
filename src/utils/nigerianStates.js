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

// Format address for geocoding - improved for better geocoding results
export const getMajorCityCoordinates = async (state, city) => {
    // Hardcoded coordinates - your existing data
    const hardcoded = {
        // Federal Capital Territory
        "Abuja": { lat: 9.0765, lng: 7.3986 },
        "Gwagwalada": { lat: 8.9431, lng: 7.0803 },
        "Kuje": { lat: 8.8792, lng: 7.2276 },
        "Bwari": { lat: 9.2833, lng: 7.3833 },

        // Abia State
        "Umuahia": { lat: 5.5167, lng: 7.4833 },
        "Aba": { lat: 5.1167, lng: 7.3667 },
        "Ohafia": { lat: 5.6167, lng: 7.8333 },
        "Arochukwu": { lat: 5.3833, lng: 7.9167 },

        // Adamawa State
        "Yola": { lat: 9.2333, lng: 12.4833 },
        "Mubi": { lat: 10.2667, lng: 13.2667 },
        "Numan": { lat: 9.4667, lng: 12.0333 },
        "Ganye": { lat: 8.4333, lng: 12.0500 },

        // Akwa Ibom State
        "Uyo": { lat: 5.0333, lng: 7.9167 },
        "Eket": { lat: 4.6500, lng: 7.9167 },
        "Ikot Ekpene": { lat: 5.1667, lng: 7.7167 },
        "Oron": { lat: 4.8167, lng: 8.2333 },

        // Anambra State
        "Awka": { lat: 6.2101, lng: 7.0741 },
        "Onitsha": { lat: 6.1667, lng: 6.7833 },
        "Nnewi": { lat: 6.0167, lng: 6.9167 },
        "Aguata": { lat: 6.0167, lng: 7.0833 },

        // Bauchi State
        "Bauchi": { lat: 10.3103, lng: 9.8437 },
        "Azare": { lat: 11.6786, lng: 10.1947 },
        "Misau": { lat: 11.3167, lng: 10.4667 },
        "Jama'are": { lat: 11.6667, lng: 9.9333 },

        // Bayelsa State
        "Yenagoa": { lat: 4.9267, lng: 6.2676 },
        "Brass": { lat: 4.3167, lng: 6.2333 },
        "Sagbama": { lat: 5.1667, lng: 6.2000 },
        "Ogbia": { lat: 4.6833, lng: 6.2667 },

        // Benue State
        "Makurdi": { lat: 7.7333, lng: 8.5333 },
        "Gboko": { lat: 7.3167, lng: 9.0167 },
        "Otukpo": { lat: 7.2000, lng: 8.1333 },
        "Katsina-Ala": { lat: 7.1667, lng: 9.2833 },

        // Borno State
        "Maiduguri": { lat: 11.8333, lng: 13.150 },
        "Bama": { lat: 11.5214, lng: 13.6894 },
        "Dikwa": { lat: 12.0333, lng: 13.9167 },
        "Biue": { lat: 10.7758, lng: 12.9844 },

        // Cross River State
        "Calabar": { lat: 4.9500, lng: 8.3250 },
        "Ogoja": { lat: 6.6500, lng: 8.8000 },
        "Ikom": { lat: 5.9667, lng: 8.7167 },
        "Obudu": { lat: 6.4333, lng: 9.3667 },

        // Delta State
        "Asaba": { lat: 6.2000, lng: 6.7333 },
        "Warri": { lat: 5.5167, lng: 5.7500 },
        "Sapele": { lat: 5.8941, lng: 5.6767 },
        "Agbor": { lat: 6.2500, lng: 6.2000 },

        // Ebonyi State
        "Abakaliki": { lat: 6.3250, lng: 8.1167 },
        "Afikpo": { lat: 5.8833, lng: 7.9333 },
        "Onueke": { lat: 6.2667, lng: 8.0500 },
        "Ishieke": { lat: 6.3833, lng: 8.1000 },

        // Edo State
        "Benin City": { lat: 6.3350, lng: 5.6037 },
        "Auchi": { lat: 7.0667, lng: 6.2667 },
        "Ekpoma": { lat: 6.7500, lng: 6.1333 },
        "Igueben": { lat: 6.6167, lng: 6.2833 },

        // Ekiti State
        "Ado Ekiti": { lat: 7.6167, lng: 5.2167 },
        "Ikere-Ekiti": { lat: 7.5000, lng: 5.2333 },
        "Ise-Ekiti": { lat: 7.4667, lng: 5.4167 },
        "Emure-Ekiti": { lat: 7.4500, lng: 5.4667 },

        // Enugu State
        "Enugu": { lat: 6.4584, lng: 7.5464 },
        "Nsukka": { lat: 6.8567, lng: 7.3958 },
        "Agbani": { lat: 6.3000, lng: 7.5500 },
        "Udi": { lat: 6.3167, lng: 7.4333 },

        // Gombe State
        "Gombe": { lat: 10.2840, lng: 11.1670 },
        "Kaltungo": { lat: 9.8167, lng: 11.3167 },
        "Bajoga": { lat: 10.8511, lng: 11.4303 },
        "Dukku": { lat: 10.8231, lng: 10.7728 },

        // Imo State
        "Owerri": { lat: 5.4833, lng: 7.0333 },
        "Orlu": { lat: 5.7833, lng: 7.0333 },
        "Okigwe": { lat: 5.8167, lng: 7.3500 },
        "Oguta": { lat: 5.7167, lng: 6.8000 },

        // Jigawa State
        "Dutse": { lat: 11.8000, lng: 9.3500 },
        "Hadejia": { lat: 12.4500, lng: 10.0400 },
        "Birnin Kudu": { lat: 11.4500, lng: 9.4833 },
        "Gumel": { lat: 12.6333, lng: 9.3833 },

        // Kaduna State
        "Kaduna": { lat: 10.5222, lng: 7.4383 },
        "Zaria": { lat: 11.0667, lng: 7.7000 },
        "Kafanchan": { lat: 9.5833, lng: 8.3000 },
        "Kagoro": { lat: 9.6000, lng: 8.3833 },

        // Kano State
        "Kano": { lat: 12.0022, lng: 8.5920 },
        "Bichi": { lat: 12.2333, lng: 8.2500 },
        "Gaya": { lat: 11.8667, lng: 9.0167 },
        "Rano": { lat: 11.5500, lng: 8.5833 },

        // Katsina State
        "Katsina": { lat: 12.9889, lng: 7.6000 },
        "Daura": { lat: 13.0333, lng: 8.3167 },
        "Funtua": { lat: 11.5333, lng: 7.3167 },
        "Malumfashi": { lat: 11.7833, lng: 7.6167 },

        // Kebbi State
        "Birnin Kebbi": { lat: 12.4500, lng: 4.1970 },
        "Argungu": { lat: 12.7500, lng: 4.5167 },
        "Yelwa": { lat: 10.8333, lng: 4.7500 },
        "Zuru": { lat: 11.4333, lng: 5.2333 },

        // Kogi State
        "Lokoja": { lat: 7.8000, lng: 6.7333 },
        "Okene": { lat: 7.5500, lng: 6.2333 },
        "Idah": { lat: 7.1000, lng: 6.7333 },
        "Kabba": { lat: 7.8333, lng: 6.0667 },

        // Kwara State
        "Ilorin": { lat: 8.5000, lng: 4.5500 },
        "Offa": { lat: 8.1500, lng: 4.7167 },
        "Jebba": { lat: 9.1167, lng: 4.8167 },
        "Patigi": { lat: 8.7333, lng: 5.7500 },

        // Lagos State
        "Lagos": { lat: 6.5244, lng: 3.3792 },
        "Ikeja": { lat: 6.5965, lng: 3.3421 },
        "Badagry": { lat: 6.4167, lng: 2.8833 },
        "Epe": { lat: 6.5833, lng: 3.9833 },

        // Nasarawa State
        "Lafia": { lat: 8.4833, lng: 8.5167 },
        "Keffi": { lat: 8.8500, lng: 7.8667 },
        "Akwanga": { lat: 8.9167, lng: 8.3833 },
        "Nassarawa": { lat: 8.5333, lng: 7.7167 },

        // Niger State
        "Minna": { lat: 9.6139, lng: 6.5569 },
        "Bida": { lat: 9.0833, lng: 6.0167 },
        "Suleja": { lat: 9.1833, lng: 7.1833 },
        "Kontagora": { lat: 10.4000, lng: 5.4667 },

        // Ogun State
        "Abeokuta": { lat: 7.1583, lng: 3.3464 },
        "Ijebu-Ode": { lat: 6.8167, lng: 3.9167 },
        "Sagamu": { lat: 6.8333, lng: 3.6500 },
        "Ilaro": { lat: 6.8833, lng: 3.0167 },

        // Ondo State
        "Akure": { lat: 7.2500, lng: 5.1950 },
        "Ondo": { lat: 7.1000, lng: 4.8333 },
        "Owo": { lat: 7.1833, lng: 5.5833 },
        "Okitipupa": { lat: 6.5000, lng: 4.7833 },

        // Osun State
        "Osogbo": { lat: 7.7667, lng: 4.5667 },
        "Ilesa": { lat: 7.6167, lng: 4.7167 },
        "Ikire": { lat: 7.3667, lng: 4.1833 },
        "Ede": { lat: 7.7333, lng: 4.4333 },

        // Oyo State
        "Ibadan": { lat: 7.3775, lng: 3.9470 },
        "Ogbomosho": { lat: 8.1333, lng: 4.2667 },
        "Oyo": { lat: 7.8500, lng: 3.9333 },
        "Saki": { lat: 8.6667, lng: 3.3833 },

        // Plateau State
        "Jos": { lat: 9.9167, lng: 8.8583 },
        "Bukuru": { lat: 9.7833, lng: 8.8667 },
        "Shendam": { lat: 8.8833, lng: 9.5333 },
        "Wase": { lat: 9.1000, lng: 9.9500 },

        // Rivers State
        "Port Harcourt": { lat: 4.8156, lng: 7.0498 },
        "Bonny": { lat: 4.4333, lng: 7.1667 },
        "Okrika": { lat: 4.7333, lng: 7.0833 },
        "Degema": { lat: 4.7500, lng: 6.7667 },

        // Sokoto State
        "Sokoto": { lat: 13.0622, lng: 5.2339 },
        "Tambuwal": { lat: 12.4000, lng: 4.6500 },
        "Gwadabawa": { lat: 13.2167, lng: 5.2500 },
        "Wurno": { lat: 13.3000, lng: 5.4333 },

        // Taraba State
        "Jalingo": { lat: 8.9000, lng: 11.3667 },
        "Wukari": { lat: 7.8500, lng: 9.7833 },
        "Bali": { lat: 7.8500, lng: 10.7833 },
        "Takum": { lat: 7.2500, lng: 9.9833 },

        // Yobe State
        "Damaturu": { lat: 11.7470, lng: 11.9660 },
        "Potiskum": { lat: 11.7083, lng: 11.0806 },
        "Gashua": { lat: 12.8667, lng: 11.0333 },
        "Nguru": { lat: 12.8833, lng: 10.4500 },

        // Zamfara State
        "Gusau": { lat: 12.1667, lng: 6.6667 },
        "Kaura Namoda": { lat: 12.6000, lng: 6.5833 },
        "Talata Mafara": { lat: 12.5667, lng: 6.0667 },
        "Anka": { lat: 12.1167, lng: 5.9167 }
    };

    // 1. Check hardcoded first
    if (hardcoded[city]) {
        return hardcoded[city];
    }

    // 2. Try geocoding API
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)},${encodeURIComponent(state)},Nigeria`,
            {
                headers: {
                    "User-Agent": "YourAppName/1.0 (your@email.com)"
                }
            }
        );

        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
    } catch (error) {
        console.error("Geocoding API error:", error);
    }

    // 3. Fallback to state capital
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
    };

    const stateCapital = stateCapitals[state];
    if (stateCapital && hardcoded[stateCapital]) {
        return hardcoded[stateCapital];
    }

    // 4. Final fallback to Nigeria center
    return { lat: 9.082, lng: 8.6753 };
}


// // Get coordinates for major Nigerian cities (fallback)
// export const getMajorCityCoordinates = (state, city) => {
//     // Mapping of major cities to their coordinates

//     const cityCoordinates = {
// // Federal Capital Territory
// "Abuja": { lat: 9.0765, lng: 7.3986 },
// "Gwagwalada": { lat: 8.9431, lng: 7.0803 },
// "Kuje": { lat: 8.8792, lng: 7.2276 },
// "Bwari": { lat: 9.2833, lng: 7.3833 },

// // Abia State
// "Umuahia": { lat: 5.5167, lng: 7.4833 },
// "Aba": { lat: 5.1167, lng: 7.3667 },
// "Ohafia": { lat: 5.6167, lng: 7.8333 },
// "Arochukwu": { lat: 5.3833, lng: 7.9167 },

// // Adamawa State
// "Yola": { lat: 9.2333, lng: 12.4833 },
// "Mubi": { lat: 10.2667, lng: 13.2667 },
// "Numan": { lat: 9.4667, lng: 12.0333 },
// "Ganye": { lat: 8.4333, lng: 12.0500 },

// // Akwa Ibom State
// "Uyo": { lat: 5.0333, lng: 7.9167 },
// "Eket": { lat: 4.6500, lng: 7.9167 },
// "Ikot Ekpene": { lat: 5.1667, lng: 7.7167 },
// "Oron": { lat: 4.8167, lng: 8.2333 },

// // Anambra State
// "Awka": { lat: 6.2101, lng: 7.0741 },
// "Onitsha": { lat: 6.1667, lng: 6.7833 },
// "Nnewi": { lat: 6.0167, lng: 6.9167 },
// "Aguata": { lat: 6.0167, lng: 7.0833 },

// // Bauchi State
// "Bauchi": { lat: 10.3103, lng: 9.8437 },
// "Azare": { lat: 11.6786, lng: 10.1947 },
// "Misau": { lat: 11.3167, lng: 10.4667 },
// "Jama'are": { lat: 11.6667, lng: 9.9333 },

// // Bayelsa State
// "Yenagoa": { lat: 4.9267, lng: 6.2676 },
// "Brass": { lat: 4.3167, lng: 6.2333 },
// "Sagbama": { lat: 5.1667, lng: 6.2000 },
// "Ogbia": { lat: 4.6833, lng: 6.2667 },

// // Benue State
// "Makurdi": { lat: 7.7333, lng: 8.5333 },
// "Gboko": { lat: 7.3167, lng: 9.0167 },
// "Otukpo": { lat: 7.2000, lng: 8.1333 },
// "Katsina-Ala": { lat: 7.1667, lng: 9.2833 },

// // Borno State
// "Maiduguri": { lat: 11.8333, lng: 13.150 },
// "Bama": { lat: 11.5214, lng: 13.6894 },
// "Dikwa": { lat: 12.0333, lng: 13.9167 },
// "Biue": { lat: 10.7758, lng: 12.9844 },

// // Cross River State
// "Calabar": { lat: 4.9500, lng: 8.3250 },
// "Ogoja": { lat: 6.6500, lng: 8.8000 },
// "Ikom": { lat: 5.9667, lng: 8.7167 },
// "Obudu": { lat: 6.4333, lng: 9.3667 },

// // Delta State
// "Asaba": { lat: 6.2000, lng: 6.7333 },
// "Warri": { lat: 5.5167, lng: 5.7500 },
// "Sapele": { lat: 5.8941, lng: 5.6767 },
// "Agbor": { lat: 6.2500, lng: 6.2000 },

// // Ebonyi State
// "Abakaliki": { lat: 6.3250, lng: 8.1167 },
// "Afikpo": { lat: 5.8833, lng: 7.9333 },
// "Onueke": { lat: 6.2667, lng: 8.0500 },
// "Ishieke": { lat: 6.3833, lng: 8.1000 },

// // Edo State
// "Benin City": { lat: 6.3350, lng: 5.6037 },
// "Auchi": { lat: 7.0667, lng: 6.2667 },
// "Ekpoma": { lat: 6.7500, lng: 6.1333 },
// "Igueben": { lat: 6.6167, lng: 6.2833 },

// // Ekiti State
// "Ado Ekiti": { lat: 7.6167, lng: 5.2167 },
// "Ikere-Ekiti": { lat: 7.5000, lng: 5.2333 },
// "Ise-Ekiti": { lat: 7.4667, lng: 5.4167 },
// "Emure-Ekiti": { lat: 7.4500, lng: 5.4667 },

// // Enugu State
// "Enugu": { lat: 6.4584, lng: 7.5464 },
// "Nsukka": { lat: 6.8567, lng: 7.3958 },
// "Agbani": { lat: 6.3000, lng: 7.5500 },
// "Udi": { lat: 6.3167, lng: 7.4333 },

// // Gombe State
// "Gombe": { lat: 10.2840, lng: 11.1670 },
// "Kaltungo": { lat: 9.8167, lng: 11.3167 },
// "Bajoga": { lat: 10.8511, lng: 11.4303 },
// "Dukku": { lat: 10.8231, lng: 10.7728 },

// // Imo State
// "Owerri": { lat: 5.4833, lng: 7.0333 },
// "Orlu": { lat: 5.7833, lng: 7.0333 },
// "Okigwe": { lat: 5.8167, lng: 7.3500 },
// "Oguta": { lat: 5.7167, lng: 6.8000 },

// // Jigawa State
// "Dutse": { lat: 11.8000, lng: 9.3500 },
// "Hadejia": { lat: 12.4500, lng: 10.0400 },
// "Birnin Kudu": { lat: 11.4500, lng: 9.4833 },
// "Gumel": { lat: 12.6333, lng: 9.3833 },

// // Kaduna State
// "Kaduna": { lat: 10.5222, lng: 7.4383 },
// "Zaria": { lat: 11.0667, lng: 7.7000 },
// "Kafanchan": { lat: 9.5833, lng: 8.3000 },
// "Kagoro": { lat: 9.6000, lng: 8.3833 },

// // Kano State
// "Kano": { lat: 12.0022, lng: 8.5920 },
// "Bichi": { lat: 12.2333, lng: 8.2500 },
// "Gaya": { lat: 11.8667, lng: 9.0167 },
// "Rano": { lat: 11.5500, lng: 8.5833 },

// // Katsina State
// "Katsina": { lat: 12.9889, lng: 7.6000 },
// "Daura": { lat: 13.0333, lng: 8.3167 },
// "Funtua": { lat: 11.5333, lng: 7.3167 },
// "Malumfashi": { lat: 11.7833, lng: 7.6167 },

// // Kebbi State
// "Birnin Kebbi": { lat: 12.4500, lng: 4.1970 },
// "Argungu": { lat: 12.7500, lng: 4.5167 },
// "Yelwa": { lat: 10.8333, lng: 4.7500 },
// "Zuru": { lat: 11.4333, lng: 5.2333 },

// // Kogi State
// "Lokoja": { lat: 7.8000, lng: 6.7333 },
// "Okene": { lat: 7.5500, lng: 6.2333 },
// "Idah": { lat: 7.1000, lng: 6.7333 },
// "Kabba": { lat: 7.8333, lng: 6.0667 },

// // Kwara State
// "Ilorin": { lat: 8.5000, lng: 4.5500 },
// "Offa": { lat: 8.1500, lng: 4.7167 },
// "Jebba": { lat: 9.1167, lng: 4.8167 },
// "Patigi": { lat: 8.7333, lng: 5.7500 },

// // Lagos State
// "Lagos": { lat: 6.5244, lng: 3.3792 },
// "Ikeja": { lat: 6.5965, lng: 3.3421 },
// "Badagry": { lat: 6.4167, lng: 2.8833 },
// "Epe": { lat: 6.5833, lng: 3.9833 },

// // Nasarawa State
// "Lafia": { lat: 8.4833, lng: 8.5167 },
// "Keffi": { lat: 8.8500, lng: 7.8667 },
// "Akwanga": { lat: 8.9167, lng: 8.3833 },
// "Nassarawa": { lat: 8.5333, lng: 7.7167 },

// // Niger State
// "Minna": { lat: 9.6139, lng: 6.5569 },
// "Bida": { lat: 9.0833, lng: 6.0167 },
// "Suleja": { lat: 9.1833, lng: 7.1833 },
// "Kontagora": { lat: 10.4000, lng: 5.4667 },

// // Ogun State
// "Abeokuta": { lat: 7.1583, lng: 3.3464 },
// "Ijebu-Ode": { lat: 6.8167, lng: 3.9167 },
// "Sagamu": { lat: 6.8333, lng: 3.6500 },
// "Ilaro": { lat: 6.8833, lng: 3.0167 },

// // Ondo State
// "Akure": { lat: 7.2500, lng: 5.1950 },
// "Ondo": { lat: 7.1000, lng: 4.8333 },
// "Owo": { lat: 7.1833, lng: 5.5833 },
// "Okitipupa": { lat: 6.5000, lng: 4.7833 },

// // Osun State
// "Osogbo": { lat: 7.7667, lng: 4.5667 },
// "Ilesa": { lat: 7.6167, lng: 4.7167 },
// "Ikire": { lat: 7.3667, lng: 4.1833 },
// "Ede": { lat: 7.7333, lng: 4.4333 },

// // Oyo State
// "Ibadan": { lat: 7.3775, lng: 3.9470 },
// "Ogbomosho": { lat: 8.1333, lng: 4.2667 },
// "Oyo": { lat: 7.8500, lng: 3.9333 },
// "Saki": { lat: 8.6667, lng: 3.3833 },

// // Plateau State
// "Jos": { lat: 9.9167, lng: 8.8583 },
// "Bukuru": { lat: 9.7833, lng: 8.8667 },
// "Shendam": { lat: 8.8833, lng: 9.5333 },
// "Wase": { lat: 9.1000, lng: 9.9500 },

// // Rivers State
// "Port Harcourt": { lat: 4.8156, lng: 7.0498 },
// "Bonny": { lat: 4.4333, lng: 7.1667 },
// "Okrika": { lat: 4.7333, lng: 7.0833 },
// "Degema": { lat: 4.7500, lng: 6.7667 },

// // Sokoto State
// "Sokoto": { lat: 13.0622, lng: 5.2339 },
// "Tambuwal": { lat: 12.4000, lng: 4.6500 },
// "Gwadabawa": { lat: 13.2167, lng: 5.2500 },
// "Wurno": { lat: 13.3000, lng: 5.4333 },

// // Taraba State
// "Jalingo": { lat: 8.9000, lng: 11.3667 },
// "Wukari": { lat: 7.8500, lng: 9.7833 },
// "Bali": { lat: 7.8500, lng: 10.7833 },
// "Takum": { lat: 7.2500, lng: 9.9833 },

// // Yobe State
// "Damaturu": { lat: 11.7470, lng: 11.9660 },
// "Potiskum": { lat: 11.7083, lng: 11.0806 },
// "Gashua": { lat: 12.8667, lng: 11.0333 },
// "Nguru": { lat: 12.8833, lng: 10.4500 },

// // Zamfara State
// "Gusau": { lat: 12.1667, lng: 6.6667 },
// "Kaura Namoda": { lat: 12.6000, lng: 6.5833 },
// "Talata Mafara": { lat: 12.5667, lng: 6.0667 },
// "Anka": { lat: 12.1167, lng: 5.9167 }
//     };



//     // Try to find the city directly
//     if (cityCoordinates[city]) {
//         return cityCoordinates[city]
//     }

//     // Try to find the state capital or a major city in the state
//     const stateCapitals = {
// Abia: "Umuahia",
// Adamawa: "Yola",
// "Akwa Ibom": "Uyo",
// Anambra: "Awka",
// Bauchi: "Bauchi",
// Bayelsa: "Yenagoa",
// Benue: "Makurdi",
// Borno: "Maiduguri",
// "Cross River": "Calabar",
// Delta: "Asaba",
// Ebonyi: "Abakaliki",
// Edo: "Benin City",
// Ekiti: "Ado Ekiti",
// Enugu: "Enugu",
// FCT: "Abuja",
// Gombe: "Gombe",
// Imo: "Owerri",
// Jigawa: "Dutse",
// Kaduna: "Kaduna",
// Kano: "Kano",
// Katsina: "Katsina",
// Kebbi: "Birnin Kebbi",
// Kogi: "Lokoja",
// Kwara: "Ilorin",
// Lagos: "Lagos",
// Nasarawa: "Lafia",
// Niger: "Minna",
// Ogun: "Abeokuta",
// Ondo: "Akure",
// Osun: "Osogbo",
// Oyo: "Ibadan",
// Plateau: "Jos",
// Rivers: "Port Harcourt",
// Sokoto: "Sokoto",
// Taraba: "Jalingo",
// Yobe: "Damaturu",
// Zamfara: "Gusau",
//     }

//     const stateCapital = stateCapitals[state]
//     if (stateCapital && cityCoordinates[stateCapital]) {
//         return cityCoordinates[stateCapital]
//     }

//     // Default to a central point in Nigeria if no match is found
//     return { lat: 9.082, lng: 8.6753 } // Center of Nigeria
// }


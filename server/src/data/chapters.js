// Seed list of Omega Psi Phi chapters (undergraduate campus chapters + graduate/alumni
// city chapters). Greek-letter designations beyond the founding Alpha Chapter are not
// asserted here since exact letter-to-campus mappings vary and aren't reliably sourced;
// entries instead use a campus or city based label. Users can rename, edit, or add new
// chapters from the app, which is the expected way to fill in gaps or correct a name.
export const SEED_CHAPTERS = [
  // Founding chapter
  { name: "Alpha Chapter", campus: "Howard University", city: "Washington", state: "DC", lat: 38.9219, lon: -77.0192 },

  // HBCU undergraduate chapters
  { name: "Morehouse College Chapter", campus: "Morehouse College", city: "Atlanta", state: "GA", lat: 33.7490, lon: -84.3880 },
  { name: "Hampton University Chapter", campus: "Hampton University", city: "Hampton", state: "VA", lat: 37.0299, lon: -76.3452 },
  { name: "Florida A&M University Chapter", campus: "Florida A&M University", city: "Tallahassee", state: "FL", lat: 30.4383, lon: -84.2807 },
  { name: "North Carolina A&T Chapter", campus: "North Carolina A&T State University", city: "Greensboro", state: "NC", lat: 36.0726, lon: -79.7920 },
  { name: "Southern University Chapter", campus: "Southern University", city: "Baton Rouge", state: "LA", lat: 30.4515, lon: -91.1871 },
  { name: "Texas Southern University Chapter", campus: "Texas Southern University", city: "Houston", state: "TX", lat: 29.7604, lon: -95.3698 },
  { name: "Grambling State University Chapter", campus: "Grambling State University", city: "Grambling", state: "LA", lat: 32.5276, lon: -92.7174 },
  { name: "Jackson State University Chapter", campus: "Jackson State University", city: "Jackson", state: "MS", lat: 32.2988, lon: -90.1848 },
  { name: "Tennessee State University Chapter", campus: "Tennessee State University", city: "Nashville", state: "TN", lat: 36.1659, lon: -86.7844 },
  { name: "Alabama State University Chapter", campus: "Alabama State University", city: "Montgomery", state: "AL", lat: 32.3792, lon: -86.3077 },
  { name: "Alabama A&M University Chapter", campus: "Alabama A&M University", city: "Huntsville", state: "AL", lat: 34.7304, lon: -86.5861 },
  { name: "Tuskegee University Chapter", campus: "Tuskegee University", city: "Tuskegee", state: "AL", lat: 32.4244, lon: -85.7090 },
  { name: "Morgan State University Chapter", campus: "Morgan State University", city: "Baltimore", state: "MD", lat: 39.2904, lon: -76.6122 },
  { name: "Norfolk State University Chapter", campus: "Norfolk State University", city: "Norfolk", state: "VA", lat: 36.8508, lon: -76.2859 },
  { name: "Virginia State University Chapter", campus: "Virginia State University", city: "Petersburg", state: "VA", lat: 37.2279, lon: -77.4019 },
  { name: "Virginia Union University Chapter", campus: "Virginia Union University", city: "Richmond", state: "VA", lat: 37.5407, lon: -77.4360 },
  { name: "South Carolina State Chapter", campus: "South Carolina State University", city: "Orangeburg", state: "SC", lat: 33.4918, lon: -80.8556 },
  { name: "Clark Atlanta University Chapter", campus: "Clark Atlanta University", city: "Atlanta", state: "GA", lat: 33.7490, lon: -84.3880 },
  { name: "Fisk University Chapter", campus: "Fisk University", city: "Nashville", state: "TN", lat: 36.1659, lon: -86.7844 },
  { name: "Xavier University of Louisiana Chapter", campus: "Xavier University of Louisiana", city: "New Orleans", state: "LA", lat: 29.9511, lon: -90.0715 },
  { name: "Dillard University Chapter", campus: "Dillard University", city: "New Orleans", state: "LA", lat: 29.9511, lon: -90.0715 },
  { name: "Prairie View A&M Chapter", campus: "Prairie View A&M University", city: "Prairie View", state: "TX", lat: 30.0938, lon: -95.9911 },
  { name: "Bethune-Cookman University Chapter", campus: "Bethune-Cookman University", city: "Daytona Beach", state: "FL", lat: 29.2108, lon: -81.0228 },
  { name: "Central State University Chapter", campus: "Central State University", city: "Wilberforce", state: "OH", lat: 39.7042, lon: -83.8849 },
  { name: "Lincoln University (PA) Chapter", campus: "Lincoln University", city: "Oxford", state: "PA", lat: 39.7984, lon: -75.9494 },
  { name: "Lincoln University (MO) Chapter", campus: "Lincoln University", city: "Jefferson City", state: "MO", lat: 38.5767, lon: -92.1735 },

  // PWI / large state-school undergraduate chapters
  { name: "University of Maryland Chapter", campus: "University of Maryland", city: "College Park", state: "MD", lat: 38.9897, lon: -76.9378 },
  { name: "Ohio State University Chapter", campus: "Ohio State University", city: "Columbus", state: "OH", lat: 39.9612, lon: -82.9988 },
  { name: "Michigan State University Chapter", campus: "Michigan State University", city: "East Lansing", state: "MI", lat: 42.7370, lon: -84.4839 },
  { name: "University of Illinois Chapter", campus: "University of Illinois Urbana-Champaign", city: "Champaign", state: "IL", lat: 40.1164, lon: -88.2434 },
  { name: "Indiana University Chapter", campus: "Indiana University", city: "Bloomington", state: "IN", lat: 39.1653, lon: -86.5264 },
  { name: "Wayne State University Chapter", campus: "Wayne State University", city: "Detroit", state: "MI", lat: 42.3314, lon: -83.0458 },
  { name: "Florida State University Chapter", campus: "Florida State University", city: "Tallahassee", state: "FL", lat: 30.4383, lon: -84.2807 },

  // Graduate / alumni city chapters
  { name: "Chicago Alumni Chapter", campus: null, city: "Chicago", state: "IL", lat: 41.8781, lon: -87.6298 },
  { name: "Atlanta Alumni Chapter", campus: null, city: "Atlanta", state: "GA", lat: 33.7490, lon: -84.3880 },
  { name: "Houston Alumni Chapter", campus: null, city: "Houston", state: "TX", lat: 29.7604, lon: -95.3698 },
  { name: "Los Angeles Alumni Chapter", campus: null, city: "Los Angeles", state: "CA", lat: 34.0522, lon: -118.2437 },
  { name: "New York City Alumni Chapter", campus: null, city: "New York", state: "NY", lat: 40.7128, lon: -74.0060 },
  { name: "Washington DC Alumni Chapter", campus: null, city: "Washington", state: "DC", lat: 38.9072, lon: -77.0369 },
  { name: "Detroit Alumni Chapter", campus: null, city: "Detroit", state: "MI", lat: 42.3314, lon: -83.0458 },
  { name: "Philadelphia Alumni Chapter", campus: null, city: "Philadelphia", state: "PA", lat: 39.9526, lon: -75.1652 },
  { name: "Baltimore Alumni Chapter", campus: null, city: "Baltimore", state: "MD", lat: 39.2904, lon: -76.6122 },
  { name: "Memphis Alumni Chapter", campus: null, city: "Memphis", state: "TN", lat: 35.1495, lon: -90.0490 },
  { name: "New Orleans Alumni Chapter", campus: null, city: "New Orleans", state: "LA", lat: 29.9511, lon: -90.0715 },
  { name: "Charlotte Alumni Chapter", campus: null, city: "Charlotte", state: "NC", lat: 35.2271, lon: -80.8431 },
  { name: "Dallas Alumni Chapter", campus: null, city: "Dallas", state: "TX", lat: 32.7767, lon: -96.7970 },
  { name: "Birmingham Alumni Chapter", campus: null, city: "Birmingham", state: "AL", lat: 33.5186, lon: -86.8104 },
  { name: "Jacksonville Alumni Chapter", campus: null, city: "Jacksonville", state: "FL", lat: 30.3322, lon: -81.6557 },
  { name: "Richmond Alumni Chapter", campus: null, city: "Richmond", state: "VA", lat: 37.5407, lon: -77.4360 },
  { name: "Columbus Alumni Chapter", campus: null, city: "Columbus", state: "OH", lat: 39.9612, lon: -82.9988 },
  { name: "Indianapolis Alumni Chapter", campus: null, city: "Indianapolis", state: "IN", lat: 39.7684, lon: -86.1581 },
  { name: "St. Louis Alumni Chapter", campus: null, city: "St. Louis", state: "MO", lat: 38.6270, lon: -90.1994 },
  { name: "Kansas City Alumni Chapter", campus: null, city: "Kansas City", state: "MO", lat: 39.0997, lon: -94.5786 },
];

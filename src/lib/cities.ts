export type CityData = {
  slug: string;
  name: string;
  county: string;
  zips: string[];
  neighborhoods: string[];
  landmarks: string[];
  geo: { lat: number; lng: number };
  climateNote: string;
  pestIntro: string;
  topPests: string[];
  localAngle: string;
  testimonial?: { text: string; name: string; location: string };
};

export const CITIES: CityData[] = [
  {
    slug: "rancho-cucamonga",
    name: "Rancho Cucamonga",
    county: "San Bernardino County",
    zips: ["91701", "91730", "91737", "91739"],
    neighborhoods: ["Alta Loma", "Etiwanda", "Haven View Estates", "Terra Vista", "Victoria Gardens"],
    landmarks: ["Victoria Gardens", "North Etiwanda Preserve", "Red Hill Park", "Central Park"],
    geo: { lat: 34.1064, lng: -117.5931 },
    climateNote: "Hot, dry summers in the foothills of the San Gabriel Mountains create prime conditions for mosquitoes, ants, and spiders — especially in yards with irrigation, planter beds, or mature landscaping.",
    pestIntro: "Rancho Cucamonga homes along the foothills (Alta Loma, Etiwanda) see heavy ant and spider pressure, while lower elevation neighborhoods near the wash deal with mosquitoes from standing water.",
    topPests: ["Mosquitoes", "Argentine ants", "Black widow spiders", "Earwigs", "Roaches"],
    localAngle: "As a family-owned Rancho Cucamonga business, we treat our own neighbors — and we won't put anything on your property we wouldn't use on ours.",
    testimonial: {
      text: "I love that they use natural and pet-friendly treatments. They are a local family-owned business and their customer service is great! Highly recommend!",
      name: "Ashlyn C.",
      location: "Rancho Cucamonga, CA",
    },
  },
  {
    slug: "upland",
    name: "Upland",
    county: "San Bernardino County",
    zips: ["91784", "91786"],
    neighborhoods: ["San Antonio Heights", "Downtown Upland", "Sycamore Hills", "College Heights"],
    landmarks: ["Mountain Green Park", "Memorial Park", "Cabrillo Park", "Euclid Avenue"],
    geo: { lat: 34.0975, lng: -117.6484 },
    climateNote: "Upland's older tree-lined neighborhoods and proximity to San Antonio Canyon mean mature landscaping, moisture pockets, and steady pest pressure from spring through late fall.",
    pestIntro: "Upland homes in San Antonio Heights and College Heights see heavy spider webbing on eaves, ant trails from mature trees, and seasonal mosquito spikes near shaded, irrigated yards.",
    topPests: ["Spiders", "Argentine ants", "Mosquitoes", "Earwigs", "Silverfish"],
    localAngle: "Upland is one of our most-served cities — we know the older architecture, the deep eaves, and the ant pressure unique to this part of the IE.",
  },
  {
    slug: "ontario",
    name: "Ontario",
    county: "San Bernardino County",
    zips: ["91761", "91762", "91764"],
    neighborhoods: ["New Model Colony", "Ontario Ranch", "Downtown Ontario", "Creekside"],
    landmarks: ["Ontario Mills", "Whispering Lakes Golf Course", "Toyota Arena", "Citizens Business Bank Arena"],
    geo: { lat: 34.0633, lng: -117.6509 },
    climateNote: "Ontario's flat terrain and new-build communities in Ontario Ranch create fresh landscaping that attracts ants, while older neighborhoods battle roaches and silverfish.",
    pestIntro: "Ontario Ranch's newer homes see ants in kitchens and spiders around porches, while older Ontario neighborhoods deal with roach and silverfish pressure from aging plumbing voids.",
    topPests: ["Ants", "Roaches", "Silverfish", "Spiders", "Mosquitoes"],
    localAngle: "We service Ontario from the old downtown out to the Ontario Ranch new builds — and everything in between.",
  },
  {
    slug: "claremont",
    name: "Claremont",
    county: "Los Angeles County",
    zips: ["91711"],
    neighborhoods: ["The Claremont Village", "North Claremont", "Padua Hills", "Claraboya"],
    landmarks: ["Claremont Colleges", "Rancho Santa Ana Botanic Garden", "Wilderness Park", "Memorial Park"],
    geo: { lat: 34.1064, lng: -117.7198 },
    climateNote: "Claremont's famous tree canopy and foothill location mean lots of shade, moisture, and pest-friendly landscaping — particularly heavy spider and earwig pressure in older Village homes.",
    pestIntro: "Claremont Village homes with mature landscaping and older architecture see persistent spider webbing, earwig activity, and seasonal mosquitoes. Padua Hills and North Claremont add rodent and wildlife pressure from proximity to wilderness areas.",
    topPests: ["Spiders", "Earwigs", "Ants", "Mosquitoes", "Silverfish"],
    localAngle: "Claremont residents care about what goes on their property — it's why plant-based pest control fits here better than anywhere.",
  },
  {
    slug: "glendora",
    name: "Glendora",
    county: "Los Angeles County",
    zips: ["91740", "91741"],
    neighborhoods: ["North Glendora", "Gordon Highlands", "Downtown Glendora", "South Hills"],
    landmarks: ["Glendora Village", "Big Dalton Wilderness Park", "Finkbiner Park", "South Hills Park"],
    geo: { lat: 34.1361, lng: -117.8653 },
    climateNote: "Glendora's foothill neighborhoods (Gordon Highlands, North Glendora) back up against wildland — meaning heavy spider, scorpion, and rodent pressure, plus seasonal mosquitoes from nearby washes.",
    pestIntro: "Foothill Glendora homes fight wildland-interface pests (spiders, scorpions, rodents) while downtown and South Hills deal with ants, roaches, and seasonal mosquitoes.",
    topPests: ["Spiders", "Ants", "Mosquitoes", "Rodents", "Roaches"],
    localAngle: "Glendora's foothill properties need a pest plan that accounts for the wildland edge — we build your perimeter with that in mind.",
  },
  {
    slug: "san-dimas",
    name: "San Dimas",
    county: "Los Angeles County",
    zips: ["91773"],
    neighborhoods: ["Via Verde", "Downtown San Dimas", "North San Dimas", "Horsethief Canyon"],
    landmarks: ["Frank G. Bonelli Regional Park", "Puddingstone Reservoir", "Via Verde Country Club", "San Dimas Canyon"],
    geo: { lat: 34.1067, lng: -117.8067 },
    climateNote: "Proximity to Puddingstone Reservoir and San Dimas Canyon means mosquito pressure is consistently higher here than in surrounding cities — especially April through October.",
    pestIntro: "San Dimas homes near Puddingstone and the canyon see strong mosquito activity. Via Verde and hillside properties face spider and ant pressure from mature landscaping and nearby open space.",
    topPests: ["Mosquitoes", "Spiders", "Ants", "Earwigs", "Rodents"],
    localAngle: "If you live within 2 miles of Puddingstone, mosquito prevention isn't optional — it's the difference between using your yard and avoiding it.",
  },
  {
    slug: "fontana",
    name: "Fontana",
    county: "San Bernardino County",
    zips: ["92335", "92336", "92337"],
    neighborhoods: ["North Fontana", "Sierra Lakes", "Heritage", "Downtown Fontana"],
    landmarks: ["Auto Club Speedway", "Jurupa Hills", "Sierra Lakes Golf Club", "Martin Tudor Jurupa Hills Regional Park"],
    geo: { lat: 34.0922, lng: -117.435 },
    climateNote: "Fontana's hot, dry summers combined with new and master-planned communities create strong ant and spider pressure, plus mosquito spikes in irrigated HOA landscaping.",
    pestIntro: "North Fontana and Sierra Lakes see heavy ant, spider, and mosquito activity thanks to newer irrigated landscaping. Older Fontana neighborhoods deal with roach and silverfish pressure.",
    topPests: ["Ants", "Spiders", "Mosquitoes", "Roaches", "Earwigs"],
    localAngle: "Fontana's HOA-heavy neighborhoods need a treatment plan that works around tight schedules — we make it painless.",
  },
  {
    slug: "pomona",
    name: "Pomona",
    county: "Los Angeles County",
    zips: ["91766", "91767", "91768", "91769"],
    neighborhoods: ["Phillips Ranch", "Westmont", "Ganesha Hills", "Downtown Pomona"],
    landmarks: ["Fairplex", "Ganesha Park", "Cal Poly Pomona", "Frank G. Bonelli Park"],
    geo: { lat: 34.0551, lng: -117.7497 },
    climateNote: "Pomona's mix of older housing stock and newer Phillips Ranch development creates a wide range of pest pressure — from roaches in older plumbing to ants and mosquitoes in newer, irrigated neighborhoods.",
    pestIntro: "Phillips Ranch and Ganesha Hills see ants, spiders, and mosquitoes from irrigated landscaping. Older Pomona neighborhoods battle roaches, silverfish, and rodent pressure.",
    topPests: ["Ants", "Roaches", "Mosquitoes", "Spiders", "Rodents"],
    localAngle: "Pomona's housing mix means no two homes need the same treatment — we assess before we spray, every time.",
  },
];

export const CITY_SLUGS = CITIES.map((c) => c.slug);

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

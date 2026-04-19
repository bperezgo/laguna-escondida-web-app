export const FISH_SPECIES_QUERY = `*[_type == "fishSpecies"] | order(name asc) {
  name,
  latinName,
  difficulty,
  description,
  weightRange,
  season,
  depth,
  bait,
  image
}`;

export const FISH_SPECIES_QUERY = `*[_type == "fishSpecies"] | order(name asc) {
  name,
  difficulty,
  description,
  image
}`;

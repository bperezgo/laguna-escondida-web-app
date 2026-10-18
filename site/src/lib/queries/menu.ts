import { sanityClient } from '../sanity';

export const MENU_CATEGORIES_QUERY = `*[_type == "menuCategory"] | order(order asc) {
  _id,
  name,
  slug,
  order,
  dishes[] {
    _key,
    name,
    description,
    price,
    available,
    image { asset, alt }
  }
}`;

export const MENU_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  businessName,
  menuTagline
}`;

export type MenuDish = {
  _key: string;
  name: string;
  description?: string;
  price: number;
  available?: boolean;
  image?: { asset: { _ref: string }; alt?: string };
};

export type MenuCategory = {
  _id: string;
  name: string;
  slug: { current: string };
  order: number;
  dishes: MenuDish[];
};

export type MenuSettings = {
  businessName?: string;
  menuTagline?: string;
};

// Used until a siteSettings document is published in Sanity.
const DEFAULT_SETTINGS = {
  businessName: 'Laguna Escondida',
  menuTagline: 'Sabores auténticos junto a la laguna',
};

/** Categories in display order, with unavailable dishes filtered out. */
export async function getMenuCategories(): Promise<MenuCategory[]> {
  const categories = await sanityClient.fetch<MenuCategory[]>(MENU_CATEGORIES_QUERY);
  return categories.map((cat) => ({
    ...cat,
    dishes: (cat.dishes ?? []).filter((d) => d.available !== false),
  }));
}

export async function getMenuSettings(): Promise<Required<MenuSettings>> {
  const settings = await sanityClient.fetch<MenuSettings | null>(MENU_SETTINGS_QUERY);
  return {
    businessName: settings?.businessName || DEFAULT_SETTINGS.businessName,
    menuTagline: settings?.menuTagline || DEFAULT_SETTINGS.menuTagline,
  };
}

export const formatPrice = (price: number): string =>
  '$' + price.toLocaleString('es-CO');

// src/lib/services/strapi.ts

import type { StrapiResponse, StrapiEntity } from '@/types/strapi';

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN ?? '';

class StrapiClient {
  private baseURL: string;
  private token: string;

  constructor(baseURL: string, token: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}/api/${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi error [${response.status}]: ${response.statusText}`);
    }

    return response.json() as T;
  }

  async getBlogPosts(options: {
    populate?: string;
    sort?: string;
    filters?: Record<string, string>;
    pagination?: { page: number; pageSize: number };
  } = {}): Promise<StrapiResponse<StrapiEntity<unknown>[]>> {
    const params = new URLSearchParams();

    if (options.populate) params.append('populate', options.populate);
    if (options.sort) params.append('sort', options.sort);
    if (options.pagination) {
      params.append('pagination[page]', String(options.pagination.page));
      params.append('pagination[pageSize]', String(options.pagination.pageSize));
    }
    if (options.filters) {
      for (const [key, value] of Object.entries(options.filters)) {
        params.append(`filters[${key}]`, value);
      }
    }

    return this.request(`posts?${params.toString()}`);
  }

  async getPostBySlug(slug: string): Promise<StrapiEntity<unknown> | null> {
    const response = await this.request<StrapiResponse<StrapiEntity<unknown>[]>>(
      `posts?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data[0] ?? null;
  }

  async create<T>(collection: string, data: T): Promise<StrapiEntity<T>> {
    return this.request(`${collection}`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async update<T>(collection: string, id: string, data: Partial<T>): Promise<StrapiEntity<T>> {
    return this.request(`${collection}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  async delete(collection: string, id: string): Promise<void> {
    await this.request(`${collection}/${id}`, { method: 'DELETE' });
  }
}

export const strapi = new StrapiClient(STRAPI_URL, STRAPI_TOKEN);

/** Generic save helper used by use-cases */
export async function saveToStrapi<T>(collection: string, data: T): Promise<StrapiEntity<T>> {
  return strapi.create(collection, data);
}

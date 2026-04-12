import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Resenas',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Texto',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stars',
      title: 'Estrellas',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'source',
      title: 'Fuente',
      type: 'string',
      options: {
        list: [
          {title: 'Google Maps', value: 'Google Maps'},
          {title: 'TripAdvisor', value: 'TripAdvisor'},
          {title: 'Facebook', value: 'Facebook'},
          {title: 'Otro', value: 'Otro'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'author',
      stars: 'stars',
    },
    prepare({title, stars}) {
      return {
        title,
        subtitle: `${'★'.repeat(stars || 0)}${'☆'.repeat(5 - (stars || 0))}`,
      }
    },
  },
})

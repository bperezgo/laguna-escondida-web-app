import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuCategory',
  title: 'Categoría del Menú',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'ID / Slug',
      type: 'slug',
      options: {source: 'name'},
      description: 'Usado como anchor en la página. Ej: platos-fuertes',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: 'dishes',
      title: 'Platos',
      type: 'array',
      of: [{type: 'menuDish'}],
    }),
  ],
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'order',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: `Orden: ${subtitle}`,
      }
    },
  },
})

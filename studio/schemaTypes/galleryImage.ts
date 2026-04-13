import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Galeria de Imagenes',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gridSize',
      title: 'Tamano en la grilla',
      type: 'string',
      options: {
        list: [
          {title: 'Estandar', value: 'standard'},
          {title: 'Ancho', value: 'wide'},
          {title: 'Destacado', value: 'featured'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: 'caption',
      title: 'Leyenda',
      type: 'string',
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
      title: 'image.alt',
      subtitle: 'gridSize',
      media: 'image',
    },
  },
})

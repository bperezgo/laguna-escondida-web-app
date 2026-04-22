import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experiencias',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      description: 'Define la URL: /experiencias/{slug}/',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Etiqueta (numero / accion)',
      type: 'string',
      description: 'Ej: 01 / Pescar',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'italicSubtitle',
      title: 'Subtitulo en cursiva',
      type: 'string',
      description: 'Texto en italica bajo el titulo. Ej: en lago privado',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripcion',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagen principal de la tarjeta. Proporcion 3:4 recomendada.',
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
      name: 'metaLeftLabel',
      title: 'Meta izquierda — etiqueta',
      type: 'string',
      description: 'Ej: Lago con, Menu, Capacidad',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaLeftValue',
      title: 'Meta izquierda — valor (dorado)',
      type: 'string',
      description: 'Ej: 5 especies, Campestre, hasta 60',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaRight',
      title: 'Meta derecha',
      type: 'string',
      description: 'Ej: Todos los niveles, Guadua al aire libre, Uso exclusivo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Texto del boton',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventKey',
      title: 'Clave de evento (analytics)',
      type: 'string',
      description: 'Ej: pesca_click, restaurante_click, eventos_click',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icono SVG (path data)',
      description: 'El contenido del atributo "d" del path SVG. Opcional.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (rule) => rule.required().integer(),
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
      title: 'title',
      subtitle: 'label',
      media: 'image',
    },
  },
})

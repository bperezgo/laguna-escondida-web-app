import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'experiencesSection',
  title: 'Experiencias — Encabezado',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Pequena etiqueta sobre el titulo. Ej: Experiencias',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Titulo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitulo',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Experiencias — Encabezado'}
    },
  },
})

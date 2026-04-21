import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'introSection',
  title: 'Intro',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Pequena etiqueta sobre el titulo. Ej: Un lugar, tres maneras de quedarse.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Titulo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Texto principal',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Texto complementario',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      description: 'Tres indicadores breves. Ej: 5 / Especies del lago.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Valor',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Etiqueta',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        },
      ],
      validation: (rule) => rule.length(3).warning('Recomendado: 3 stats.'),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Intro'}
    },
  },
})

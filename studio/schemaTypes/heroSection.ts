import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Imagen de fondo',
      type: 'image',
      options: {hotspot: true},
      description: 'Resolucion recomendada: 1920x1080px (16:9). Maximo ~200KB en JPEG.',
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
      name: 'headline',
      title: 'Titulo principal',
      type: 'object',
      description: 'Las tres lineas del titulo del hero.',
      fields: [
        defineField({
          name: 'line1',
          title: 'Linea 1',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'line2',
          title: 'Linea 2',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'line3',
          title: 'Linea 3 (destacada)',
          type: 'string',
          description: 'Se muestra en color dorado.',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subtitulo',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Numero de WhatsApp',
      type: 'string',
      description: 'Numero completo con codigo de pais, sin espacios ni signos. Ej: 573001234567',
      validation: (rule) => rule.required().regex(/^\d+$/, {name: 'solo numeros'}),
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje predeterminado de WhatsApp',
      type: 'string',
      initialValue: 'Hola, quiero reservar en Laguna Escondida',
    }),
    defineField({
      name: 'ctaPrimaryText',
      title: 'Texto del boton principal',
      type: 'string',
      initialValue: 'Reservar visita',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'Texto del boton secundario',
      type: 'string',
      initialValue: 'Ver experiencias',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'trustBadgeText',
      title: 'Texto del badge de confianza',
      type: 'string',
      description: 'Ej: 4.6 en Google Maps · Marinilla, Antioquia',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Hero'}
    },
  },
})

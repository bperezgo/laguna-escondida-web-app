import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaBandSection',
  title: 'CTA Band',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Ej: Reservas',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Titulo',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Texto del boton principal',
      type: 'string',
      description: 'Si se deja vacio, se usa el texto del boton del hero.',
    }),
    defineField({
      name: 'whatsappCtaText',
      title: 'Texto del boton de WhatsApp',
      type: 'string',
      initialValue: 'Escribir por WhatsApp',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Numero de WhatsApp (opcional)',
      type: 'string',
      description: 'Numero completo con codigo de pais. Si se deja vacio, se usa el del hero.',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          return /^\d+$/.test(value) ? true : 'Solo numeros permitidos.'
        }),
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje predeterminado de WhatsApp',
      type: 'string',
      description: 'Si se deja vacio, se usa el mensaje del hero.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'CTA Band'}
    },
  },
})

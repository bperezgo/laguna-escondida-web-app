import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuracion del Sitio',
  type: 'document',
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'contact', title: 'Contacto'},
    {name: 'social', title: 'Redes Sociales'},
    {name: 'business', title: 'Negocio'},
  ],
  fields: [
    // General
    defineField({
      name: 'businessName',
      title: 'Nombre del negocio',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripcion del sitio',
      type: 'text',
      rows: 3,
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteImage',
      title: 'Imagen principal (Open Graph)',
      type: 'image',
      options: {hotspot: true},
      group: 'general',
    }),

    // Contact
    defineField({
      name: 'address',
      title: 'Direccion',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({name: 'street', title: 'Direccion', type: 'string'}),
        defineField({name: 'locality', title: 'Ciudad', type: 'string'}),
        defineField({name: 'region', title: 'Departamento', type: 'string'}),
        defineField({name: 'country', title: 'Pais', type: 'string'}),
      ],
    }),
    defineField({
      name: 'geoLocation',
      title: 'Ubicacion geografica',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({name: 'latitude', title: 'Latitud', type: 'number'}),
        defineField({name: 'longitude', title: 'Longitud', type: 'number'}),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Telefono',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje predeterminado de WhatsApp',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Correo electronico',
      type: 'string',
      group: 'contact',
    }),

    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Redes sociales',
      type: 'object',
      group: 'social',
      fields: [
        defineField({name: 'instagram', title: 'Instagram', type: 'url'}),
        defineField({name: 'facebook', title: 'Facebook', type: 'url'}),
        defineField({name: 'googleMaps', title: 'Google Maps', type: 'url'}),
        defineField({name: 'tiktok', title: 'TikTok', type: 'url'}),
      ],
    }),

    // Business
    defineField({
      name: 'openingHours',
      title: 'Horarios de atencion',
      type: 'array',
      group: 'business',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'days',
              title: 'Dias',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              options: {
                list: [
                  {title: 'Lunes', value: 'Monday'},
                  {title: 'Martes', value: 'Tuesday'},
                  {title: 'Miercoles', value: 'Wednesday'},
                  {title: 'Jueves', value: 'Thursday'},
                  {title: 'Viernes', value: 'Friday'},
                  {title: 'Sabado', value: 'Saturday'},
                  {title: 'Domingo', value: 'Sunday'},
                ],
              },
            }),
            defineField({name: 'opens', title: 'Abre', type: 'string'}),
            defineField({name: 'closes', title: 'Cierra', type: 'string'}),
          ],
          preview: {
            select: {days: 'days', opens: 'opens', closes: 'closes'},
            prepare({days, opens, closes}) {
              return {
                title: (days || []).join(', '),
                subtitle: `${opens || ''} - ${closes || ''}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Calificacion',
      type: 'object',
      group: 'business',
      fields: [
        defineField({
          name: 'value',
          title: 'Valor',
          type: 'number',
          validation: (rule) => rule.min(1).max(5),
        }),
        defineField({
          name: 'count',
          title: 'Numero de resenas',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'priceRange',
      title: 'Rango de precios',
      type: 'string',
      group: 'business',
    }),
    defineField({
      name: 'cuisineTypes',
      title: 'Tipos de cocina',
      type: 'array',
      group: 'business',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'amenities',
      title: 'Servicios',
      type: 'array',
      group: 'business',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
  preview: {
    select: {title: 'businessName'},
  },
})

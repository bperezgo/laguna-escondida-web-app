import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Laguna Escondida',

  projectId: 'eycsitos',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Configuracion del Sitio')
              .id('siteSettings')
              .child(
                S.document().schemaType('siteSettings').documentId('siteSettings'),
              ),
            S.listItem()
              .title('Hero')
              .id('heroSection')
              .child(
                S.document().schemaType('heroSection').documentId('heroSection'),
              ),
            S.listItem()
              .title('Intro')
              .id('introSection')
              .child(
                S.document().schemaType('introSection').documentId('introSection'),
              ),
            S.listItem()
              .title('CTA Band')
              .id('ctaBandSection')
              .child(
                S.document().schemaType('ctaBandSection').documentId('ctaBandSection'),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['siteSettings', 'heroSection', 'introSection', 'ctaBandSection'].includes(
                  listItem.getId()!,
                ),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

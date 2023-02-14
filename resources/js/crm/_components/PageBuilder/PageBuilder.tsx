import React, { FunctionComponent, useState, useEffect } from "react";
import grapesjs from "grapesjs";
import BlocksBasic from 'grapesjs-blocks-basic';
import PresetWebpage from 'grapesjs-preset-webpage';
import Touch from 'grapesjs-touch';
import Countdown from 'grapesjs-component-countdown';
import Newsletter from 'grapesjs-preset-newsletter';
import Forms from 'grapesjs-plugin-forms';
import Export from 'grapesjs-plugin-export';
import Tabs from 'grapesjs-tabs';
import CustomCode from 'grapesjs-custom-code';
import ParserPostcss from 'grapesjs-parser-postcss';
import Tooltip from 'grapesjs-tooltip';
import ru from 'grapesjs/locale/en';

type PageBuilderProps = {
  editor: object | null;
  setEditor: any;
  defaultValue: string | null;
}

const PageBuilder: FunctionComponent<PageBuilderProps> = ({ editor, setEditor, defaultValue }): JSX.Element => {

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#editor',
      height: 'calc(90vh - 114px)',
      // i18n: {
      //   locale: 'ru', // default locale
      //   detectLocale: true, // by default, the editor will detect the language
      //   localeFallback: 'ru', // default fallback
      //   // messages: { ru },
      // },
      showOffsets: true,
      selectorManager: { componentFirst: true },
      canvas: {
        styles: ['https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'],
      },
      styleManager: {
        sectors: [
          {
            name: 'General',
            properties: [
              {
                extend: 'float',
                type: 'radio',
                default: 'none',
                options: [
                  { value: 'none', className: 'fa fa-times' },
                  { value: 'left', className: 'fa fa-align-left' },
                  { value: 'right', className: 'fa fa-align-right' }
                ],
              },
              'display',
              { extend: 'position', type: 'select' },
              'top',
              'right',
              'left',
              'bottom',
            ],
          },
          {
            name: 'Dimension',
            open: false,
            properties: [
              'width',
              {
                id: 'flex-width',
                type: 'integer',
                name: 'Width',
                units: ['px', '%'],
                property: 'flex-basis',
                toRequire: 1,
              },
              'height',
              'max-width',
              'min-height',
              'margin',
              'padding'
            ],
          }, {
            name: 'Typography',
            open: false,
            properties: [
              {
                type: 'select',
                property: 'font-family',
                label: 'Font',
                name: 'Font',
                default: "'Montserrat', sans-serif",
                options: [
                  { value: "'Montserrat', sans-serif", name: 'Montserrat' },
                  { value: "'Oswald', sans-serif", name: 'Oswald' },
                  { value: "Helvetica Neue,Helvetica,Arial,sans-serif", name: 'Helvetica' },
                  { value: "sans-serif", name: 'sans-serif' },
                  { value: "Times New Roman", name: 'Times New Roman' },
                  { value: "Arial Black", name: 'Arial Black' },
                  { value: "Tahoma", name: 'Tahoma' },
                  { value: "Verdana, Geneva, sans-serif", name: 'Verdana' },
                  { value: "Courier New Courier, monospace", name: 'Courier New Courier' },
                  { value: "'Lato', sans-serif", name: 'Lato' },
                  { value: "'Open Sans', sans-serif", name: 'Open Sans' },
                ]
              },
              'font-size',
              'font-weight',
              'letter-spacing',
              'color',
              'line-height',
              {
                extend: 'text-align',
                options: [
                  { id: 'left', label: 'Left', className: 'fa fa-align-left' },
                  { id: 'center', label: 'Center', className: 'fa fa-align-center' },
                  { id: 'right', label: 'Right', className: 'fa fa-align-right' },
                  { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' }
                ],
              },
              {
                property: 'text-decoration',
                type: 'radio',
                default: 'none',
                options: [
                  { id: 'none', label: 'None', className: 'fa fa-times' },
                  { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                  { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' }
                ],
              },
              'text-shadow'
            ],
          }, {
            name: 'Decorations',
            open: false,
            properties: [
              'opacity',
              'border-radius',
              'border',
              'box-shadow',
              'background', // { id: 'background-bg', property: 'background', type: 'bg' }
            ],
          }, {
            name: 'Extra',
            open: false,
            buildProps: [
              'transition',
              'perspective',
              'transform'
            ],
          }, {
            name: 'Flex',
            open: false,
            properties: [{
              name: 'Flex Container',
              property: 'display',
              type: 'select',
              defaults: 'block',
              list: [
                { value: 'block', name: 'Disable' },
                { value: 'flex', name: 'Enable' }
              ],
            }, {
              name: 'Flex Parent',
              property: 'label-parent-flex',
              type: 'integer',
            }, {
              name: 'Direction',
              property: 'flex-direction',
              type: 'radio',
              defaults: 'row',
              list: [{
                value: 'row',
                name: 'Row',
                className: 'icons-flex icon-dir-row',
                title: 'Row',
              }, {
                value: 'row-reverse',
                name: 'Row reverse',
                className: 'icons-flex icon-dir-row-rev',
                title: 'Row reverse',
              }, {
                value: 'column',
                name: 'Column',
                title: 'Column',
                className: 'icons-flex icon-dir-col',
              }, {
                value: 'column-reverse',
                name: 'Column reverse',
                title: 'Column reverse',
                className: 'icons-flex icon-dir-col-rev',
              }],
            }, {
              name: 'Justify',
              property: 'justify-content',
              type: 'radio',
              defaults: 'flex-start',
              list: [{
                value: 'flex-start',
                className: 'icons-flex icon-just-start',
                title: 'Start',
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-just-end',
              }, {
                value: 'space-between',
                title: 'Space between',
                className: 'icons-flex icon-just-sp-bet',
              }, {
                value: 'space-around',
                title: 'Space around',
                className: 'icons-flex icon-just-sp-ar',
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-just-sp-cent',
              }],
            }, {
              name: 'Align',
              property: 'align-items',
              type: 'radio',
              defaults: 'center',
              list: [{
                value: 'flex-start',
                title: 'Start',
                className: 'icons-flex icon-al-start',
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-al-end',
              }, {
                value: 'stretch',
                title: 'Stretch',
                className: 'icons-flex icon-al-str',
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-al-center',
              }],
            }, {
              name: 'Flex Children',
              property: 'label-parent-flex',
              type: 'integer',
            }, {
              name: 'Order',
              property: 'order',
              type: 'integer',
              defaults: 0,
              min: 0
            }, {
              name: 'Flex',
              property: 'flex',
              type: 'composite',
              properties: [{
                name: 'Grow',
                property: 'flex-grow',
                type: 'integer',
                defaults: 0,
                min: 0
              }, {
                name: 'Shrink',
                property: 'flex-shrink',
                type: 'integer',
                defaults: 0,
                min: 0
              }, {
                name: 'Basis',
                property: 'flex-basis',
                type: 'integer',
                units: ['px', '%', ''],
                unit: '',
                defaults: 'auto',
              }],
            }, {
              name: 'Align',
              property: 'align-self',
              type: 'radio',
              defaults: 'auto',
              list: [{
                value: 'auto',
                name: 'Auto',
              }, {
                value: 'flex-start',
                title: 'Start',
                className: 'icons-flex icon-al-start',
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-al-end',
              }, {
                value: 'stretch',
                title: 'Stretch',
                className: 'icons-flex icon-al-str',
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-al-center',
              }],
            }]
          }
        ],
      },
      plugins: [
        BlocksBasic,
        PresetWebpage,
        Touch,
        Countdown,
        Newsletter, 
        Forms,
        Export,
        Tabs,
        CustomCode,
        ParserPostcss,
        Tooltip
      ],
      pluginsOpts: {
        [BlocksBasic]: { flexGrid: true },
        [PresetWebpage]: {
          // blocks: ['link-block', 'quote', 'text-basic']
        },
        [Touch]: {},
        [Countdown]: {},
        [Newsletter]: {
          updateStyleManager: false,
        },
        [Forms]: {},
        [Export]: {},
        [Tabs]: { tabsBlock: { category: 'Extra' } },
        [CustomCode]: {},
        [ParserPostcss]: {},
        [Tooltip]: {},
      }
    });
    setEditor(editor);

    editor.onReady(() => {
      var $ = grapesjs.$;
      var pn = editor.Panels;
      if (defaultValue) editor.setComponents(defaultValue)

      pn.getButton('options', 'sw-visibility').set('active', 1);


      // Load and show settings and style manager
      var openTmBtn = pn.getButton('views', 'open-tm');
      openTmBtn && openTmBtn.set('active', 1);
      var openSm = pn.getButton('views', 'open-sm');
      openSm && openSm.set('active', 1);

      pn.removeButton('views', 'open-tm');

      // Add Settings Sector
      var traitsSector = $('<div class="gjs-sm-sector no-select">' +
        '<div class="gjs-sm-sector-title"><span class="icon-settings fa fa-cog"></span> <span class="gjs-sm-sector-label">Settings</span></div>' +
        '<div class="gjs-sm-properties" style="display: none;"></div></div>');
      var traitsProps = traitsSector.find('.gjs-sm-properties');
      traitsProps.append($('.gjs-trt-traits'));
      $('.gjs-sm-sectors').before(traitsSector);
      traitsSector.find('.gjs-sm-sector-title').on('click', function () {
        var traitStyle = traitsProps.get(0).style;
        var hidden = traitStyle.display == 'none';
        if (hidden) {
          traitStyle.display = 'block';
        } else {
          traitStyle.display = 'none';
        }
      });

      // Open block manager
      var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
      openBlocksBtn && openBlocksBtn.set('active', 1);

    });



    return () => {
      console.log('destroy')
      editor.destroy();
    }

  }, []);

  return (
    <div id="editor"></div>
  );
};
export default PageBuilder;
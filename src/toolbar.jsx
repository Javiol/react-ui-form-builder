/**
  * <Toolbar />
  */

import React from 'react';
import ToolbarItem from './toolbar-draggable-item';
import ID from './UUID';
import store from './stores/store';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    const items = (this.props.items) ? this.props.items : this._defaultItems();
    this.state = {
      items,
    };
    store.subscribe(state => this.setState({ store: state }));
  }

  static _defaultItemOptions(element) {
    switch (element) {
      case 'Dropdown':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: `dropdown_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: `dropdown_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: `dropdown_option_${ID.uuid()}` },
        ];
      case 'Tags':
        return [
          { value: 'place_holder_tag_1', text: 'Place holder tag 1', key: `tags_option_${ID.uuid()}` },
          { value: 'place_holder_tag_2', text: 'Place holder tag 2', key: `tags_option_${ID.uuid()}` },
          { value: 'place_holder_tag_3', text: 'Place holder tag 3', key: `tags_option_${ID.uuid()}` },
        ];
      case 'Checkboxes':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: `checkboxes_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: `checkboxes_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: `checkboxes_option_${ID.uuid()}` },
        ];
      case 'RadioButtons':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: `radiobuttons_option_${ID.uuid()}` },
        ];
      case 'Table':
        return  [
            { column_1: 'column1', column_2: 'Column2', column_3: 'Column3' },
            { column_1: 'column1', column_2: 'Column2', column_3: 'Column3' },
            { column_1: 'column1', column_2: 'Column2', column_3: 'Column3' },
          ]
      default:
        return [];
    }
  }

  _defaultItems() {
    return [
      {
        key: 'Header',
        name: 'Header Text',
        icon: 'icon header',
        static: true,
        content: 'Placeholder Text...',
      },
      {
        key: 'Label',
        name: 'Label',
        static: true,
        icon: 'icon font',
        content: 'Placeholder Text...',
      },
      {
        key: 'Paragraph',
        name: 'Paragraph',
        static: true,
        icon: 'icon paragraph',
        content: 'Placeholder Text...',
      },
      {
        key: 'LineBreak',
        name: 'Line Break',
        static: true,
        icon: 'icon arrows alternate horizontal',
      },
      {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: 'Dropdown',
        icon: 'icon caret square down outline',
        label: 'Placeholder Label',
        field_name: 'dropdown_',
        options: [],
      },
      {
        key: 'Tags',
        canHaveAnswer: true,
        name: 'Tags',
        icon: 'icon tags',
        label: 'Placeholder Label',
        field_name: 'tags_',
        options: [],
      },
      {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: 'Checkboxes',
        icon: 'icon check square outline',
        label: 'Placeholder Label',
        field_name: 'checkboxes_',
        options: [],
      },
      {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: 'Multiple Choice',
        icon: 'icon dot circle outline',
        label: 'Placeholder Label',
        field_name: 'radiobuttons_',
        options: [],
      },
      {
        key: 'TextInput',
        canHaveAnswer: true,
        name: 'Text Input',
        label: 'Placeholder Label',
        icon: 'icon font',
        field_name: 'text_input_',
      },
      {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: 'Number Input',
        label: 'Placeholder Label',
        icon: 'icon plus',
        field_name: 'number_input_',
      },
      {
        key: 'TextArea',
        canHaveAnswer: true,
        name: 'Multi-line Input',
        label: 'Placeholder Label',
        icon: 'icon text height',
        field_name: 'text_area_',
      },
      {
        key: 'Image',
        name: 'Image',
        label: '',
        icon: 'icon photo',
        field_name: 'image_',
        src: '',
      },
      {
        key: 'Rating',
        canHaveAnswer: true,
        name: 'Rating',
        label: 'Placeholder Label',
        icon: 'icon star',
        field_name: 'rating_',
      },
      {
        key: 'DatePicker',
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'hh:mm aa',
        showTimeSelect: false,
        showTimeSelectOnly: false,
        name: 'Date',
        icon: 'icon calendar',
        label: 'Placeholder Label',
        field_name: 'date_picker_',
      },
      {
        key: 'Signature',
        canReadOnly: true,
        name: 'Signature',
        icon: 'icon pencil alternate',
        label: 'Signature',
        field_name: 'signature_',
      },
      {
        key: 'HyperLink',
        name: 'Web site',
        icon: 'icon linkify',
        static: true,
        content: 'Placeholder Web site link ...',
        href: 'http://www.example.com',
      },
      {
        key: 'Download',
        name: 'File Attachment',
        icon: 'icon file',
        static: true,
        content: 'Placeholder file name ...',
        field_name: 'download_',
        file_path: '',
        _href: '',
      },
      {
        key: 'Camera',
        name: 'Camera',
        icon: 'icon camera',
        label: 'Placeholder Label',
        field_name: 'camera_',
      },
      {
        key: 'Attachment',
        name: 'Attachment',
        icon: 'icon file',
        label: 'Placeholder Label',
        field_name: 'attachment_',
      },
      {
        key: 'Table',
        canHaveAnswer: true,
        name: 'Table',
        icon: 'icon table',
        label: 'Placeholder Label',
        field_name: 'table_',
        options: [],
      },
    ];
  }

  create(item) {
    const elementOptions = {
      id: ID.uuid(),
      element: item.element || item.key,
      text: item.name,
      static: item.static,
      required: false,
    };

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    if (item.canHaveAnswer) { elementOptions.canHaveAnswer = item.canHaveAnswer; }

    if (item.canReadOnly) { elementOptions.readOnly = false; }

    if (item.canDefaultToday) { elementOptions.defaultToday = false; }

    if (item.content) { elementOptions.content = item.content; }

    if (item.href) { elementOptions.href = item.href; }

    elementOptions.canHavePageBreakBefore = item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal = item.canHaveDisplayHorizontal !== false;
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;

    if (item.key === 'Image') {
      elementOptions.src = item.src;
    }

    if (item.key === 'DatePicker') {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
    }

    if (item.key === 'Download') {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (item.defaultValue) { elementOptions.defaultValue = item.defaultValue; }

    if (item.field_name) { elementOptions.field_name = item.field_name + ID.uuid(); }

    if (item.label) { elementOptions.label = item.label; }

    if (item.options) {
      elementOptions.options = Toolbar._defaultItemOptions(elementOptions.element);
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    store.dispatch('create', this.create(item));
  }

  render() {
    return (
      <div className="react-form-builder-toolbar">
        <ul>
          {
            this.state.items.map((item) => (<ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item)} onCreate={this.create} />))
          }
        </ul>
      </div>
    );
  }
}

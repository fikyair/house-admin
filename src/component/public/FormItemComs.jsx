import React from 'react';
import { Input, Form} from 'antd';
const FormItem = Form.Item;

export default class FormItemComs extends React.Component {

    render() {
        const {labelName, children, labelNStyles, name, formItemLayout, message, ...rest} = this.props;

        return (
            <div>
                {/*<span style={{
                    ...labelNStyles,
                    marginRight: '10px',
                    minWidth: '40px',
                    display: 'inline-block'
                }}>{labelName}:</span>
                <Input {...rest} />*/}
                <FormItem
                    label = { labelName }
                    {...formItemLayout}
                >
                    {getFieldDecorator({ name }, {
                            initialValue: '',
                            rules: [{
                                required: true, message: { message }
                            }]
                        }
                    )(
                        <Input style={{width: 140}}/>
                    )}
                </FormItem>
            </div>
        )
    }
}
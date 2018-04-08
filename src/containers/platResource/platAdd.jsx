import React, {Component} from 'react';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import {Form, Button, Input, Row, Col, Select} from 'antd';
import {Axios} from "../../utils/Axios";
import './style/plat.less';
import FormItemComs from "../../component/public/FormItemComs";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

@Form.create()
class platAdd extends Component {
    handleSubmit() {
        this.props.form.validateFields((err, values) => {
            if(!err) {
                const formData = this.props.form.getFieldsValue();
                console.log("表单信息==>", formData);
                /*Axios.post(`user/addUser`, formData).then((result) => {
                    console.log("提交信息==>", result);
                })
                this.props.history.push('/user');*/
            }
        })
    }

    forItemData = [
        {}
    ]

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 12},
                sm: {span: 6},
            },
        };
        return (
            <div>
                <Bcrumb title="添加房源信息" icon="plus"/>
                <Form className="flat-form">
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    label = "房屋名称"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fName', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写房屋名称'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "房屋类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fType', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写房屋类型'
                                            }]
                                        }
                                    )(
                                        <Select placeholder = "请选择" style = {{ width: 140 }}>
                                            <Option value = "entire"> 整租</Option>
                                            <Option value = "share"> 合租</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "居室"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fHabitable', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写居室'
                                            }]
                                        }
                                    )(
                                        <Select placeholder = "请选择" style = {{ width: 140 }}>
                                            <Option value = "one"> 一居室</Option>
                                            <Option value = "two"> 二居室</Option>
                                            <Option value = "three"> 三居室</Option>
                                            <Option value = "another"> 四居室及以上</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "价格"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fPrice', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写价格'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "地址"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fStreet', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写地址'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "房龄"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fAge', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写房龄'
                                            }]
                                        }
                                    )(
                                        <TextArea  rows={4} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "房屋描述信息"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fDetails', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写房屋描述信息'
                                            }]
                                        }
                                    )(
                                        <TextArea  rows={4} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "对住户的要求"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fRequire', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写对租户的要求'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                </Form>
                <Button type="primary" htmlType="submit" style={{marginLeft: '69%', marginTop: 20}}
                        onClick={() => {
                            this.handleSubmit()
                        }}
                >提交</Button>
            </div>
        )
    }

}

platAdd.contextTypes = {};

export default platAdd;

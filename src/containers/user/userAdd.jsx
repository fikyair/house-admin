import React, {Component} from 'react';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import {Form, Button, Input, Row, Col, Card} from 'antd';
import {Axios} from "../../utils/Axios";

const FormItem = Form.Item;

@Form.create()
class userAdd extends Component {
    handleSubmit() {
        this.props.form.validateFields((err, values) => {
            if(!err) {
                const formData = this.props.form.getFieldsValue();
                console.log("表单信息==>", formData);
                Axios.post(`user/addUser`, formData).then((result) => {
                    console.log("提交信息==>", result);
                })
                this.props.history.push('/user');
            }
        })
    }

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
            <div className="user-container">
                <Bcrumb title="添加账号" icon="usergroup-add"/>
                <Form>
                    <Card title={'添加账号信息'}>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="用户名"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('uName', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '用户名必须填写☺'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="密码"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('uPwd', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '密码必须填写☺'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="昵称"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('uNickname', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '昵称必须填写☺'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="电话"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('uPhone', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '电话必须填写☺'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Card>
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

userAdd.contextTypes = {};

export default userAdd;

import React, {Component} from 'react';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import {Form, Button, Input, Row, Col, Card} from 'antd';

const FormItem = Form.Item;

@Form.create()
class userAdd extends Component {

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
                                            initialValue: ''
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
                                            initialValue: ''
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
                                            initialValue: ''
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
                                            initialValue: ''
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Card>
                </Form>
                <Button type ="primary" htmlType="submit" style = {{ marginLeft: '69%', marginTop: 20 }}>提交</Button>
            </div>
        )
    }

}

userAdd.contextTypes = {};

export default userAdd;

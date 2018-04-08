import React, {Component} from 'react';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import {Form, Button, Input, Row, Col, Select, Icon, Upload, Cascader} from 'antd';
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
            }
        })
    }

    //省市区级联
    onChangeCas = (value) => {
        console.log(value);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 12},
                sm: {span: 12},
            },
        };
        const fileList = [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }, {
            uid: -2,
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }];

        const props1 = {
            action: '//jsonplaceholder.typicode.com/posts/',
            listType: 'picture',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
        };

        //省市区级联
        const options = [{
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{
                    value: 'xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];
        return (
            <div>
                <Bcrumb title="添加房源信息" icon="plus"/>
                <Form className="flat-form">
                    <div className = "ant-card-head-title">添加房源信息</div>
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
                                    label = "价格(元)"
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
                                    label = "房龄(年)"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fAge', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写房龄'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "面积(m²)"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fArea', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写房屋面积'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "朝向"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fOrientation', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写房屋朝向'
                                            }]
                                        }
                                    )(
                                        <Select placeholder = "请选择" style = {{ width: 140 }}>
                                            <Option value = "east"> 东</Option>
                                            <Option value = "south"> 南</Option>
                                            <Option value = "west"> 西</Option>
                                            <Option value = "north"> 北</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "楼层"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fFloor', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写所在楼层'
                                            }]
                                        }
                                    )(
                                        <Input style={{width: 140}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "是否有卫生间"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'ftoilet', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写是否有独立卫生间'
                                            }]
                                        }
                                    )(
                                        <Select placeholder = "请选择" style = {{ width: 140 }}>
                                            <Option value = "1"> 是</Option>
                                            <Option value = "0"> 否</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "是否有淋浴"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fShower', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写是否有独立淋浴'
                                            }]
                                        }
                                    )(
                                        <Select placeholder = "请选择" style = {{ width: 140 }}>
                                            <Option value = "1"> 是</Option>
                                            <Option value = "0"> 否</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label = "是否有集中供暖"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator( 'fHeating', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请填写是否有集中供暖'
                                            }]
                                        }
                                    )(
                                        <Select placeholder="请选择" style = {{ width: 140 }}>
                                            <Option value = "1"> 是</Option>
                                            <Option value = "0"> 否</Option>
                                        </Select>
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
                                        <Cascader options={options}
                                                  onChange={() => {this.onChangeCas()}}
                                                  placeholder="请选择" />
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
                                        <TextArea rows={3}/>
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
                                                required: true, message: '请填写对住户的要求'
                                            }]
                                        }
                                    )(
                                        <TextArea rows={3}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    <Upload {...props1}>
                        <Button>
                            <Icon type="upload" /> 上传图片
                        </Button>
                    </Upload>
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

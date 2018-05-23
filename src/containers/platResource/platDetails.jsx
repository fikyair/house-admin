import React, {Component} from 'react';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import {Form, Button, Input, Row, Col, Select, Icon, Upload, Cascader} from 'antd';
import {Axios} from "../../utils/Axios";
import './style/plat.less';
import COS from 'cos-js-sdk-v5';
import FormItemComs from "../../component/public/FormItemComs";
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

@Form.create()
class platDetails extends Component {


    state = {
        fileList: [],
        imgUrl: '',
        fPic: '',
        addrInfo:[],
        pName:'',
        cName:'',
        sName:'',
        userInfo:[],
    };

    handleSubmit() {
        this.props.form.validateFields((err, values) => {
            if(!err) {
                const formData = this.props.form.getFieldsValue();

            }
        })
    }


    componentDidMount =()=> {
        const { id } = this.props.params;
        console.log("id..", id)
    }
    //dd
    handleUploadChange = (e) =>{

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
        return (
            <div>
                <Bcrumb title="房源详细信息" icon="plus"/>
                <Form className="flat-form">
                    <div className = "ant-card-head-title">房源详细信息</div>

                    <Row>
                        <Col span={8}>
                            <FormItem
                                label = "用户"
                                {...formItemLayout}
                            >
                                {getFieldDecorator( 'uId', {
                                        initialValue: [],
                                        rules: [{
                                            required: true, message: '请填写房主'
                                        }]
                                    }
                                )(
                                    <Input disabled={true} style={{width: 140}}/>
                                )}
                            </FormItem>
                        </Col>
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
                                label = "楼层(楼)"
                                {...formItemLayout}
                            >
                                {getFieldDecorator( 'fFloor', {
                                        initialValue: '',
                                        rules: [{
                                            required: true, message: '请填写所在楼层'
                                        }]
                                    }
                                )(
                                    <Input disabled={true} style={{width: 140}}/>
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
                                        initialValue: [],
                                        rules: [{
                                            required: true, message: '请填写房屋朝向'
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
                                        initialValue: [],
                                        rules: [{
                                            required: true, message: '请填写房屋类型'
                                        }]
                                    }
                                )(
                                    <Select
                                        style = {{ width: 140 }}
                                        placeholder="请选择"
                                    >
                                        <Option value = "整租"> 整租</Option>
                                        <Option value = "合租"> 合租</Option>
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
                                        initialValue: [],
                                        rules: [{
                                            required: true, message: '请填写居室'
                                        }]
                                    }
                                )(
                                    <Select placeholder = "请选择" style = {{ width: 140 }}>
                                        <Option value = "一居室"> 一居室</Option>
                                        <Option value = "二居室"> 二居室</Option>
                                        <Option value = "三居室"> 三居室</Option>
                                        <Option value = "四居室"> 四居室</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={8}>
                            <FormItem
                                label = "是否有卫生间"
                                {...formItemLayout}
                            >
                                {getFieldDecorator( 'fToilet', {
                                        initialValue: [],
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
                                        initialValue: [],
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
                                        initialValue: [],
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
                                    <Input disabled={true} style={{width: 140}}/>

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
                        <Col span={8}>
                            房屋图片：
                            <img width={140}
                                 src="http://aijia-flat-sh-1253646934.picsh.myqcloud.com/v800x600_ChAFD1p-3POAAMtZABlMRCgvGoo134.JPG" />
                        </Col>
                    </Row>
                </Form>
                <Button type="primary" htmlType="submit" style={{marginLeft: '69%', marginTop: 20}}
                        onClick={() => {
                            this.handleSubmit()
                        }}
                >修改</Button>
            </div>
        )
    }

}

platDetails.contextTypes = {};

export default platDetails;
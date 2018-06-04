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
class platAdd extends Component {


    state = {
        fileList: [],
        imgUrl: '',
        fPic: '',
        k: 'sds',
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

                let { fStreet = [] } = formData;

                const fStreetTemp = fStreet.toString();

                const formDataWithImg = { ...formData, fStreet : fStreetTemp, fPic: this.state.fPic,
                    pName: this.state.pName, cName: this.state.cName, sName: this.state.sName
                };

                console.log("表单信息==>", formDataWithImg);

                Axios.post(`flat/addFlat`,formDataWithImg).then((result) =>{
                    console.log("添加房屋返回信息：",result);
                    window.location.href = '/plat/platResource';
                })
            }
        })
    }

    //省市区级联
    onChangeCas = (value) => {
       console.log("看这里",value);
        this.setState({
            pName: value[0],
            cName: value[1],
            sName: value[2],
        })
    }
    componentDidMount () {
        //查询出所有的省市县街道
        Axios.get(`/queryProvince/query/`).then((result)=>{
            console.log("地址数据：",result.data);
            const { data =[]} = result.data;
            this.setState({
                addrInfo: data,
            })
        })

        //查出所有用户
        Axios.get(`/user/selectalluser/`).then((result)=>{
            console.log("用户：",result.data);
            const { data =[]} = result.data;
            this.setState({
                userInfo: data,
            })
        })
    }
    handleUploadChange = (e) =>{
        let { file = {}, fileList = []}  = e ;
       // console.log("aaaa",file.response.fileUrl);
        this.setState({
            fileList: fileList,
            imgUrl: file.response?file.response.fileUrl:'',
        })
        let fPic = '';
        this.state.fileList.map((item) => {
            if(item.response != undefined){
                fPic += item.response.fileUrl + ' ';
            }
        })

        //可以优化
        if(fPic != ''){
            fPic = fPic.substr(0,fPic.length - 1);
        }
        this.setState({
            fPic: fPic,
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const addrInfo = this.state.addrInfo;
        const userInfo = this.state.userInfo;
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

        const args = {
            name: 'file',
            action: 'http://localhost:8085/flat/imgUpload',
            listType: 'picture',
            fileList: this.state.fileList,
            className: 'upload-list-inline',
        };
        //省市区级联
        let option = [];
        option = addrInfo.map(item =>{
           // console.log(item);
            return {
                id: item.pId,
                value: item.pName,
                label: item.pName,
                children: item.cities.map(i=>{
                    return {
                        id: i.cId,
                        value: i.cName,
                        label: i.cName,
                        children: i.streets.map(j=>{
                            return {
                                id: j.sId,
                                value: j.sName,
                                label: j.sName,
                            }
                        })
                    }
                })

            }
        })
        //ll
        console.log("地址信息===》",option);
        const options = [{
            value: this.state.k,
            label: this.state.k,
            children: [{
                value: '石景山区',
                label: '石景山区',
                children: [{
                    value: '实兴大街',
                    label: '实兴大街',
                }],
            }],
        }, {
            value: '上海市',
            label: '上海市',
            children: [{
                value: '黄浦区',
                label: '黄浦区',
                children: [{
                    value: '外滩街道延安东路',
                    label: '外滩街道延安东路',
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
                                        <Select placeholder = "请选择" style = {{ width: 140 }}>
                                            {
                                                userInfo.map(item =>{
                                                   return <Option value = {item.uId} > {item.uName}</Option>
                                                })
                                            }
                                        </Select>
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
                                            initialValue: [],
                                            rules: [{
                                                required: true, message: '请填写房屋朝向'
                                            }]
                                        }
                                    )(
                                        <Select placeholder = "请选择" style = {{ width: 140 }}>
                                            <Option value = "朝东"> 东</Option>
                                            <Option value = "朝南"> 南</Option>
                                            <Option value = "朝西"> 西</Option>
                                            <Option value = "朝北"> 北</Option>
                                        </Select>
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
                                        <Cascader options={option}
                                                  onChange={(value)=>this.onChangeCas(value)}
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
                    <Upload
                        {...args}
                        onChange={this.handleUploadChange}>
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
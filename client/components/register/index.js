import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "../../actions";

import { Form, Icon, Input, Button } from 'antd';
import Axios from 'axios';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Register extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Axios.post('/api/user/register', { 
                    user_name: values.userName,
                    user_password: values.password 
                }).then(rs=>{
                    if (rs.data.status===200){
                        alert('注册成功');
                        this.props.history.push('/login');
                    }else{
                        alert(rs.data.error)
                    }
                })
            }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        注册
          </Button>
                </FormItem>
            </Form>
        );
    }
}

const HorizontalRegisterForm = Form.create()(Register);

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HorizontalRegisterForm)
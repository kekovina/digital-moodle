import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import axios from 'axios'

const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 12,
      offset: 6
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 12,
    },
  };
const Auth = () => {
    const onFinish = (values) => {
        axios.post('http://80.78.207.245:3001/users/login', {login: values.telegram}).then((res) => {
            console.log(res.data)
        })
    };
    return (
        <Row align="middle" style={{height: '100vh'}}>
            <Col span={12} offset={6}>
                <Form
        {...layout}
        name="basic"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        >
        <Form.Item
            label="Ваш Telegram"
            name="telegram"
            rules={[
            {
                required: true,
                message: 'Пожалуйста, введите ваш логин в Telegram',
            },
            ]}
        >
            <Input />
        </Form.Item>


        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" size="large" block>
            Продолжить
            </Button>
        </Form.Item>
        </Form>
    </Col>
        </Row>
    )
}

export default Auth;

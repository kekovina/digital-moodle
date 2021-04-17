import React from 'react';
import {inject, observer} from 'mobx-react'
import { Form, Input, Button, Row, Col } from 'antd';
import axios from 'axios'

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 12,
    },
  };
const Auth = inject('store')(observer(({ store }) => {

    const onFinish = (values) => {
        store.sendTg(values.telegram)
    }
    const onFinishAuth = (values) => {
        store.sendPin(values.pin)
    }
    if(!store.login){
        return (<Row align="middle" style={{height: '100vh'}}>
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
        } else {
            return <Row align="middle" style={{height: '100vh'}}>
            <Col span={12} offset={6}>
                <Form
        {...layout}
        name="basic"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinishAuth}
        >
        <div >Перейдите в приложение Telegram(<a href="https://t.me/moodle_samsung_bot" target="_blank">бот</a>) и введите команду "/start"</div>
        <Form.Item
            label="Код подтверждения"
            name="pin"
            rules={[
            {
                required: true,
                message: 'Пожалуйста, введите пин код из Telegram',
            },
            ]}
        >
            <Input />
        </Form.Item>


        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" size="large" block>
            Продолжить{console.log(store)}
            </Button>
        </Form.Item>
        </Form>
    </Col>
        </Row>
        }
}))

export default Auth;

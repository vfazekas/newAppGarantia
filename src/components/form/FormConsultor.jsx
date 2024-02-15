'use client'
import React, { useState } from 'react'
import { Form, Input, InputNumber, Button, DatePicker, Select } from 'antd'
import data from '@/static/data.json'
import consultor from '@/static/consultor.json'
import { Toaster, toast } from 'react-hot-toast'

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 14}
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} é obrigatório!',
  types: {
    date: '${label} não é uma data válida!',
    number: '${label} não é um número válido!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */





export default function FormConsultor({ loja, onSubmit }) {
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [form] = Form.useForm();

  const categoriasKeys = Object.keys(data.categorias)

  if (!loja) {
    return <div>loja não encontrada!</div>
  }

  const filial = loja

  const filteredData = consultor.filter(item => item.location === filial); 
  
  const onFinish = async (values) => {
    values.formConsultor.Data = values.formConsultor.Data.toISOString();
    const res = await onSubmit(values);
    form.resetFields()
    if (res) {
      toast.success('Formulário enviado com sucesso!')
    }
};

  const handleCategoriaChange = (categoria) => {
    setSelectedCategoria(categoria);
  };

  

  

  return (
    <div style={{ maxWidth: 600, width: '100%', paddingTop: 10 }}>
    <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
    form={form}
  >

<Form.Item
      name={['formConsultor', 'OS']}
      label="OS"
      rules={[
        {
          required: true,
          type: 'number',
          min: 0,
          max: 99999999,
        },
      ]}
    >
      <InputNumber />
    </Form.Item>

    <Form.Item 
      name={['formConsultor', 'Data']}
      label="Data"
      rules={[
        {
          required: true,
          type: 'date',
        },
      ]}
      >
      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
    </Form.Item>


    <Form.Item
      name={['formConsultor', 'categoria']}
      label="Categoria"
      rules={[
        {
          required: true,
        },
      ]}
    >
    <Select 
    placeholder="Selecione uma categoria"
    onChange={handleCategoriaChange}
    >
        {categoriasKeys.map((categoria, index) => (
            <Select.Option key={index} value={categoria}>{categoria}</Select.Option>
        ))}
      </Select>
    </Form.Item>

    {selectedCategoria && (
        <Form.Item
          name={['formConsultor', 'inconsistencia']}
          label="Inconsistência"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Selecione uma inconsistência">
            {data.categorias[selectedCategoria].inconsistencias.map(
              (inconsistencia, index) => (
                <Select.Option key={index} value={inconsistencia}>
                  {inconsistencia}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>
      )}

    <Form.Item
          name={['formConsultor', 'consultor']}
          label="Consultor"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Selecione o consultor">
            {filteredData.map(item => (
               <Select.Option key={item.user_id} value={item.user_id}>
               {item.name}
             </Select.Option>
                )
            )}
          </Select>
        </Form.Item>
    
    <Form.Item 
      name={['formConsultor', 'msg']} 
      label="Orientações"
      rules={[
        {
          required: true,
        },
      ]}
      >
      <Input.TextArea placeholder='Neste campo, forneça orientações para o consultor sobre como corrigir o problema encontrado...' />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button type="primary" htmlType="submit">
        Enviar
      </Button>
    </Form.Item>
  </Form>
  <Toaster
       position="top-center"
      reverseOrder={false}
/>
  </div>
  )
}

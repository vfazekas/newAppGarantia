'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, Skeleton, Input } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { DeleteOutlined } from '@ant-design/icons'
import { Toaster, toast } from 'react-hot-toast'

const App = ({ messages: initialMessages, name, imgUrl, updateMessages, userId }) => {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
        updateMessages(list)
  }, [list])


  useEffect(() => {
    setInitLoading(false);
    setList(initialMessages); 
   
  }, []);

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      const formattedTimestamp = new Date().toLocaleString()

      const newMessage = {
        msgId: uuidv4(),
        message: inputValue,
        user_id: userId,
        user_name: name,
        timestamp: formattedTimestamp,
        picture: imgUrl 
      };
      setList([...list, newMessage]);
      setInputValue('');
    }
  };

  const handleDelete = (msgId, user_Id) => {
    if(user_Id === userId) {
      setList(list.filter(message => message.msgId !== msgId));
    } else {
      toast.error("Essa mensagem não é sua!")
    }
    
  };

  if (!list) {
    return <div>não tem mensagens disponiveis!</div>
  }


  return (
    <div className='space-y-4'>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
          actions={[
            <DeleteOutlined key="list-loadmore-delete" style={{ color: 'red' }} onClick={() => handleDelete(item.msgId, item.user_id)} />
          ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture} />}
                title={<a href="https://ant.design">{item.user_name}</a>}
                description={item.message}
              />
              <div>{item.timestamp}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Input
        placeholder="Digite a mensagem aqui..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={sendMessage}
      />
      <Button onClick={sendMessage} type="primary">Enviar</Button>
 <Toaster
       position="top-center"
      reverseOrder={false}
/>
    </div>
    
  );
};

export default App;
